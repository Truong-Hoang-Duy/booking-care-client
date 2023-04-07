import { MarkdownEditor } from '@/components/Common';
import { doctorApi } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input, Label } from 'reactstrap';

interface SelectOption {
  doctorId: number;
  value: string;
  label: string;
}

const DoctorManage = () => {
  const { language } = useAppSelector((state) => state.lang);

  const [isDetailDoctor, setIsDetailDoctor] = useState(false);

  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
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
          doctorId: item.id,
          value: language === 'vi' ? nameVi : nameEn,
          label: language === 'vi' ? nameVi : nameEn,
        };
      });
      setOptions(data);
    })();
  }, [language]);

  const handleChangeSelect = async (option: SelectOption | null) => {
    setSelectedOption(option);
    const response = await doctorApi.getDetailInfoDoctor(option?.doctorId);
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
      doctorId: selectedOption?.doctorId,
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
          setSelectedOption(null);
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
      <h1 className="title text-center mt-3 text-secondary fw-bold">Doctor</h1>
      <div className="more-info d-flex gap-4">
        <div className="w-100">
          <label className="mb-2">Chọn bác sĩ</label>
          <Select
            defaultValue={selectedOption}
            onChange={handleChangeSelect}
            options={options}
            placeholder={language === 'vi' ? 'Vui lòng chọn bác sĩ' : 'Please choose a doctor'}
          />
        </div>

        <FormGroup className="w-100">
          <Label for="description">Description</Label>
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
            Lưu thông tin
          </Button>
        ) : (
          <Button onClick={handleSaveInfo} color="primary">
            Tạo thông tin
          </Button>
        )}
      </div>
    </div>
  );
};

export default DoctorManage;
