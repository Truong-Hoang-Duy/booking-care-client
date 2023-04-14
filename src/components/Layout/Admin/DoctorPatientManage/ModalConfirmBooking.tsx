import { ListPatientForDoctor, patientApi } from '@/services';
import CommonUtils from '@/utils/CommonUtils';
import { useAppSelector } from '@/utils/useGetData';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

const ModalConfirmBooking = ({
  dataModal,
  modal,
  toggle,
}: {
  dataModal: ListPatientForDoctor | undefined;
  modal: boolean;
  toggle: () => void;
}) => {
  useEffect(() => {
    setEmail('');
    setImgBase64('');
  }, []);
  const [email, setEmail] = useState('');
  const [imgBase64, setImgBase64] = useState('');
  const { language } = useAppSelector((state) => state.lang);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      setImgBase64(base64);
    }
  };

  const handleSend = async () => {
    const data = {
      email,
      imgBase64,
      doctorId: dataModal?.doctorId,
      patientId: dataModal?.patientId,
      timeType: dataModal?.timeType,
      patientName: `${dataModal?.patientData.lastName} ${dataModal?.patientData.firstName}`,
      language,
    };
    try {
      setIsLoading(true);
      const res = await patientApi.postSendRemedy(data);
      if (res.code === 200) {
        setIsLoading(false);
        toast.success(res.message);
        toggle();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <Modal size="lg" isOpen={modal} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>Gửi hoá đơn khám bệnh</ModalHeader>
      <ModalBody>
        <div className="d-flex gap-4">
          <FormGroup className="w-100">
            <Label for="email">Email bệnh nhân</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={'Vui lòng nhập email bệnh nhân'}
            />
          </FormGroup>

          <FormGroup className="w-100">
            <Label for="File">Chọn file đơn thuốc</Label>
            <Input id="File" name="file" type="file" onChange={(e) => handleChangeFile(e)} />
          </FormGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSend} disabled={isLoading}>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border spinner-border-md text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            'Gửi'
          )}
        </Button>
        <Button color="danger" onClick={toggle}>
          Huỷ bỏ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalConfirmBooking;
