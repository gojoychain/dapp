export default theme => ({
  root: {
    ...theme.mixins.gutters(),
    minWidth: 480,
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});
