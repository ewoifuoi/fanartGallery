import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Alerts.css'; // 导入样式文件

const Alerts = (props,ref) => {
  const [alerts, setAlerts] = useState([]);

  const handleAlertClick = (message) => {
    const newAlert = {
      id: new Date().getTime(),
      message: message.msg,
      type: message.type
    };
    setAlerts([...alerts, newAlert]);
  };

  const handleCloseAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  useImperativeHandle(ref, () => ({
      showAlert: () => {
        handleAlertClick({type:'danger',msg:'test'})
      }
  }))

  return (
    <div className='floating-alert' style={{ background: 'transparent',zIndex:9999 }}>
      <TransitionGroup style={{zIndex:9999}}>
        {alerts.map(alert => (
          <CSSTransition style={{zIndex:9999}} key={alert.id} timeout={300} classNames="alert">
            <div style={{zIndex:9999}} className={`alert alert-${alert.type} alert-dismissible`} role="alert">
              <div style={{zIndex:9999}}>{alert.message}</div>
              <button style={{zIndex:9999}} type="button" className="btn-close" onClick={() => handleCloseAlert(alert.id)} aria-label="Close"></button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default forwardRef(Alerts);
