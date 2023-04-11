import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import './BookingModal.scss';
import { GetScheduleData } from '@/services/doctorService';
import { FormattedMessage } from 'react-intl';

const BookingModal = (props: {
  dataSchdule: GetScheduleData;
  modal: boolean;
  toggle: () => void;
}) => {
  const { dataSchdule, modal, toggle } = props;

  return (
    <Modal size="xl" isOpen={modal} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>Thông tin đặt lịch khám bệnh</ModalHeader>
      <ModalBody>
        <Form>
          <div className="price">Giá khám 500.000VND</div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="fullName" className="fw-normal">
                Họ tên
              </Label>
              <Input
                id="fullName"
                name="fullName"
                // placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="text"
                // value={info.email}
                // onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="phoneNumber" className="fw-normal">
                Số điện thoại
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                // placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="text"
                // value={info.email}
                // onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="email" className="fw-normal">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                // placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="email"
                // value={info.email}
                // onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="address" className="fw-normal">
                Địa chỉ liên hệ
              </Label>
              <Input
                id="address"
                name="address"
                // placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="text"
                // value={info.email}
                // onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="book" className="fw-normal">
                Đặt cho
              </Label>
              <Input
                id="book"
                name="book"
                // placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="text"
                // value={info.email}
                // onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="address" className="fw-normal">
                Giới tính
              </Label>
              <Input
                id="address"
                name="address"
                // placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="text"
                // value={info.email}
                // onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary">Add</Button>
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BookingModal;
