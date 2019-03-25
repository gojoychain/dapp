import React, { Component } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
} from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import styles from './app.styles';
import { CHAIN_ID } from './config';
import GHUSDContract from './components/GHUSDContract';
import AddressNameService from './components/AddressNameService';
import MiningContracts from './components/MiningContracts';

class App extends Component {
  state = {
    selectedTab: 0,
    currentAddress: undefined,
    network: undefined,
    mmLoaded: false,
    mmError: undefined,
  };

  componentDidMount() {
    if (!window.web3) {
      this.setState({ currentAddress: undefined, network: undefined });
      return;
    }

    // Set account
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        this.setState({ mmError: `Error fetching accounts: ${err.message}` });
        return;
      }

      if (accounts[0]) {
        console.info('Found Metamask account:', accounts[0]);
        this.setState({ currentAddress: accounts[0] }, () => {
          this.toggleLoaded();
        });
      }
    });

    // Set network
    window.web3.version.getNetwork((err, network) => {
      if (err) {
        this.setState({ mmError: `Error fetching network: ${err.message}` });
        return;
      }

      if (network === CHAIN_ID.MAINNET || network === CHAIN_ID.TESTNET) {
        console.info('Found Metamask network:', network);
        this.setState({ network }, () => {
          this.toggleLoaded();
        });
      } else {
        this.setState({ mmError: `Invalid Chain ID: ${network}` });
      }
    });
  }

  toggleLoaded = () => {
    const { currentAddress, network } = this.state;
    if (currentAddress && network) {
      this.setState({ mmLoaded: true });
    }
  }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  renderNotLoggedIn = () => {
    const { classes } = this.props;
    const { mmError } = this.state;
    return (
      <div className={classes.notLoggedInContainer}>
        <Typography className={classes.notLoggedInText} variant="subtitle1">
          Not logged into Metamask. Please log in and refresh the page.
        </Typography>
        <Typography className={classes.notLoggedInError} variant="subtitle1">
          {mmError}
        </Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const {
      selectedTab,
      currentAddress,
      mmLoaded,
      mmError,
    } = this.state;

    // Show not logged in page if no account found or incorrect network
    if (!currentAddress || !mmLoaded || mmError) {
      return this.renderNotLoggedIn();
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar position="static">
            <Tabs value={selectedTab} onChange={this.handleTabChange}>
              <Tab label="Address Name Service" />
              <Tab label="GHUSD" />
              <Tab label="Mining Contracts" />
              <div className={classes.currentUser}>
                <Typography className={classes.currentUserText}>Address:</Typography>
                <Typography className={classes.currentUserText}>{currentAddress}</Typography>
              </div>
            </Tabs>
          </AppBar>
          {selectedTab === 0 && (
            <TabContainer>
              <AddressNameService
                currentAddress={currentAddress}
                mmLoaded={mmLoaded}
              />
            </TabContainer>
          )}
          {selectedTab === 1 && (
            <TabContainer>
              <GHUSDContract
                currentAddress={currentAddress}
                mmLoaded={mmLoaded}
              />
            </TabContainer>
          )}
          {selectedTab === 2 && (
            <TabContainer>
              <MiningContracts
                currentAddress={currentAddress}
                mmLoaded={mmLoaded}
              />
            </TabContainer>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles)(App);

const TabContainer = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <div component="div" className={classes.tabContainer}>
      {children}
    </div>
  );
});
