import React from 'react';
import { useSelector } from 'react-redux'
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert'

const styles = {
  alert: {
    // left: '45%',
    backgroundColor : "white",
    "border": "1px solid #1890ff",
    width: 'auto',
    fontSize : "150%",
    color : "#1890ff",
    position: 'fixed',
    top: '50%',
    left : '50%',
    marginRight: "-50%",
    "transform"  : "translate(-50%, -50%)",
    display : "flex",
    alignItems :"center", 
    justifyContent:"center",
    textAlign: 'center',
    zIndex: '1500',
    opacity: '85%'
  }
};

const ApiRstFlash = () => {

  let { flash = {} } = useSelector(s => ({
    flash: s.Base
  }))

  let opend = () => (
    <div>
      <Fade in={flash.flash.isOpen} timeout={{ enter: 300, exit: 100 }}>
        <Alert style={styles.alert}
          severity={flash.flash.body === 0 ? "error" : "success"}>
          {flash.flash.body}
        </Alert>
      </Fade>
    </div>
  )

  let notOpend = () => <></>

  return (
    flash.flash.isOpen
      ? ( opend() ): ( notOpend())
  )

};

export default ApiRstFlash;