const styles = () => ({
  tabContainer: {
    padding: 24,
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
    color: 'red',
  },
});

export default styles;
