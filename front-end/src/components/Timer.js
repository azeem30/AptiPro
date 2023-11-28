import React, {useState, useEffect, Fragment} from 'react'
import Alert from './Alert';

export default function Timer(props) {
  const [timeInSeconds, setTimeInSeconds] = useState(props.initialTime);
  const [timerExpired, setTimerExpired] = useState(false);
  const [message, setMessage] = useState({
    info: null,
    status: null
  });
  let timerStyle = {
    width: '70px',
    height:'30px',
    fontSize: '16px',
    marginTop: '10px'
  };
  useEffect(()=>{
    const timerInterval = setInterval(()=>{
      if(timeInSeconds > 0){
        if(timeInSeconds < 300){
          setMessage({...message, info:`Timer about to expire in ${timeInSeconds - 1} seconds!`, status: 'warning'});
          setTimeInSeconds(timeInSeconds - 1);
        }
        setTimeInSeconds(timeInSeconds - 1);
      }
      else{
        clearInterval(timerInterval);
        setTimerExpired(true);
        setMessage({...message, info: 'Timer has expired!', status: 'danger'});
        if(props.onTimerExpiration){
          props.onTimerExpiration();
        }
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timeInSeconds]);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return (
    <Fragment>
      <div style={timerStyle} className='badge text-bg-danger fw-normal text-wrap display-6 border border-dark'>
        {formattedTime}
      </div>
      <Alert info={message.info} status={message.status}/>
    </Fragment>
  )
}
