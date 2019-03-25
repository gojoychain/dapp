import React, { Component } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
} from '@material-ui/core';

import styles from './app.styles';
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
    console.log('main render', currentAddress);

    // Show not logged in page if no account
    if (!currentAddress) {
      return this.renderNotLoggedIn();
    }

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
