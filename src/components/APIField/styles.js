const styles = theme => ({
  root: {
    marginBottom: theme.spacing.twoX,
    padding: theme.spacing.twoX,
    background: '#E5E7E9',
    borderRadius: 4,
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
