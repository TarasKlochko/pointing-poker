import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { MessageLeft, MessageRight } from './message/MessageLeft';
import { TextInput } from './textInput/TextInput';
import { useAppSelector } from '../../../app/hooks';
import { User } from '../../../model/User';
import './chat.css';

interface Message {
  user: User;
  message: string;
}

export default function Chat(): JSX.Element {
  const user = useAppSelector(state => state.user);
  const [messages, setMessages] = useState([] as Message[]);
  return (
    <Paper className="chat-paper">
      <Paper id="style-1" className="messages-body">
        {messages.map(elem => {
          if(elem.user.id === user.user.id) {
            return (<MessageRight key={elem.user.id} message={elem.message} user={elem.user} />)
          }
          return <MessageLeft key={elem.user.id} message={elem.message} user={elem.user} />
        })}
      </Paper>
      <TextInput />
    </Paper>
  );
}
