import React, { Component } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
} from '@material-ui/core';

import styles from './app.styles';
import web3 from './web3';
import GHUSDContract from './components/GHUSDContract';
import AddressNameService from './components/AddressNameService';
import MiningContracts from './components/MiningContracts';
import Settings from './components/Settings';
import { NETWORK } from './constants';

class App extends Component {
  state = {
    value: 0,
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const currentAddress = accounts[0];
    if (currentAddress === undefined) {
      return;
    }
    this.setState({ currentAddress: accounts[0] });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, currentAddress } = this.state;
    console.log(window.web3);
    
    let network;
    switch (window.web3.currentProvider.networkVersion) {
      case '18': {
        network = NETWORK.MAINNET;
        break;
      }
      case '8899': {
        network = NETWORK.TESTNET;
        break;
      }
      default: {
        console.error(`Invalid network: ${window.web3.currentProvider.networkVersion}`);
      }
    }

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Address Name Service" />
            <Tab label="GHUSD" />
            <Tab label="Mining Contracts" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <AddressNameService currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <GHUSDContract currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <MiningContracts currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <Settings currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
      </div>
    );
  }
}
export default App;

const TabContainer = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <Typography component="div" className={classes.tabContainer}>
      {children}
    </Typography>
  );
});
