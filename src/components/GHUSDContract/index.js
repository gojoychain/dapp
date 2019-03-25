import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import APIField from '../APIField';
import GHUSD from '../../contracts/ghusd';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import web3 from '../../web3';

class GHUSDContract extends Component {
  state = {
    owner: '',
    newOwner: '',
    ghusdBalance: '',
    balance: '',
    balanceOfAddr: '',
    balanceOf: '',
    mintValue: '',
    burnValue: '',
  };

  async componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps) {
    const { mmLoaded } = this.props;
    if (prevProps.mmLoaded !== mmLoaded) {
      this.initState();
    }
  }

  initState = async () => {
    const { currentAddress } = this.props;
    if (!currentAddress || !web3 || !GHUSD()) return;

    const owner = await GHUSD().methods.owner().call();
    const ghusdBalance = await GHUSD().methods.balanceOf(currentAddress).call();
    const balance = await web3.eth.getBalance(currentAddress);
    this.setState({ owner, ghusdBalance, balance });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  balanceOf = async () => {
    const { balanceOfAddr } = this.state;
    const balanceOf = await GHUSD().methods.balanceOf(balanceOfAddr).call();
    this.setState({
      balanceOf: web3.utils.fromWei(balanceOf, 'ether'),
    });
  }

  mintTokens = async () => {
    const { currentAddress } = this.props;
    const { mintValue } = this.state;
    await GHUSD().methods
      .mintTokens(currentAddress, web3.utils.toWei(mintValue, 'ether'))
      .send({ from: currentAddress });
    this.setState({
      ghusdBalance: await GHUSD().methods.balanceOf(currentAddress).call(),
    });
  }

  burnTokens = async () => {
    const { currentAddress } = this.props;
    const { burnValue } = this.state;
    await GHUSD().methods
      .burnTokens(currentAddress, web3.utils.toWei(burnValue, 'ether'))
      .send({ from: currentAddress });
    this.setState({
      ghusdBalance: await GHUSD().methods.balanceOf(currentAddress).call(),
    });
  }

  transferOwnership = async () => {
    const { currentAddress } = this.props;
    const { newOwner } = this.state;
    await GHUSD().methods.transferOwnership(newOwner).send({
      from: currentAddress,
    });
    this.setState({ owner: await GHUSD().methods.owner().call() });
  }

  renderOwnerFunctions = () => {
    const { currentAddress } = this.props;
    const { owner } = this.state;
    return currentAddress && owner && currentAddress === owner && (
      <Fragment>
        <APIField
          title="Mint (Only Owner)"
          handleChange={this.handleChange}
          changeStateName="mintValue"
          value=""
          onClickFunc={this.mintTokens}
          buttonText="Mint"
          label="Amount"
          helperText=""
          adornment="GHUSD"
        />
        <APIField
          title="Burn (Only Owner)"
          handleChange={this.handleChange}
          changeStateName="burnValue"
          value=""
          onClickFunc={this.burnTokens}
          buttonText="Burn"
          label="Amount"
          helperText=""
          adornment="GHUSD"
        />
        <APIField
          title="Transfer Ownership (Only Owner)"
          handleChange={this.handleChange}
          changeStateName="newOwner"
          value=""
          onClickFunc={this.transferOwnership}
          buttonText="Transfer"
          label="Address"
          helperText=""
        />
      </Fragment>
    );
  }

  render() {
    const { classes, currentAddress } = this.props;
    const {
      owner,
      ghusdBalance,
      balance,
      balanceOf,
    } = this.state;

    if (!currentAddress || !web3) {
      return <div />;
    }

    return (
      <TabContentContainer>
        <ContractInfoContainer>
          <Typography variant="h4" className={classes.heading}>
            GHUSD Contract
          </Typography>
          <Typography variant="subtitle1">
            This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.
          </Typography>
          <Typography variant="subtitle1">
            Your account address is <AddressWrapper>{currentAddress}</AddressWrapper>.
          </Typography>
          <Typography variant="subtitle1">
            Your current GHUSD balance is {web3.utils.fromWei(ghusdBalance, 'ether')} GHUSD.
          </Typography>
          <Typography variant="subtitle1">
            Your current GEC balance is {web3.utils.fromWei(balance, 'ether')} GEC.
          </Typography>
        </ContractInfoContainer>
        <APIField
          title="Get Balance"
          description="Gets the balance for a given address."
          handleChange={this.handleChange}
          changeStateName="balanceOfAddr"
          onClickFunc={this.balanceOf}
          buttonText="Check"
          label="Address"
          helperText="Balance is "
          value={balanceOf}
        />
        {this.renderOwnerFunctions()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(GHUSDContract);
