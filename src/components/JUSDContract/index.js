import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { isString } from 'lodash';
import APIField from '../APIField';
import JUSD from '../../contracts/jusd';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import web3 from '../../web3';
import { addressesEqual, toDecimalString } from '../../utils';

class JUSDContract extends Component {
  state = {
    jusdContract: undefined,
    owner: '',
    newOwner: '',
    jusdBalance: '',
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
    const { network, currentAddress } = this.props;
    if (!network || !currentAddress || !web3) return;

    const jusdContract = JUSD(network);
    const owner = await jusdContract.methods.owner().call();
    const jusdBalance = await jusdContract.methods.balanceOf(currentAddress).call();
    const balance = await web3.eth.getBalance(currentAddress);
    this.setState({
      jusdContract,
      owner,
      jusdBalance: toDecimalString(jusdBalance),
      balance: toDecimalString(balance),
    });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: isString(event.target.value)
        ? event.target.value.toLowerCase()
        : event.target.value,
    });
  };

  balanceOf = async () => {
    const { jusdContract, balanceOfAddr } = this.state;
    const balance = await jusdContract.methods
      .balanceOf(balanceOfAddr.toLowerCase())
      .call();
    this.setState({
      balanceOf: web3.utils.fromWei(toDecimalString(balance), 'ether'),
    });
  }

  mintTokens = async () => {
    const { currentAddress } = this.props;
    const { jusdContract, mintValue } = this.state;
    await jusdContract.methods
      .mint(currentAddress, web3.utils.toWei(mintValue, 'ether'))
      .send({ from: currentAddress });
  }

  burnTokens = async () => {
    const { currentAddress } = this.props;
    const { jusdContract, burnValue } = this.state;
    await jusdContract.methods
      .burn(currentAddress, web3.utils.toWei(burnValue, 'ether'))
      .send({ from: currentAddress });
  }

  transferOwnership = async () => {
    const { currentAddress } = this.props;
    const { jusdContract, newOwner } = this.state;
    await jusdContract.methods
      .transferOwnership(newOwner)
      .send({ from: currentAddress });
  }

  renderOwnerFunctions = () => {
    const { currentAddress } = this.props;
    const { owner } = this.state;

    return addressesEqual(currentAddress, owner) && (
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
          adornment="JUSD"
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
          adornment="JUSD"
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
      jusdContract,
      owner,
      jusdBalance,
      balance,
      balanceOf,
    } = this.state;

    if (!jusdContract || !currentAddress || !web3) {
      return <div />;
    }

    return (
      <TabContentContainer>
        <ContractInfoContainer>
          <Typography variant="h4" className={classes.heading}>
            JUSD Contract
          </Typography>
          <Typography variant="subtitle1">
            This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.
          </Typography>
          <Typography variant="subtitle1">
            Your current JUSD balance is {web3.utils.fromWei(jusdBalance, 'ether')} JUSD.
          </Typography>
          <Typography variant="subtitle1">
            Your current JOY balance is {web3.utils.fromWei(balance, 'ether')} JOY.
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

export default withStyles(styles)(JUSDContract);
