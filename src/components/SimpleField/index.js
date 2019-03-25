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
    description,
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
      <Typography className={classes.title} variant="h6">{title}</Typography>
      <Typography className={classes.description} variant="subtitle1">{description}</Typography>
      <div className={classes.submitContainer}>
        <TextField
          id="outlined-name"
          className={classes.textField}
          label={label}
          onChange={handleChange(changeStateName)}
          InputProps={{
            endAdornment: adornment && <InputAdornment position="start">{adornment}</InputAdornment>,
          }}
        />
        {
          secondInputLabel
          && (
          <TextField
            id="outlined-name"
            className={classes.textField}
            label={secondInputLabel}
            onChange={handleChange(secondInputChangeStateName)}
          />
          )
        }
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="primary"
          onClick={onClickFunc}
        >
          {buttonText}
        </Button>
      </div>
      {value && (
        <Typography variant="subtitle2">
          {helperText} {value}
        </Typography>
      )}
      {/* <div className={classes.divider} /> */}
    </div>
  );
};

export default withStyles(styles)(SimpleField);
