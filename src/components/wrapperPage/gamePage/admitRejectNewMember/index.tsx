import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import './admitRejectNewMember.css';

export default function AdmitRejectNewMember() {
  const [isOpenPopup, setIsOpenPopup] = useState(true);

  function handleClose() {
    setIsOpenPopup(false);
    console.log('Close');
  }

  function handleAdmit() {
    setIsOpenPopup(false);
    console.log('Admit');
  }

  function handleReject() {
    setIsOpenPopup(false);
    console.log('Reject');
  }

  return (
    <Dialog open={isOpenPopup} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New member</DialogTitle>
      <DialogContent>
        <DialogContentText>A new member wants to join this game</DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <div className="dialog-actions__btn-wrap">
          <Button onClick={handleAdmit} color="primary" variant="contained">
            Admit
          </Button>
          <Button onClick={handleReject} color="secondary" variant="contained">
            Reject
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
