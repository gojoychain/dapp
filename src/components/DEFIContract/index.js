import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { isString } from 'lodash';
import APIField from '../APIField';
import DEFI from '../../contracts/defi';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import web3 from '../../web3';
import { addressesEqual, toDecimalString } from '../../utils';

class DEFIContract extends Component {
  state = {
    contract: undefined,
    owner: '',
    newOwner: '',
    defiBalance: '',
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

    const contract = DEFI(network);
    const owner = await contract.methods.owner().call();
    const defiBalance = await contract.methods.balanceOf(currentAddress).call();
    const balance = await web3.eth.getBalance(currentAddress);
    this.setState({
      contract,
      owner,
      defiBalance: toDecimalString(defiBalance),
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
    const { contract, balanceOfAddr } = this.state;
    const balance = await contract.methods
      .balanceOf(balanceOfAddr.toLowerCase())
      .call();
    this.setState({
      balanceOf: web3.utils.fromWei(toDecimalString(balance), 'ether'),
    });
  }

  mintTokens = async () => {
    const { currentAddress } = this.props;
    const { contract, mintValue } = this.state;
    await contract.methods
      .mint(currentAddress, web3.utils.toWei(mintValue, 'ether'))
      .send({ from: currentAddress });
  }

  burnTokens = async () => {
    const { currentAddress } = this.props;
    const { contract, burnValue } = this.state;
    await contract.methods
      .burn(currentAddress, web3.utils.toWei(burnValue, 'ether'))
      .send({ from: currentAddress });
  }

  transferOwnership = async () => {
    const { currentAddress } = this.props;
    const { contract, newOwner } = this.state;
    await contract.methods
      .transferOwnership(newOwner)
      .send({ from: currentAddress });
  }

  renderFunctions = () => {
    const {
      balanceOf,
    } = this.state;

    return (
      <Fragment>
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
      </Fragment>
    );
  }

  renderOwnerFunctions = () => {
    const { currentAddress } = this.props;
    const { owner } = this.state;

    return addressesEqual(currentAddress, owner) && (
      <Fragment>
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
      contract,
      owner,
      defiBalance,
      balance,
    } = this.state;

    if (!contract || !currentAddress || !web3) {
      return <div />;
    }

    return (
      <TabContentContainer>
        <ContractInfoContainer>
          <Typography variant="h4" className={classes.heading}>
            DEFI Contract
          </Typography>
          <Typography variant="subtitle1">
            Owner: <AddressWrapper>{owner}</AddressWrapper>
          </Typography>
          <Typography variant="subtitle1">
            Current DEFI balance: {web3.utils.fromWei(defiBalance, 'ether')} DEFI
          </Typography>
          <Typography variant="subtitle1">
            Current JOY balance: {web3.utils.fromWei(balance, 'ether')} JOY
          </Typography>
        </ContractInfoContainer>
        {this.renderFunctions()}
        {this.renderOwnerFunctions()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(DEFIContract);
