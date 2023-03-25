import { CreateData, EditUser, userApi, UserData } from '@/services';
import { useEffect, useState } from 'react';
import './AdminStyle.scss';
import ModalUser from './ModalUser';
import axios from 'axios';
import { emitter } from '@/utils';

export const UserManage = () => {
  const [user, setUser] = useState<UserData[]>([]);
  const [oneUser, setOneUser] = useState<UserData | undefined>();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const fetchDataUser = async () => {
    const response = await userApi.getUsers('ALL');
    if (response && response.code === 200) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const handleToggleAdd = () => {
    setOneUser(undefined);
    toggle();
  };

  const createNewUser = async (data: CreateData) => {
    try {
      const response = await userApi.createUser(data);
      if (response && response.code === 200) {
        console.log(response.message);
        await fetchDataUser();
        toggle();
        emitter.emit('EVENT_CLEAR_MODAL_DATA', { code: response.code });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const res = await userApi.deleteUser(id);
      if (res && res.code === 200) {
        await fetchDataUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetOneUser = async (id: number) => {
    try {
      const { data } = await userApi.getOneUser(id);
      setOneUser(data);
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (data: EditUser) => {
    try {
      const res = await userApi.editUser(data);
      if (res && res.code === 200) {
        await fetchDataUser();
        toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title text-center mt-3 text-secondary fw-bold">Manage users</h1>
      <div className="my-3 text-end">
        <button className="btn btn-primary" onClick={handleToggleAdd}>
          <i className="fas fa-plus"></i>
          <span className="mx-2">Add new users</span>
        </button>
      </div>
      <div className="users-table mt-4">
        <table id="customers">
          <thead>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleGetOneUser(item.id)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteUser(item.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalUser
        modal={modal}
        toggle={toggle}
        createNewUser={createNewUser}
        oneUser={oneUser}
        handleEditUser={handleEditUser}
      />
    </div>
  );
};
