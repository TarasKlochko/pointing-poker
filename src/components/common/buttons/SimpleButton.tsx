import React from 'react';
import './buttons.css'

export interface SimpleButtonProps {
  text: string
  onClickHandler: () => void;
  classList: string[]
}

export default function SimpleButton(props: SimpleButtonProps): JSX.Element {
  let classes = ''
  props.classList.forEach((item) => {
    classes += ` ${item}`; 
  })
  return <button className={classes} onClick={props.onClickHandler}>{props.text}</button>
}