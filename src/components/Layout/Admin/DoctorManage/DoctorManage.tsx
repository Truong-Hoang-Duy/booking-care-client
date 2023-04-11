import { MarkdownEditor } from '@/components/Common';
import { doctorApi } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { userApi } from '@/services';
import { ConvertIntoSelect } from '@/utils/ConvertIntoSelect';

export interface ListOption {
  value: number | string;
  label: string;
}

const DoctorManage = () => {
  const { language } = useAppSelector((state) => state.lang);

  const [isDetailDoctor, setIsDetailDoctor] = useState(false);

  const [listDoctor, setListDoctor] = useState<ListOption[]>([]);
  const [listPrice, setListPrice] = useState<ListOption[]>([]);
  const [listPayment, setListPayment] = useState<ListOption[]>([]);
  const [listProvince, setListProvince] = useState<ListOption[]>([]);
  const [nameClinic, setNameClinic] = useState<string>('');
  const [addressClinic, setAddressClinic] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const [selectedDoctor, setSelectedDoctor] = useState<ListOption | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<ListOption | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<ListOption | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ListOption | null>(null);

  const [description, setDescription] = useState('');
  const [contentHTML, setContentHTML] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');

  useEffect(() => {
    (async () => {
      const resDoctor = await doctorApi.getAllDoctor();
      const resPrice = await userApi.getAllcode('PRICE');
      const resPayment = await userApi.getAllcode('PAYMENT');
      const resProvince = await userApi.getAllcode('PROVINCE');
      if (resDoctor.code === 200) {
        const doctor = ConvertIntoSelect('user', resDoctor.data, language);
        setListDoctor(doctor);
      }
      if (resPrice.code === 200) {
        const price = ConvertIntoSelect('price', resPrice.data, language);
        setListPrice(price);
      }
      if (resPayment.code === 200) {
        const payment = ConvertIntoSelect('orther', resPayment.data, language);
        setListPayment(payment);
      }
      if (resProvince.code === 200) {
        const province = ConvertIntoSelect('orther', resProvince.data, language);
        setListProvince(province);
      }
    })();
  }, [language]);

  const handleChangeSelect = async (
    option: ListOption | null,
    actionMeta: ActionMeta<ListOption>
  ) => {
    switch (actionMeta.name) {
      case 'doctor':
        setSelectedDoctor(option);
        break;

      case 'price':
        setSelectedPrice(option);
        break;

      case 'payment':
        setSelectedPayment(option);
        break;

      case 'province':
        setSelectedProvince(option);
        break;
    }

    const response = await doctorApi.getDetailInfoDoctor(option?.value);
    if (response && response.code === 200 && response.data.Markdown && response.data.Doctor_Infor) {
      const { data } = response;
      const { Doctor_Infor, Markdown } = data;

      const findPrice: any = listPrice.find((item) => item.value === Doctor_Infor.priceId);
      setSelectedPrice(findPrice);

      const findProvince: any = listProvince.find((item) => item.value === Doctor_Infor.provinceId);
      setSelectedProvince(findProvince);

      const findPayment: any = listPayment.find((item) => item.value === Doctor_Infor.paymentId);
      setSelectedPayment(findPayment);

      setNameClinic(Doctor_Infor.nameClinic);
      setAddressClinic(Doctor_Infor.addressClinic);
      setNote(Doctor_Infor.note);
      setDescription(Markdown.description);
      setContentHTML(Markdown.contentHTML);
      setContentMarkdown(Markdown.contentMarkdown);
      setIsDetailDoctor(true);
    } else {
      setSelectedPrice(null);
      setNameClinic('');
      setAddressClinic('');
      setNote('');
      setDescription('');
      setContentHTML('');
      setContentMarkdown('');
      setIsDetailDoctor(false);
    }
  };

  const handleSaveInfo = () => {
    const data = {
      doctorId: Number(selectedDoctor?.value),
      price: selectedPrice?.value,
      payment: selectedPayment?.value,
      province: selectedProvince?.value,
      nameClinic,
      addressClinic,
      note: note,
      description,
      contentHTML,
      contentMarkdown,
    };
    (async () => {
      try {
        const response = await doctorApi.createDoctorInfo(data);
        if (response && response.code === 200) {
          setSelectedDoctor(null);
          setSelectedPrice(null);
          setSelectedPayment(null);
          setSelectedProvince(null);
          setNameClinic('');
          setAddressClinic('');
          setNote('');
          setDescription('');
          setContentMarkdown('');
          toast.success(response.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      }
    })();
  };
  return (
    <div className="container doctor-manage">
      <h1 className="title text-center my-4 text-secondary fw-bold">
        <FormattedMessage id="menu.doctor.manage-doctor.title" />
      </h1>

      <div className="d-flex flex-column gap-4">
        <div className="d-flex gap-4">
          <div className="w-100">
            <label className="mb-2">
              <FormattedMessage id="menu.doctor.manage-doctor.select-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={handleChangeSelect}
              options={listDoctor}
              placeholder={<FormattedMessage id="menu.doctor.manage-doctor.placeholder.doctor" />}
              name="doctor"
            />
          </div>
          <div className="w-100">
            <label className="mb-2">
              <FormattedMessage id="menu.doctor.manage-doctor.price" />
            </label>
            <Select
              value={selectedPrice}
              onChange={handleChangeSelect}
              options={listPrice}
              placeholder={<FormattedMessage id="menu.doctor.manage-doctor.placeholder.price" />}
              name="price"
            />
          </div>
        </div>

        <div className="d-flex gap-4">
          <div className="w-100">
            <label className="mb-2">
              <FormattedMessage id="menu.doctor.manage-doctor.payment" />
            </label>
            <Select
              value={selectedPayment}
              onChange={handleChangeSelect}
              options={listPayment}
              placeholder={<FormattedMessage id="menu.doctor.manage-doctor.placeholder.payment" />}
              name="payment"
            />
          </div>
          <div className="w-100">
            <label className="mb-2">
              <FormattedMessage id="menu.doctor.manage-doctor.province" />
            </label>
            <Select
              value={selectedProvince}
              onChange={handleChangeSelect}
              options={listProvince}
              placeholder={<FormattedMessage id="menu.doctor.manage-doctor.placeholder.payment" />}
              name="province"
            />
          </div>
        </div>

        <div className="d-flex gap-4">
          <div className="w-100 form-group">
            <label className="mb-2" htmlFor="nameClinic">
              <FormattedMessage id="menu.doctor.manage-doctor.nameClinic" />
            </label>
            <input
              id="nameClinic"
              type="text"
              className="form-control"
              value={nameClinic}
              onChange={(e) => setNameClinic(e.target.value)}
              placeholder={
                language === 'vi' ? 'Vui lòng nhập tên phòng khám' : 'Please enter clinic name'
              }
            />
          </div>

          <div className="w-100 form-group">
            <label className="mb-2" htmlFor="addressClinic">
              <FormattedMessage id="menu.doctor.manage-doctor.addressClinic" />
            </label>
            <input
              id="addressClinic"
              type="text"
              className="form-control"
              value={addressClinic}
              onChange={(e) => setAddressClinic(e.target.value)}
              placeholder={
                language === 'vi'
                  ? 'Vui lòng nhập địa chỉ phòng khám'
                  : 'Please enter clinic address'
              }
            />
          </div>
        </div>

        <div className="d-flex gap-4">
          <FormGroup className="w-100">
            <Label for="note">
              <FormattedMessage id="menu.doctor.manage-doctor.note" />
            </Label>
            <Input
              id="note"
              name="text"
              type="textarea"
              value={note}
              rows="4"
              onChange={(e) => setNote(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="w-100">
            <Label for="description">
              <FormattedMessage id="menu.doctor.manage-doctor.intro" />
            </Label>
            <Input
              id="description"
              name="text"
              type="textarea"
              value={description}
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </div>
      </div>

      <MarkdownEditor
        contentMarkdown={contentMarkdown}
        setContentHTML={setContentHTML}
        setContentMarkdown={setContentMarkdown}
      />
      <div className="d-flex justify-content-end w-100 my-3">
        {isDetailDoctor ? (
          <Button onClick={handleSaveInfo} color="primary">
            <FormattedMessage id="menu.doctor.manage-doctor.save" />
          </Button>
        ) : (
          <Button onClick={handleSaveInfo} color="primary">
            <FormattedMessage id="menu.doctor.manage-doctor.add" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DoctorManage;
