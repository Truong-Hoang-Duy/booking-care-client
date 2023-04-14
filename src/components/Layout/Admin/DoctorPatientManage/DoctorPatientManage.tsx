import { ListPatientForDoctor, patientApi } from '@/services';
import { useAppSelector } from '@/utils/useGetData';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { Button, Table } from 'reactstrap';
import ModalConfirmBooking from './ModalConfirmBooking';

const DoctorPatientManage = () => {
  const { language } = useAppSelector((state) => state.lang);
  const { data } = useAppSelector((state) => state.auth);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [selectDate, setSelectDate] = useState<Date | null>(null);

  const [patient, setPatient] = useState<ListPatientForDoctor[]>([]);

  const [dataModal, setDataModal] = useState<ListPatientForDoctor>();

  useEffect(() => {
    (async () => {
      try {
        const response = await patientApi.getListPatientForDoctor(data?.id, selectDate?.getTime());
        if (response.code === 200) {
          setPatient(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      }
    })();
  }, [selectDate, patient]);

  const handleConfirm = (item: ListPatientForDoctor) => {
    toggle();
    setDataModal(item);
  };

  return (
    <>
      <div className="manage-patient">
        <h1 className="title text-center mt-3 text-secondary fw-bold">
          <FormattedMessage id="menu.doctor.manage-patient.title" />
        </h1>

        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label className="mb-2" htmlFor="date">
                <FormattedMessage id="menu.doctor.manage-schedule.choose-date" />
              </label>
              <ReactDatePicker
                id="date"
                className="form-control"
                selected={selectDate}
                onChange={(date: Date) => setSelectDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText={language === 'vi' ? 'Vui lòng chọn ngày' : 'Please choose date'}
              />
            </div>

            <div className="mt-5">
              <Table hover>
                <thead className="fw-bold">
                  <tr>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>Địa chỉ</th>
                    <th>Thời gian</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.length > 0 &&
                    patient.map((item, index) => (
                      <tr style={{ verticalAlign: 'middle' }} key={item.id}>
                        <td>{index + 1}</td>
                        <td>{`${item.patientData.lastName} ${item.patientData.firstName}`}</td>
                        <td>
                          {language === 'vi'
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn}
                        </td>
                        <td>{item.patientData.address}</td>
                        <td>
                          {language === 'vi'
                            ? item.timeTypePatient.valueVi
                            : item.timeTypePatient.valueEn}
                        </td>
                        <td className="d-flex gap-3">
                          <Button
                            type="button"
                            color="primary"
                            size="sm"
                            onClick={() => handleConfirm(item)}
                          >
                            Hoàn thành
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <ModalConfirmBooking dataModal={dataModal} modal={modal} toggle={toggle} />
    </>
  );
};

export default DoctorPatientManage;
