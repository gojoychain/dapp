import React, { Fragment } from 'react';
import {
  Typography, TextField, Button, InputAdornment,
} from '@material-ui/core';

const SimpleField = (props) => {
  const {
    title, handleChange, changeStateName, value, onClickFunc, buttonText, label, adornment, helperText, secondInputLabel, secondInputChangeStateName,
  } = props;
  return (
    <Fragment>
      <Typography variant="h5">{title}</Typography>
      <TextField
        id="outlined-name"
        label={label}
        onChange={handleChange(changeStateName)}
        margin="normal"
        variant="outlined"
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
          margin="normal"
          variant="outlined"
        />
        )
      }
      <Typography variant="h5">
        {helperText}
        {value}
      </Typography>
      <Button variant="contained" color="primary" onClick={onClickFunc}>
        {buttonText}
      </Button>
    </Fragment>
  );
};

export default SimpleField;
