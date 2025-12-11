// NotificationSnackbar.jsx
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const NotificationSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const handleOpen = (type) => {
    switch (type) {
      case 'success':
        setMessage('Операция выполнена успешно!');
        setSeverity('success');
        break;
      case 'error':
        setMessage('Произошла ошибка!');
        setSeverity('error');
        break;
      case 'warning':
        setMessage('Внимание! Проверьте данные.');
        setSeverity('warning');
        break;
      case 'info':
        setMessage('Информация для пользователя.');
        setSeverity('info');
        break;
      default:
        setMessage('Неизвестное уведомление.');
        setSeverity('info');
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained' onClick={() => handleOpen('success')}>
        Success
      </Button>
      <Button
        variant='contained'
        color='error'
        onClick={() => handleOpen('error')}
      >
        Error
      </Button>
      <Button
        variant='contained'
        color='warning'
        onClick={() => handleOpen('warning')}
      >
        Warning
      </Button>
      <Button
        variant='contained'
        color='info'
        onClick={() => handleOpen('info')}
      >
        Info
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationSnackbar;
