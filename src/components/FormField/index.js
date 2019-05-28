import React from 'react';
import { TextField, withStyles } from '@material-ui/core';

import styles from './styles';

const FormField = ({
  classes,
  id,
  label,
  value,
  onChange,
  error,
}) => (
  <TextField
    id={id}
    className={classes.textField}
    label={label}
    value={value}
    onChange={onChange}
    error={error}
    required
  />
);

export default withStyles(styles)(FormField);
