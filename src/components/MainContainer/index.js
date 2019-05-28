import React, { Component } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
} from '@material-ui/core';

import styles from './styles';
import { CHAIN_ID } from '../../config';
import JUSDContract from '../JUSDContract';
import AddressNameService from '../AddressNameService';
import MiningContracts from '../MiningContracts';
import CreateToken from '../CreateToken';

const TAB_ANS = 0;
const TAB_JUSD = 1;
const TAB_MINING_CONTRACTS = 2;
const TAB_CREATE_TOKEN = 3;

class MainContainer extends Component {
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
      network,
      mmLoaded,
      mmError,
    } = this.state;

    // Show not logged in page if no account found or incorrect network
    if (!currentAddress || !mmLoaded || mmError) {
      return this.renderNotLoggedIn();
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.handleTabChange}>
            <Tab
              label="Address Name Service"
              hidden={selectedTab !== TAB_ANS}
            />
            <Tab
              label="JUSD"
              hidden={selectedTab !== TAB_JUSD}
            />
            <Tab
              label="Mining Contracts"
              hidden={selectedTab !== TAB_MINING_CONTRACTS}
            />
            <Tab
              label="Create Token"
              hidden={selectedTab !== TAB_CREATE_TOKEN}
            />
            <CurrentUser currentAddress={currentAddress} network={network} />
          </Tabs>
        </AppBar>
        {selectedTab === TAB_ANS && (
          <TabContainer>
            <AddressNameService
              currentAddress={currentAddress}
              mmLoaded={mmLoaded}
            />
          </TabContainer>
        )}
        {selectedTab === TAB_JUSD && (
          <TabContainer>
            <JUSDContract
              currentAddress={currentAddress}
              mmLoaded={mmLoaded}
            />
          </TabContainer>
        )}
        {selectedTab === TAB_MINING_CONTRACTS && (
          <TabContainer>
            <MiningContracts
              currentAddress={currentAddress}
              mmLoaded={mmLoaded}
            />
          </TabContainer>
        )}
        {selectedTab === TAB_CREATE_TOKEN && (
          <TabContainer>
            <CreateToken
              currentAddress={currentAddress}
              mmLoaded={mmLoaded}
            />
          </TabContainer>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(MainContainer);

const TabContainer = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <div component="div" className={classes.tabContainer}>
      {children}
    </div>
  );
});

const CurrentUser = withStyles(styles)((props) => {
  const { classes, currentAddress, network } = props;
  const networkName = network === CHAIN_ID.MAINNET ? 'Mainnet' : 'Testnet';
  return (
    <div className={classes.currentUser}>
      <Typography variant="subtitle2" className={classes.currentUserText}>
        Network: {networkName}
      </Typography>
      <Typography variant="subtitle2" className={classes.currentUserText}>
        Address: {currentAddress}
      </Typography>
    </div>
  );
});
