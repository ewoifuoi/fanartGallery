import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Alerts.css'; // 导入样式文件

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  const handleAlertClick = () => {
    const newAlert = {
      id: new Date().getTime(),
      message: 'Nice, you triggered this alert message!',
      type: 'success'
    };
    setAlerts([...alerts, newAlert]);
  };

  const handleCloseAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className='floating-alert' style={{ background: 'transparent' }}>
      <TransitionGroup>
        {alerts.map(alert => (
          <CSSTransition key={alert.id} timeout={300} classNames="alert">
            <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
              <div>{alert.message}</div>
              <button type="button" className="btn-close" onClick={() => handleCloseAlert(alert.id)} aria-label="Close"></button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Alerts;
