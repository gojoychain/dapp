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
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'gray',
    marginTop: theme.spacing.fiveX,
    marginBottom: theme.spacing.twoX,
  },
});

export default styles;
