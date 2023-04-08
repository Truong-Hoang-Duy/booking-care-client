import { MarkdownEditor } from '@/components/Common';
import { doctorApi } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { userApi } from '@/services';
import { ConvertIntoSelect } from '@/utils/ConvertIntoSelect';

interface ListOptionNumber {
  value: number;
  label: string;
}

interface ListOptionString {
  value: string;
  label: string;
}

const DoctorManage = () => {
  const { language } = useAppSelector((state) => state.lang);

  const [isDetailDoctor, setIsDetailDoctor] = useState(false);

  const [listDoctor, setListDoctor] = useState<ListOptionNumber[]>([]);
  const [listPrice, setListPrice] = useState<ListOptionString[]>([]);
  const [listPayment, setListPayment] = useState<ListOptionString[]>([]);
  const [listProvince, setListProvince] = useState<ListOptionString[]>([]);
  const [listNameClinic, setListNameClinic] = useState<ListOptionString[]>([]);
  const [listAddressClinic, setListAddressClinic] = useState<ListOptionString[]>([]);
  const [note, setNote] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState<ListOptionNumber | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<ListOptionString | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<ListOptionString | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ListOptionString | null>(null);

  const [description, setDescription] = useState('');
  const [contentHTML, setContentHTML] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');

  useEffect(() => {
    (async () => {
      const response = await doctorApi.getAllDoctor();
      const data = response.data.map((item) => {
        const nameVi = `${item.lastName} ${item.firstName}`;
        const nameEn = `${item.firstName} ${item.lastName}`;
        return {
          value: item.id,
          label: language === 'vi' ? nameVi : nameEn,
        };
      });
      setListDoctor(data);
    })();
  }, [language]);

  useEffect(() => {
    (async () => {
      const resPrice = await userApi.getAllcode('PRICE');
      const resPayment = await userApi.getAllcode('PAYMENT');
      const resProvince = await userApi.getAllcode('PROVINCE');
      if (resPrice.code === 200 && resPayment.code === 200 && resProvince.code === 200) {
        // console.log(resPrice.data, resPayment.data, resProvince.data);
        const price = ConvertIntoSelect(resPrice.data, language);
        setListPrice(price);
      }
    })();
  }, [language]);

  const handleChangeSelect = async (option: ListOptionNumber | null) => {
    setSelectedDoctor(option);
    const response = await doctorApi.getDetailInfoDoctor(option?.value);
    if (response && response.code === 200 && response.data.Markdown) {
      const { data } = response;
      setDescription(data.Markdown.description);
      setContentHTML(data.Markdown.contentHTML);
      setContentMarkdown(data.Markdown.contentMarkdown);
      setIsDetailDoctor(true);
    } else {
      setDescription('');
      setContentHTML('');
      setContentMarkdown('');
      setIsDetailDoctor(false);
    }
  };

  const handleSaveInfo = () => {
    const data = {
      doctorId: selectedDoctor?.value,
      description,
      contentHTML,
      contentMarkdown,
      action: isDetailDoctor ? 'edit' : 'create',
    };
    (async () => {
      try {
        const response = await doctorApi.createDoctorInfo(data);
        if (response && response.code === 200) {
          toast.success(response.message);
          setSelectedDoctor(null);
          setDescription('');
          setContentMarkdown('');
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
        <div className="more-info d-flex gap-4">
          <div className="w-100">
            <label className="mb-2">
              <FormattedMessage id="menu.doctor.manage-doctor.select-doctor" />
            </label>
            <Select
              defaultValue={selectedDoctor}
              onChange={handleChangeSelect}
              options={listDoctor}
              placeholder={language === 'vi' ? 'Vui lòng chọn bác sĩ' : 'Please choose a doctor'}
            />
          </div>
          <div className="w-100">
            <label className="mb-2">Chọn giá</label>
            <Select
              defaultValue={selectedPrice}
              // onChange={handleChangeSelect}
              options={listPrice}
              placeholder={language === 'vi' ? 'Vui lòng chọn bác sĩ' : 'Please choose a doctor'}
            />
          </div>
        </div>

        <div className="more-info d-flex gap-4">
          <div className="w-100">
            <label className="mb-2">Chọn phương thức thanh toán</label>
            <Select
              defaultValue={selectedDoctor}
              onChange={handleChangeSelect}
              options={listDoctor}
              placeholder={language === 'vi' ? 'Vui lòng chọn bác sĩ' : 'Please choose a doctor'}
            />
          </div>
          <div className="w-100">
            <label className="mb-2">Tên phòng khám</label>
            <Select
              defaultValue={selectedDoctor}
              onChange={handleChangeSelect}
              options={listDoctor}
              placeholder={language === 'vi' ? 'Vui lòng chọn bác sĩ' : 'Please choose a doctor'}
            />
          </div>
        </div>

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
