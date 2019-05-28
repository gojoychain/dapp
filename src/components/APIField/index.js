import React, { Fragment } from 'react';
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  withStyles,
} from '../JUSDContract/node_modules/@material-ui/core';

import styles from './styles';

const APIField = (props) => {
  const {
    classes,
    title,
    description,
    handleChange,
    changeStateName,
    onClickFunc,
    label,
    buttonText,
    adornment,
    helperText,
    value,
    secondOnClickFunc,
    secondInputLabel,
    secondInputChangeStateName,
    secondButtonText,
  } = props;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">{title}</Typography>
      <Typography className={classes.description} variant="subtitle1">{description}</Typography>
      <div className={classes.submitContainer}>
        {label && (
          <TextField
            id="outlined-name"
            className={classes.textField}
            label={label}
            onChange={handleChange(changeStateName)}
            InputProps={{
              endAdornment: adornment && <InputAdornment position="start">{adornment}</InputAdornment>,
            }}
          />
        )}
        {secondInputLabel && (
          <TextField
            id="outlined-name"
            className={classes.textField}
            label={secondInputLabel}
            onChange={handleChange(secondInputChangeStateName)}
          />
        )}
        <Fragment>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            color="secondary"
            onClick={onClickFunc}
          >
            {buttonText}
          </Button>
          {secondOnClickFunc && secondButtonText && (
            <Button
              className={`${classes.button} second`}
              variant="contained"
              size="small"
              color="secondary"
              onClick={secondOnClickFunc}
            >
              {secondButtonText}
            </Button>
          )}
        </Fragment>
      </div>
      {value && (
        <Typography variant="subtitle2">
          {helperText} {value}
        </Typography>
      )}
    </div>
  );
};

export default withStyles(styles)(APIField);
