export default theme => ({
  root: {
    minWidth: 820,
  },
  tabContainer: {
    padding: theme.spacing.threeX,
  },
  currentUser: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: theme.spacing.twoX,
    borderLeft: '1px white solid',
  },
  currentUserText: {
    color: 'white',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  },
  notLoggedInContainer: {
    width: '100vw',
    height: '100vh',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notLoggedInText: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  notLoggedInError: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
});
