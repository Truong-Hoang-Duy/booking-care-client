import { patientApi } from '@/services';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VerifyBookingStyle.scss';

const VerifyBooking = () => {
  const { confirmTime, doctorId } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      if (confirmTime && doctorId) {
        try {
          const response = await patientApi.postVerifyBookDoctor({ confirmTime, doctorId });
          if (response.code === 200) {
            setMessage(response.message);
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            setError(true);
            setMessage(error.response.data.message);
          }
        }
      }
    })();
  }, []);
  return (
    <div className="verify-booking">
      <div className="box container">
        {error ? (
          <div className="icon error">
            <i className="fa-solid fa-xmark"></i>
          </div>
        ) : (
          <div className="icon success">
            <i className="fa-solid fa-check"></i>
          </div>
        )}

        <div className="message">{message}</div>
      </div>
    </div>
  );
};

export default VerifyBooking;
