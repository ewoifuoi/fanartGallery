import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Alerts.css'; // 导入样式文件

const Alerts = (props, ref) => {
  const [alerts, setAlerts] = useState([]);

  const handleAlertClick = (message) => {
    const newAlert = {
      id: new Date().getTime(),
      message: message.msg,
      type: message.type
    };
    // 检查警告列表长度
    if (alerts.length >= 3) {
      // 如果超过3个警告，则移除最早的警告
      setAlerts([...alerts.slice(1), newAlert]);
    } else {
      // 否则直接添加新警告
      setAlerts([...alerts, newAlert]);
    }
    return newAlert.id;
  };

  const handleCloseAlert = (id) => {
    setAlerts(alerts => alerts.filter(alert => alert.id !== id));
  };

  

  useImperativeHandle(ref, () => ({
    showAlert: (message) => {
      const id = handleAlertClick(message);
      setTimeout(()=>{
        handleCloseAlert(id)
      },2000)
    }
  }));

  return (
    <div className='floating-alert' style={{ background: 'transparent' }}>
      <TransitionGroup style={{ justifyContent: 'center', alignContent: 'center' }}>
        {alerts.map(alert => (
          <CSSTransition key={alert.id} timeout={500} classNames="alert">
            <div style={{ minWidth: '400px' }} className={`alert alert-${alert.type} d-flex align-items-center alert-dismissible`} role="alert">
              <div>{alert.message}</div>
              <button type="button" className="btn-close" onClick={() => handleCloseAlert(alert.id)} aria-label="Close"></button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default forwardRef(Alerts);
