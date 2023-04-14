import { MarkdownEditor } from '@/components/Common';
import { doctorApi } from '@/services/doctorService';
import CommonUtils from '@/utils/CommonUtils';
import { useAppSelector } from '@/utils/useGetData';
import axios from 'axios';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input, Label } from 'reactstrap';

const ClinicManage = () => {
  const { language } = useAppSelector((state) => state.lang);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const [contentHTML, setContentHTML] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      setImageBase64(base64);
    }
  };

  const handleSaveClinic = async () => {
    const data = { name, address, imageBase64, contentHTML, contentMarkdown };
    try {
      const response = await doctorApi.createClinic(data);
      if (response && response.code === 200) {
        toast.success(response.message);
        setName('');
        setAddress('');
        setImageBase64('');
        setContentMarkdown('');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="manage-specialty container">
      <h1 className="title text-center mt-3 text-secondary fw-bold">
        <FormattedMessage id="menu.doctor.manage-clinic.title" />
      </h1>

      <div className="d-flex gap-4">
        <FormGroup className="w-100">
          <Label for="name-clinic">
            <FormattedMessage id="menu.doctor.manage-clinic.name" />
          </Label>
          <Input
            id="name-clinic"
            name="name-clinic"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'vi' ? 'Vui lòng nhập phòng khám' : 'Please enter clinic'}
          />
        </FormGroup>

        <FormGroup className="w-100">
          <Label for="File">
            <FormattedMessage id="menu.doctor.manage-clinic.image" />
          </Label>
          <Input id="File" name="file" type="file" onChange={(e) => handleChangeFile(e)} />
        </FormGroup>
      </div>

      <div className="d-flex gap-4 mb-3">
        <FormGroup className="w-100">
          <Label for="address">
            <FormattedMessage id="menu.doctor.manage-clinic.address" />
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={
              language === 'vi' ? 'Vui lòng nhập địa chỉ phòng khám' : 'Please enter clinic address'
            }
          />
        </FormGroup>
      </div>

      <MarkdownEditor
        contentMarkdown={contentMarkdown}
        setContentHTML={setContentHTML}
        setContentMarkdown={setContentMarkdown}
      />

      <div className="my-4 d-flex justify-content-end w-100">
        <Button onClick={handleSaveClinic} color="primary">
          <FormattedMessage id="form.buttonSave" />
        </Button>
      </div>
    </div>
  );
};

export default ClinicManage;
