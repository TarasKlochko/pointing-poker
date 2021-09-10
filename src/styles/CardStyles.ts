import { makeStyles } from "@material-ui/core";

export const useCardsStyles = makeStyles((theme) => ({
  createIssueButton: {
    paddingLeft: '20px',
    paddingRight: '40px',
    width: '300px',
    height: '76px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fefeff',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '18px',
    color: '#000000',
    marginBottom: 10,
    "@media (max-width: 950px)": {
      margin: 'auto',
      marginBottom: 10,
    }
  },

  cardFont: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '18px',
    color: '#000000'
  },

  priorityFont: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '10px',
    lineHeight: '12px',
    color: '#000000'
  },

  currentFont: {
    marginTop: 5,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#000000'
  },

  cardContent: {
    padding: 0,
  },

  issueCardWrapper: {
    paddingRight: 0,
  }
}));