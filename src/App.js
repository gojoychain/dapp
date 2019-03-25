import React, { Component } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
} from '@material-ui/core';

import styles from './app.styles';
import { CHAIN_ID } from './config';
import { NETWORK } from './constants';
import GHUSDContract from './components/GHUSDContract';
import AddressNameService from './components/AddressNameService';
import MiningContracts from './components/MiningContracts';
import Settings from './components/Settings';

class App extends Component {
  state = {
    selectedTab: 0,
  };

  componentDidMount() {
    if (!window.web3) {
      this.setState({ currentAddress: undefined });
      return;
    }

    window.web3.eth.getAccounts((err, accounts) => {
      console.log('Found Metamask account:', accounts[0]);
      this.setState({ currentAddress: accounts[0] });
    });
  }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  renderNotLoggedIn = () => {
    const { classes } = this.props;
    return (
      <div className={classes.notLoggedInContainer}>
        <Typography className={classes.notLoggedInText}>
          Not logged into Metamask. Please log in and refresh the page.
        </Typography>
      </div>
    );
  }

  render() {
    const { selectedTab, currentAddress } = this.state;

    // Show not logged in page if no account found
    if (!currentAddress) {
      return this.renderNotLoggedIn();
    }

    let network;
    switch (window.web3.currentProvider.networkVersion) {
      case CHAIN_ID.MAINNET: {
        network = NETWORK.MAINNET;
        break;
      }
      case CHAIN_ID.TESTNET: {
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
          <Tabs value={selectedTab} onChange={this.handleTabChange}>
            <Tab label="Address Name Service" />
            <Tab label="GHUSD" />
            <Tab label="Mining Contracts" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && (
          <TabContainer>
            <AddressNameService currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {selectedTab === 1 && (
          <TabContainer>
            <GHUSDContract currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {selectedTab === 2 && (
          <TabContainer>
            <MiningContracts currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {selectedTab === 3 && (
          <TabContainer>
            <Settings currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(App);

const TabContainer = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <Typography component="div" className={classes.tabContainer}>
      {children}
    </Typography>
  );
});
