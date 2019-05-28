import React, { Component, Fragment } from 'react';
import { Typography, withStyles } from '../../JUSDContract/node_modules/@material-ui/core';

import styles from './styles';
import APIField from '../../APIField';
import AddressWrapper from '../../AddressWrapper';
import TabContentContainer from '../../TabContentContainer';
import ContractInfoContainer from '../../ContractInfoContainer';
import web3 from '../../../web3';

class MiningContract extends Component {
  state = {
    currentBlockNumber: 0,
    lastWithdrawBlock: 0,
    withdrawInterval: 0,
    withdrawAmount: '',
    owner: '',
    newOwner: '',
    canWithdraw: false,
    checkWithdrawText: '',
  };

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps) {
    const { mmLoaded } = this.props;
    if (prevProps.mmLoaded !== mmLoaded) {
      this.initState();
    }
  }

  initState = async () => {
    const { currentAddress, contract } = this.props;
    if (!currentAddress || !web3 || !contract) return;

    const currentBlockNumber = await web3.eth.getBlockNumber();
    const owner = await contract.methods.owner().call();
    const withdrawInterval = Number(await contract.methods.withdrawInterval().call());
    const withdrawAmount = web3.utils
      .fromWei(await contract.methods.withdrawAmount().call(), 'ether');
    this.setState({
      currentBlockNumber,
      owner,
      withdrawInterval,
      withdrawAmount,
    });

    await this.checkWithdrawStatus();
  }

  checkWithdrawStatus = async () => {
    const { contract } = this.props;
    const lastWithdrawBlock = Number(await contract.methods.lastWithdrawBlock().call());
    const currentBlockNumber = Number(await web3.eth.getBlockNumber());
    this.setState({
      currentBlockNumber,
      lastWithdrawBlock,
    }, () => {
      this.renderWithdrawLabelText();
    });
  }

  withdraw = async () => {
    const { contract, currentAddress } = this.props;
    await contract.methods.withdraw().send({ from: currentAddress });
    await this.checkWithdrawStatus();
    this.renderWithdrawLabelText();
  }

  transferOwnership = async () => {
    const { contract, currentAddress } = this.props;
    const { newOwner } = this.state;
    await contract.methods.transferOwnership(newOwner).send({
      from: currentAddress,
    });
    this.setState({ owner: await contract.methods.owner().call() });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderWithdrawLabelText = () => {
    const {
      withdrawInterval,
      withdrawAmount,
      currentBlockNumber,
      lastWithdrawBlock,
    } = this.state;
    const canWithdraw = currentBlockNumber - lastWithdrawBlock >= withdrawInterval;

    let checkWithdrawText;
    if (canWithdraw) {
      const times = Math.floor((currentBlockNumber - lastWithdrawBlock) / withdrawInterval);
      const totalWithdrawAmount = times * withdrawAmount;
      checkWithdrawText = `
        You can withdraw ${totalWithdrawAmount} GHU in total. 
        You can withdraw ${times} times for ${withdrawAmount} GHU each.`;
    } else {
      const nextWithdrawBlock = lastWithdrawBlock + withdrawInterval;
      checkWithdrawText = `
        You cannot withdraw now. 
        The next withdraw block number is ${nextWithdrawBlock}.`;
    }
    this.setState({ canWithdraw, checkWithdrawText });
  }

  renderOwnerFunctions = () => {
    const { currentAddress } = this.props;
    const { owner, canWithdraw, checkWithdrawText } = this.state;
    return currentAddress && owner && currentAddress === owner && (
      <Fragment>
        <APIField
          title={`Check Withdrawable Status ${canWithdraw ? ' & Withdraw' : ''}`}
          description="Checks if the owner can withdraw from this mining contract."
          onClickFunc={this.checkWithdrawStatus}
          secondOnClickFunc={canWithdraw && this.withdraw}
          buttonText="Check"
          secondButtonText={canWithdraw && 'Withdraw'}
          value={checkWithdrawText}
        />
        <APIField
          title="Transfer Ownership (Only Owner)"
          description="Transfers the contract ownership to the given address."
          handleChange={this.handleChange}
          changeStateName="newOwner"
          onClickFunc={this.transferOwnership}
          buttonText="Transfer"
          label="Address"
        />
      </Fragment>
    );
  }

  render() {
    const { classes, currentAddress, title } = this.props;
    const { owner } = this.state;

    if (!currentAddress || !web3) {
      return <div />;
    }

    return (
      <TabContentContainer>
        <ContractInfoContainer>
          <Typography variant="h4" className={classes.heading}>
            {title}
          </Typography>
          <Typography variant="subtitle1">
            This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.
          </Typography>
        </ContractInfoContainer>
        {this.renderOwnerFunctions()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(MiningContract);
