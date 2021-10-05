import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';

interface NotEnoughPlayersPopupProps {
  setNotEnoughUsers: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function NotEnoughPlayersPopup(props: NotEnoughPlayersPopupProps): JSX.Element {
  const [isOpenPopup, setIsOpenPopup] = useState(true);

  const handleAdmit = () => {
    setIsOpenPopup(false);
    props.setNotEnoughUsers(false);
  };

  return (
    <Dialog open={isOpenPopup} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Kick member</DialogTitle>
      <DialogContent>
        <DialogContentText>Not enough users to start vout (need more than 3)!</DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleAdmit} color="secondary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
