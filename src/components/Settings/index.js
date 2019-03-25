import React, { Component } from 'react';
import {
  withStyles,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';

import styles from './styles';
import { NETWORK } from '../../constants';
import TabContentContainer from '../TabContentContainer';

class Settings extends Component {
  state = {
    network: NETWORK.TESTNET,
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

  handleNetworkChange = (network) => {
    this.setState({
      network,
    });
  }

  render() {
    const { classes } = this.props;
    const { network } = this.state;

    return (
      <TabContentContainer>
        <h1>Settings</h1>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Typography className={classes.settingLabel}>
              Network
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl variant="outlined">
              <Select
                value={network}
                onChange={e => this.handleNetworkChange(e.target.value)}
              >
                <MenuItem value={NETWORK.MAINNET}>
                  {NETWORK.MAINNET}
                </MenuItem>
                <MenuItem value={NETWORK.TESTNET}>
                  {NETWORK.TESTNET}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(Settings);
