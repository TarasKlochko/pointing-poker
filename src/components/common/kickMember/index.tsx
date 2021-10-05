import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { Controller } from '../../../api/Controller';
import { useAppSelector } from '../../../app/hooks';
import { KickVoting } from '../../../model/KickVoting';
import { User } from '../../../model/User';
import './kickMember.css';

interface KickMemberProps {
  maniac: User;
  victim: User;
  voteID: string;
  setVoteKick: React.Dispatch<React.SetStateAction<KickVoting[]>>
}

export default function KickMember(props: KickMemberProps): JSX.Element {
  const socket = useAppSelector(state => state.socket.socket);
  const user = useAppSelector(state => state.user.user);
  const [isOpenPopup, setIsOpenPopup] = useState(true);

  const deleteUserFromWaiting = () => {
    props.setVoteKick(state => {
      const index = state.findIndex(kickVoute => kickVoute.id === props.voteID);
      if (index !== -1) {
        state.splice(index, 1);
      }
      return state;
    });
  };

  const handleAdmit = () => {
    setIsOpenPopup(false);
    Controller.sendKickVote(socket, user.id, props.voteID, true);
    deleteUserFromWaiting();
  }

  const handleReject = () => {
    setIsOpenPopup(false);
    Controller.sendKickVote(socket, user.id, props.voteID, false);
    deleteUserFromWaiting();
  }

  return (
    <Dialog open={isOpenPopup} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Kick member</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`User ${props.maniac.name} wants to kick ${props.victim.name}`}
        </DialogContentText>
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
