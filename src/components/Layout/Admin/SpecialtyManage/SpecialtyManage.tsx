import { MarkdownEditor } from '@/components/Common';
import { doctorApi } from '@/services/doctorService';
import CommonUtils from '@/utils/CommonUtils';
import axios from 'axios';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input, Label } from 'reactstrap';

const SpecialtyManage = () => {
  const [name, setName] = useState('');
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

  const handleSaveSpecialty = async () => {
    const data = { name, imageBase64, contentHTML, contentMarkdown };
    try {
      const response = await doctorApi.createSpecialty(data);
      if (response && response.code === 200) {
        toast.success(response.message);
        setName('');
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
        <FormattedMessage id="menu.doctor.manage-schedule.title" />
      </h1>

      <div className="d-flex gap-4">
        <FormGroup className="w-100">
          <Label for="name-specialty">
            <FormattedMessage id="menu.doctor.manage-doctor.note" />
          </Label>
          <Input
            id="name-specialty"
            name="name-specialty"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="w-100">
          <Label for="File">File</Label>
          <Input id="File" name="file" type="file" onChange={(e) => handleChangeFile(e)} />
        </FormGroup>
      </div>

      <MarkdownEditor
        contentMarkdown={contentMarkdown}
        setContentHTML={setContentHTML}
        setContentMarkdown={setContentMarkdown}
      />

      <div className="my-4 d-flex justify-content-end w-100">
        <Button onClick={handleSaveSpecialty} color="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default SpecialtyManage;
