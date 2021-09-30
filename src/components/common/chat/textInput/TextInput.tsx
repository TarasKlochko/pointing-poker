import React from 'react';
import { Button, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './textInput.css';

export function TextInput(): JSX.Element {
  return (
    <>
      <form className="wrap-form" noValidate autoComplete="off">
        <TextField id="standard-text" label="Your message" className="wrap-text" />
        <Button variant="contained" color="primary" className="send-message-button">
          <SendIcon />
        </Button>
      </form>
    </>
  );
}
