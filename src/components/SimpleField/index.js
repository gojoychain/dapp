import React, { Fragment } from 'react';
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
  withStyles,
} from '@material-ui/core';

import styles from './styles';

const SimpleField = (props) => {
  const {
    classes,
    title,
    handleChange,
    changeStateName,
    value,
    onClickFunc,
    buttonText,
    label,
    adornment,
    helperText,
    secondInputLabel,
    secondInputChangeStateName,
  } = props;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">{`${title}: `}</Typography>
      <TextField
        className={classes.textField1}
        id="outlined-name"
        // label={label}
        onChange={handleChange(changeStateName)}
        // margin="normal"
        // variant="outlined"
        placeholder="Enter name"
        InputProps={{
          endAdornment: adornment && <InputAdornment position="start">{adornment}</InputAdornment>,
        }}
      />
      {
        secondInputLabel
        && (
        <TextField
          id="outlined-name"
          label={secondInputLabel}
          onChange={handleChange(secondInputChangeStateName)}
          // margin="normal"
          // variant="outlined"
        />
        )
      }
      <Typography variant="h5">
        {helperText} {value}
      </Typography>
      <Button variant="contained" color="primary" onClick={onClickFunc}>
        {buttonText}
      </Button>
    </div>
  );
};

export default withStyles(styles)(SimpleField);
