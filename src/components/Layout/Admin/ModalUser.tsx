import { CreateData, EditUser, UserData } from '@/services';
import { emitter } from '@/utils';
import React, { useEffect, useState } from 'react';
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

const ModalUser = (props: {
  modal: boolean;
  toggle: () => void;
  createNewUser: (data: CreateData) => void;
  handleEditUser: (data: EditUser) => void;
  oneUser: UserData | undefined;
}) => {
  const { modal, toggle, createNewUser, handleEditUser, oneUser } = props;

  const initialValue = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
  };

  const [info, setInfo] = useState<CreateData>(initialValue);
  const [error, setError] = useState<CreateData>(initialValue);

  useEffect(() => {
    if (oneUser && modal) {
      setInfo({
        email: oneUser.email,
        password: 'hardcode',
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
        address: oneUser.address,
      });
    }
    if (!modal) {
      setInfo(initialValue);
    }
  }, [oneUser, modal]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo: CreateData = { ...info };
    const id = e.target.id as keyof CreateData;
    newInfo[id] = e.target.value;
    error[id] = '';
    setInfo(newInfo);
  };

  const checkValidateInput = () => {
    let isValid = true;
    const arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];

    for (let i = 0; i < arrInput.length; i++) {
      if (!info[arrInput[i] as keyof CreateData]) {
        error[arrInput[i] as keyof CreateData] = `Missing ${arrInput[i]}`;
        setError({ ...error });
        isValid = false;
      }
    }
    return isValid;
  };

  const listenToEmitter = () => {
    emitter.on('EVENT_CLEAR_MODAL_DATA', (data) => {
      if (data.code === 200) {
        setInfo({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          address: '',
        });
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
      handleEditUser({
        id: oneUser?.id,
        firstName: info.firstName,
        lastName: info.lastName,
        address: info.address,
      });
      listenToEmitter();
    }
  };

  return (
    <Modal size="lg" isOpen={modal} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>Create a new user</ModalHeader>
      <ModalBody>
        <Form>
          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="email" className="fw-normal">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Please enter your email"
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
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Please enter your password"
                type="password"
                value={info.password}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.password ? true : false}
                disabled={oneUser ? true : false}
              />
            </FormGroup>
            {error.password && <FormFeedback>{error.password}</FormFeedback>}
          </div>

          <div className="d-flex gap-4">
            <FormGroup className="w-100">
              <Label for="firstName" className="">
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Please enter your first name"
                type="text"
                value={info.firstName}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.firstName ? true : false}
              />
              {error.firstName && <FormFeedback>{error.firstName}</FormFeedback>}
            </FormGroup>
            <FormGroup className="w-100">
              <Label for="lastName" className="">
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Please enter your last name"
                type="text"
                value={info.lastName}
                onChange={(e) => handleChangeInput(e)}
                invalid={error.lastName ? true : false}
              />
              {error.lastName && <FormFeedback>{error.lastName}</FormFeedback>}
            </FormGroup>
          </div>

          <FormGroup className="w-100">
            <Label for="address" className="">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Please enter your address"
              type="text"
              value={info.address}
              onChange={(e) => handleChangeInput(e)}
              invalid={error.address ? true : false}
            />
            {error.address && <FormFeedback>{error.address}</FormFeedback>}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {!oneUser ? (
          <Button color="primary" onClick={handleAddNewUser}>
            Add
          </Button>
        ) : (
          <Button color="primary" onClick={handleEditOneUser}>
            Save
          </Button>
        )}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalUser;
