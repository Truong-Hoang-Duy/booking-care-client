import { ChangeEvent, useEffect, useState } from 'react';
import './Styles/DetailDoctorStyle.scss';
import { useAppSelector } from '@/utils/useGetData';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import _, { capitalize } from 'lodash';
import { useParams } from 'react-router-dom';
import { GetScheduleData, doctorApi } from '@/services/doctorService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import { initialValueModal } from './constants';
import './Styles/DoctorScheduleStyle.scss';
import { toast } from 'react-toastify';

const DoctorSchedule = ({ id }: { id: string | undefined }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [dataModal, setDataModal] = useState<GetScheduleData>(initialValueModal);

  const [allDays, setAllDays] = useState([
    {
      label: '',
      value: 0,
    },
  ]);
  const { language } = useAppSelector((state) => state.lang);
  const [allAvailableTime, setAllAvailableTime] = useState<GetScheduleData[]>([]);

  const generateDate = () => {
    const arrDate = [];
    for (let i = 0; i < 7; i++) {
      const date = { label: '', value: 0 };
      if (language === 'vi') {
        if (i === 0) {
          date.label = 'Hôm nay - ' + dayjs(new Date()).add(i, 'days').locale('vi').format('DD/MM');
        } else {
          date.label = capitalize(
            dayjs(new Date()).add(i, 'days').locale('vi').format('dddd - DD/MM')
          );
        }
      } else {
        if (i === 0) {
          date.label = 'Today - ' + dayjs(new Date()).add(i, 'days').locale('en').format('DD/MM');
        } else {
          date.label = dayjs(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
        }
      }
      date.value = dayjs(new Date()).add(i, 'days').startOf('day').valueOf();
      arrDate.push(date);
    }
    return arrDate;
  };

  useEffect(() => {
    // Call the api when you have an appointment today
    const arrDate = generateDate();
    (async () => {
      if (arrDate && arrDate.length > 0) {
        const { code, data } = await doctorApi.getSchedule(Number(id), Number(arrDate[0].value));
        if (code === 200 && data.length > 0) {
          setAllAvailableTime(data);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const arrDate = generateDate();
    setAllDays(arrDate);
  }, [language]);

  const handleChangeDate = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (id) {
      const { code, data } = await doctorApi.getSchedule(Number(id), Number(e.target.value));
      if (code === 200 && data.length > 0) {
        setAllAvailableTime(data);
      } else {
        setAllAvailableTime([]);
      }
    }
  };

  const handleClickTime = (item: GetScheduleData) => {
    setDataModal(item);
    toggle();
    const isLogin = _.isNull(localStorage.getItem('access_token'));
    if (isLogin) {
      toast.error('Vui lòng đăng nhập để đặt lịch hẹn');
    }
  };

  return (
    <>
      <div className="schedule-doctor-container">
        <div className="schedule-doctor-select">
          <select name="" id="" onChange={(e) => handleChangeDate(e)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
          </select>
        </div>

        <div className="schedule-doctor-time">
          <div className="calendar">
            <span>
              <i className="fas fa-calendar-alt"></i>
              <FormattedMessage id="patient.detail-doctor.schedule" />
            </span>
          </div>
          <div className="time-container">
            {allAvailableTime && allAvailableTime.length > 0 ? (
              <>
                <div className="time-content-btn">
                  {allAvailableTime.map((item) => (
                    <button
                      onClick={() => handleClickTime(item)}
                      key={item.id}
                      className={language === 'vi' ? 'btn-vi' : 'btn-en'}
                    >
                      {language === 'vi' ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                    </button>
                  ))}
                </div>
                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <i className="fa-regular fa-hand-pointer"></i>
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="fst-italic">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingModal id={id} dataSchdule={dataModal} modal={modal} toggle={toggle} />
    </>
  );
};

export default DoctorSchedule;
