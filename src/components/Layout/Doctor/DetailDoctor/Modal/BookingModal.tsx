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
import ProfileDoctor from '../ProfileDoctor';
import { useAppSelector } from '@/utils/useGetData';
import { ChangeEvent, useEffect, useState } from 'react';
import { initialValuePatient } from '../constants';
import { Allcode, patientApi, userApi } from '@/services';
import _ from 'lodash';
import CommonUtils from '@/utils/CommonUtils';
import { toast } from 'react-toastify';
import axios from 'axios';

interface PatientData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: string;
}

const BookingModal = (props: {
  dataSchdule: GetScheduleData;
  modal: boolean;
  toggle: () => void;
}) => {
  const { dataSchdule, modal, toggle } = props;

  const { data } = useAppSelector((state) => state.auth);
  const { language } = useAppSelector((state) => state.lang);

  const [patient, setPatient] = useState<PatientData>(initialValuePatient);
  const [error, setError] = useState<PatientData>(initialValuePatient);

  const [genderList, setGenderList] = useState<Allcode[]>([]);

  useEffect(() => {
    (async () => {
      const gender = await userApi.getAllcode('gender');
      if (!_.isEmpty(data?.email)) {
        const response = await patientApi.getPatientByEmail(data?.email);
        setPatient(response.data);
      }
      setGenderList(gender.data);
    })();
  }, []);

  const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newPatient = { ...patient };
    const id = e.target.id as keyof PatientData;
    newPatient[id] = e.target.value;
    error[id] = '';
    setPatient(newPatient);
  };

  const checkValidateInput = () => {
    let isValid = true;
    for (const key in patient) {
      const value = patient[key as keyof PatientData];
      console.log('key: ', key, 'value: ', value);
      if (_.isEmpty(value)) {
        isValid = false;
      }
      if (key === 'phonenumber' && !CommonUtils.validatePhoneNumber(value)) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleCreateBook = async () => {
    const { email, firstName, lastName, address, phonenumber, gender } = patient;
    const { doctorId, date, timeType } = dataSchdule;
    const isValid = checkValidateInput();
    if (isValid) {
      const postData = {
        email,
        firstName,
        lastName,
        address,
        phonenumber,
        gender,
        doctorId,
        date,
        timeType,
      };
      try {
        const response = await patientApi.postPatientBookDoctor(postData);
        if (response && response.code === 200) {
          toast.success(response.message);
          toggle();
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      language === 'vi'
        ? toast.error('Vui lòng nhập đầy đủ thông tin')
        : toast.error('Please enter full information');
    }
  };

  return (
    <Modal size="xl" isOpen={modal} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>
        <FormattedMessage id="patient.booking-modal.title" />
      </ModalHeader>
      <ModalBody>
        <Form className="booking-modal">
          <div className="doctor-infor">
            <ProfileDoctor isShowDescDoctor={false} dataSchdule={dataSchdule} />
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="email" className="fw-normal">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="email"
                value={patient.email}
                disabled={!_.isEmpty(data?.email)}
                onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="phonenumber" className="fw-normal">
                <FormattedMessage id="form.phoneNumber" />
              </Label>
              <Input
                id="phonenumber"
                name="phonenumber"
                placeholder={
                  language === 'vi'
                    ? 'Vui lòng nhập số điện thoại'
                    : 'Please enter your phone number'
                }
                type="text"
                value={patient.phonenumber}
                onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="lastName" className="fw-normal">
                <FormattedMessage id="form.lastName" />
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={language === 'vi' ? 'Vui lòng nhập họ' : 'Please enter your last name'}
                type="text"
                value={patient.lastName}
                onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="firstName" className="fw-normal">
                <FormattedMessage id="form.firstName" />
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder={
                  language === 'vi' ? 'Vui lòng nhập tên' : 'Please enter your first name'
                }
                type="text"
                value={patient.firstName}
                onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="gender">
                <FormattedMessage id="form.gender" />
              </Label>
              <Input
                id="gender"
                name="gender"
                type="select"
                value={patient.gender}
                onChange={(e) => handleChangeInput(e)}
              >
                <option style={{ display: 'none' }}>
                  {language === 'vi' ? 'Vui lòng chọn giới tính' : 'Please select your gender'}
                </option>
                {genderList?.map((item) => (
                  <option value={item.keyMap} key={item.id}>
                    {language === 'vi' ? item.valueVi : item.valueEn}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="address" className="fw-normal">
                <FormattedMessage id="form.address" />
              </Label>
              <Input
                id="address"
                name="address"
                placeholder={
                  language === 'vi' ? 'Vui lòng nhập địa chỉ' : 'Please enter your address'
                }
                type="text"
                value={patient.address}
                onChange={(e) => handleChangeInput(e)}
              />
            </FormGroup>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleCreateBook}>
          <FormattedMessage id="form.buttonSave" />
        </Button>
        <Button color="danger" onClick={toggle}>
          <FormattedMessage id="form.buttonCancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BookingModal;
