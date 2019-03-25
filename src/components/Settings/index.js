import React, { Component } from 'react';
import {
  withStyles,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import styles from './styles';
import { NETWORKS } from '../../constants';

class Settings extends Component {
  state = {
    network: NETWORKS.TESTNET,
  };

  componentDidMount() {
    // this.initState();
  }

  componentDidUpdate(prevProps) {
    // const { currentAddress } = this.props;
    // if (prevProps.currentAddress !== currentAddress) {
    //   this.initState();
    // }
  }

  render() {
    const { classes } = this.props;
    const { network } = this.state;

    return (
      <Paper className={classes.root}>
        <h1>Settings</h1>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Typography className={classes.settingLabel}>
              Network
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl variant="outlined">
              <Select value={network}>
                <MenuItem value={NETWORKS.MAINNET}>
                  {NETWORKS.MAINNET}
                </MenuItem>
                <MenuItem value={NETWORKS.TESTNET}>
                  {NETWORKS.TESTNET}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Settings);
