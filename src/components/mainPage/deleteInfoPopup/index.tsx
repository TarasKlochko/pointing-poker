import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

export default function DeleteInfoPopup() {
  const [isOpenPopup, setIsOpenPopup] = useState(true);

  function handleClose() {
    setIsOpenPopup(false);
    console.log('Close');
  }

  return (
    <Dialog open={isOpenPopup} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Notification!</DialogTitle>
      <DialogContent>
        <DialogContentText>You are removed from the game by dealer</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
