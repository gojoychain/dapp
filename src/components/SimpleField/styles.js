const styles = theme => ({
  root: {
    background: '#E5E7E9',
    padding: theme.spacing.twoX,
    marginBottom: theme.spacing.twoX,
  },
  description: {
    marginBottom: theme.spacing.twoX,
  },
  submitContainer: {
    display: 'flex',
    paddingBottom: theme.spacing.twoX,
  },
  textField: {
    width: 200,
    marginRight: theme.spacing.twoX,
  },
  button: {
    height: 32,
    alignSelf: 'flex-end',
    '&.second': {
      marginTop: theme.spacing.twoX,
      marginLeft: theme.spacing.twoX,
    },
  },
});

export default styles;
