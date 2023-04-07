import { Allcode, CreateData, EditUser, userApi, UserData } from '@/services';
import { emitter } from '@/utils';
import CommonUtils from '@/utils/CommonUtils';
import { useAppSelector } from '@/utils/useGetData';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { arrInput, arrInputVi, initialValue } from './constants';

const ModalUser = (props: {
  modal: boolean;
  toggle: () => void;
  createNewUser: (data: CreateData) => void;
  handleEditUser: (data: EditUser) => void;
  oneUser: UserData | undefined;
}) => {
  const { modal, toggle, createNewUser, handleEditUser, oneUser } = props;
  const { language } = useAppSelector((state) => state.lang);

  const [info, setInfo] = useState<CreateData>(initialValue);
  const [error, setError] = useState<CreateData>(initialValue);
  const [genderList, setGenderList] = useState<Allcode[]>([]);
  const [positionList, setPositionList] = useState<Allcode[]>([]);
  const [roleList, setRoleList] = useState<Allcode[]>([]);

  useEffect(() => {
    (async () => {
      const gender = await userApi.getAllcode('gender');
      const position = await userApi.getAllcode('position');
      const role = await userApi.getAllcode('role');
      setGenderList(gender.data);
      setPositionList(position.data);
      setRoleList(role.data);
    })();
  }, []);

  useEffect(() => {
    if (oneUser && modal) {
      setInfo({
        email: oneUser.email,
        password: 'hardcode',
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
        address: oneUser.address,
        phoneNumber: oneUser.phonenumber,
        gender: oneUser.gender,
        position: oneUser.positionId,
        role: oneUser.roleId,
      });
    }
    if (!modal) {
      setInfo(initialValue);
    }
  }, [oneUser, modal]);

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo: CreateData = { ...info };
    const id = e.target.id as keyof CreateData;
    if (id === 'avatar') {
      const file = e.target.files?.item(0);
      console.log('handleChangeInput ~ file:', file);
      if (file) {
        const base64: any = await CommonUtils.getBase64(file);
        newInfo[id] = base64;
      }
    } else {
      newInfo[id] = e.target.value;
      error[id] = '';
    }
    setInfo(newInfo);
  };

  const checkValidateInput = () => {
    let isValid = true;
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    for (let i = 0; i < arrInput.length; i++) {
      const keyOfInfo = arrInput[i] as keyof Omit<CreateData, 'avatar'>;
      // check value exists
      if (!info[keyOfInfo]) {
        error[keyOfInfo] = language === 'vi' ? `Thiếu ${arrInputVi[i]}` : `Missing ${arrInput[i]}`;
        setError({ ...error });
        isValid = false;
      }

      // check phoneNumber
      if (info[keyOfInfo] && arrInput[i] === 'phoneNumber') {
        if (!regexPhoneNumber.test(info[keyOfInfo])) {
          error[keyOfInfo] =
            language === 'vi'
              ? `Vui lòng nhập chính xác số điện thoại`
              : 'Please enter the correct phone number';
          setError({ ...error });
          isValid = false;
        }
      }
    }
    return isValid;
  };

  const listenToEmitter = () => {
    emitter.on('EVENT_CLEAR_MODAL_DATA', (data) => {
      if (data.code === 200) {
        setInfo(initialValue);
      }
    });
  };

  const handleAddNewUser = () => {
    const isValid = checkValidateInput();
    if (isValid) {
      createNewUser(info);
      listenToEmitter();
    }
  };

  const handleEditOneUser = () => {
    const isValid = checkValidateInput();
    if (isValid) {
      const { firstName, lastName, address, phoneNumber, gender, role, position, avatar } = info;

      handleEditUser({
        id: oneUser?.id,
        firstName,
        lastName,
        address,
        phoneNumber,
        gender,
        role,
        position,
        avatar: avatar || '',
      });
      listenToEmitter();
    }
  };

  return (
    <Modal size="xl" isOpen={modal} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>
        {!oneUser ? <FormattedMessage id="form.title1" /> : <FormattedMessage id="form.title2" />}
      </ModalHeader>
      <ModalBody>
        <Form>
          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="email" className="fw-normal">
                <FormattedMessage id="form.email" />
              </Label>
              <Input
                id="email"
                name="email"
                placeholder={language === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email'}
                type="email"
                value={info.email}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.email ? true : false}
                disabled={oneUser ? true : false}
              />
              {error.email && <FormFeedback>{error.email}</FormFeedback>}
            </FormGroup>
            <FormGroup className="w-100">
              <Label for="password" className="">
                <FormattedMessage id="form.password" />
              </Label>
              <Input
                id="password"
                name="password"
                placeholder={
                  language === 'vi' ? 'Vui lòng nhập mật khẩu' : 'Please enter your password'
                }
                type="password"
                value={info.password}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.password ? true : false}
                disabled={oneUser ? true : false}
                autoComplete="on"
              />
            </FormGroup>
            {error.password && <FormFeedback>{error.password}</FormFeedback>}
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="firstName" className="">
                <FormattedMessage id="form.firstName" />
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder={
                  language === 'vi' ? 'Vui lòng nhập tên' : 'Please enter your first name'
                }
                type="text"
                value={info.firstName}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.firstName ? true : false}
              />
              {error.firstName && <FormFeedback>{error.firstName}</FormFeedback>}
            </FormGroup>
            <FormGroup className="w-100">
              <Label for="lastName" className="">
                <FormattedMessage id="form.lastName" />
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={language === 'vi' ? 'Vui lòng nhập họ' : 'Please enter your last name'}
                type="text"
                value={info.lastName}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.lastName ? true : false}
              />
              {error.lastName && <FormFeedback>{error.lastName}</FormFeedback>}
            </FormGroup>
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="address" className="">
                <FormattedMessage id="form.address" />
              </Label>
              <Input
                id="address"
                name="address"
                placeholder={
                  language === 'vi' ? 'Vui lòng nhập địa chỉ' : 'Please enter your address'
                }
                type="text"
                value={info.address}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.address ? true : false}
              />
              {error.address && <FormFeedback>{error.address}</FormFeedback>}
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="phoneNumber" className="fw-normal">
                <FormattedMessage id="form.phoneNumber" />
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder={
                  language === 'vi'
                    ? 'Vui lòng nhập số điện thoại'
                    : 'Please enter your phone number'
                }
                type="tel"
                value={info.phoneNumber}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.phoneNumber ? true : false}
              />
              {error.phoneNumber && <FormFeedback>{error.phoneNumber}</FormFeedback>}
            </FormGroup>
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="gender">
                <FormattedMessage id="form.gender" />
              </Label>
              <Input
                id="gender"
                name="gender"
                type="select"
                value={info.gender}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.gender ? true : false}
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
              {error.gender && <FormFeedback>{error.gender}</FormFeedback>}
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="position">
                <FormattedMessage id="form.position" />
              </Label>
              <Input
                id="position"
                name="position"
                type="select"
                value={info.position}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.position ? true : false}
              >
                <option style={{ display: 'none' }}>
                  {language === 'vi' ? 'Vui lòng chọn chức danh' : 'Please select your position'}
                </option>
                {positionList?.map((item) => (
                  <option value={item.keyMap} key={item.id}>
                    {language === 'vi' ? item.valueVi : item.valueEn}
                  </option>
                ))}
              </Input>
              {error.position && <FormFeedback>{error.position}</FormFeedback>}
            </FormGroup>
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="role">
                <FormattedMessage id="form.role" />
              </Label>
              <Input
                id="role"
                name="select"
                type="select"
                value={info.role}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.role ? true : false}
              >
                <option style={{ display: 'none' }}>
                  {language === 'vi' ? 'Vui lòng chọn vai trò' : 'Please select your role'}
                </option>
                {roleList?.map((item) => (
                  <option value={item.keyMap} key={item.id}>
                    {language === 'vi' ? item.valueVi : item.valueEn}
                  </option>
                ))}
              </Input>
              {error.role && <FormFeedback>{error.role}</FormFeedback>}
            </FormGroup>

            <FormGroup className="w-100">
              <Label for="avatar">
                <FormattedMessage id="form.image" />
              </Label>
              <Input id="avatar" name="file" type="file" onChange={(e) => handleChangeInput(e)} />
            </FormGroup>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        {!oneUser ? (
          <Button color="primary" onClick={handleAddNewUser}>
            <FormattedMessage id="form.buttonSave" />
          </Button>
        ) : (
          <Button color="primary" onClick={handleEditOneUser}>
            <FormattedMessage id="form.buttonEdit" />
          </Button>
        )}
        <Button color="danger" onClick={toggle}>
          <FormattedMessage id="form.buttonCancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalUser;
