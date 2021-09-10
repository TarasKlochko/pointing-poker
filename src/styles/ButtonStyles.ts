import { makeStyles } from "@material-ui/core";

export const useButtonStyles = makeStyles((theme) => ({
  blueButton: {
    background: '#2b3a67',
    border: '1px solid #496A81',
    color: '#ffffff',
    width: '189px',
    height: '47px',
    '&:hover': {
      background: '#576dad',
    },
  },

  margitTop: {
    marginTop: '-6px'
  },

  marginButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '20px'
    },
  },

  whiteButton: {
    background: '#fefeff',
    border: '1px solid #496A81',
    color: '#2b3a67',
    width: '189px',
    height: '47px',
    '&:hover': {
      background: '#e21a1a',
    },
  },
}));