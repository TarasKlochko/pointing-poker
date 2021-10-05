import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { User } from '../../../../model/User';

interface KickInfoProps {
  victim: User;
  kickResult: boolean;
  setResults: React.Dispatch<React.SetStateAction<{
    kickResult: boolean;
    victim: User;
  }[]>>;
}

export default function KickInfo(props: KickInfoProps): JSX.Element {
  const [isOpenPopup, setIsOpenPopup] = useState(true);
  console.log(props);

  const deleteUserFromWaiting = () => {
    props.setResults((state) => {
      const index = state.findIndex((result) => result.victim.id === props.victim.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      return state;
    });
  };

  const handleAdmit = () => {
    setIsOpenPopup(false);
    deleteUserFromWaiting();
  };

  return (
    <Dialog open={isOpenPopup} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Kick member</DialogTitle>
      <DialogContent>
        <DialogContentText>{`User ${props.victim.name} ${
          props.kickResult ? 'has been kicked from room' : 'kick failed'
        }!`}</DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleAdmit} color="secondary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
