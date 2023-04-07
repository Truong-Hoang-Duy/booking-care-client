import { FormattedMessage } from 'react-intl';
import './DoctorScheduleStyle.scss';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/utils/useGetData';
import { doctorApi } from '@/services/doctorService';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Allcode, userApi } from '@/services';
import { toast } from 'react-toastify';
import _ from 'lodash';

interface SelectOption {
  value: number;
  label: string;
}

interface ResultData {
  doctorId: number;
  date: string;
  time: string;
}

const DoctorScheduleManage = () => {
  const { language } = useAppSelector((state) => state.lang);

  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [options, setOptions] = useState<SelectOption[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [rangeTime, setRangeTime] = useState<Allcode[]>([]);

  useEffect(() => {
    (async () => {
      const response = await doctorApi.getAllDoctor();
      const data = response.data.map((item) => {
        const nameVi = `${item.lastName} ${item.firstName}`;
        const nameEn = `${item.firstName} ${item.lastName}`;
        return {
          value: item.id,
          label: language === 'vi' ? nameVi : nameEn,
        };
      });
      setOptions(data);
    })();
  }, [language]);

  useEffect(() => {
    (async () => {
      let { data } = await userApi.getAllcode('TIME');
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      setRangeTime(data);
    })();
  }, []);

  const handleChangeSelect = async (option: SelectOption | null) => {
    setSelectedOption(option);
  };

  const handleChooseTime = (time: Allcode) => {
    if (rangeTime && rangeTime.length > 0) {
      const copyRangeTime = [...rangeTime];
      copyRangeTime.map((item) =>
        item.id === time.id ? (item.isSelected = !item.isSelected) : item
      );
      setRangeTime(copyRangeTime);
    }
  };

  const handleSaveSchedule = () => {
    const formatedDate = moment(startDate).format('DD/MM/YYYY');
    let result: ResultData[] = [];

    if (_.isNull(selectedOption)) {
      toast.error('Invalid doctor!');
      return;
    }
    if (!startDate) {
      toast.error('Invalid date!');
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      const selectedTime = rangeTime.filter((item) => item.isSelected);
      if (selectedTime && selectedTime.length > 0) {
        result = selectedTime.map((time) => ({
          doctorId: selectedOption.value,
          date: formatedDate,
          time: time.keyMap,
        }));
      } else {
        toast.error('Invalid time!');
        return;
      }
    }
    console.log(result);
  };

  return (
    <div className="manage-schedule-container">
      <h1 className="title text-center mt-3 text-secondary fw-bold">
        <FormattedMessage id="menu.doctor.title" />
      </h1>
      <div className="container">
        <div className="row">
          <div className="col-6 form-group">
            <label className="mb-2">
              <FormattedMessage id="menu.doctor.choose-doctor" />
            </label>
            <Select
              defaultValue={selectedOption}
              onChange={handleChangeSelect}
              options={options}
              placeholder={language === 'vi' ? 'Vui lòng chọn bác sĩ' : 'Please choose a doctor'}
            />
          </div>

          <div className="col-6 form-group">
            <label className="mb-2" htmlFor="date">
              <FormattedMessage id="menu.doctor.choose-date" />
            </label>
            <DatePicker
              id="date"
              className="form-control"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText={language === 'vi' ? 'Vui lòng chọn ngày' : 'Please choose date'}
            />
          </div>

          <div className="col-12 pick-hour-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item) => (
                <button
                  className={`btn btn-schedule ${item.isSelected ? 'active' : ''}`}
                  key={item.id}
                  onClick={() => handleChooseTime(item)}
                >
                  {language === 'vi' ? item.valueVi : item.valueEn}
                </button>
              ))}
          </div>
          <div className="col-12">
            <Button color="primary" className="btn-save-schedule" onClick={handleSaveSchedule}>
              <FormattedMessage id="menu.doctor.save" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduleManage;
