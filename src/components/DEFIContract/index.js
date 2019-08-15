import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { isString } from 'lodash';
import APIField from '../APIField';
import DEFI from '../../contracts/defi';
import JUSD from '../../contracts/jusd';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import web3 from '../../web3';
import { addressesEqual, toDecimalString } from '../../utils';

const EXCHANGE_FUNC_SIG = '0x045d0389';

class DEFIContract extends Component {
  state = {
    contract: undefined,
    jusdContract: undefined,
    owner: '',
    newOwner: '',
    defiBalance: '',
    jusdBalance: '',
    balanceOfAddr: '',
    balanceOfRes: '',
    exchangeAmt: '',
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
    const jusdContract = JUSD(network);
    const owner = await contract.methods.owner().call();
    const defiBalance = await contract.methods.balanceOf(currentAddress).call();
    const jusdBalance = await jusdContract.methods.balanceOf(currentAddress).call();
    this.setState({
      contract,
      jusdContract,
      owner,
      defiBalance: toDecimalString(defiBalance),
      jusdBalance: toDecimalString(jusdBalance),
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
      balanceOfRes: web3.utils.fromWei(toDecimalString(balance), 'ether'),
    });
  }

  exchange = async () => {
    const { currentAddress } = this.props;
    const { contract, jusdContract, exchangeAmt } = this.state;
    await jusdContract.methods['transfer(address,uint256,bytes)'](
      contract._address,
      web3.utils.toWei(exchangeAmt, 'ether'),
      EXCHANGE_FUNC_SIG,
    ).send({ from: currentAddress });
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
      balanceOfRes,
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
          value={balanceOfRes}
        />
        <APIField
          title="Exchange"
          description="Exchange JUSD for DEFI tokens. Enter amount in decimal format (not Wei)."
          handleChange={this.handleChange}
          changeStateName="exchangeAmt"
          onClickFunc={this.exchange}
          buttonText="Exchange"
          label="Amount"
          helperText=""
          value=""
          adornment="JUSD"
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
          description="Transfers ownership of the DEFI contract."
          handleChange={this.handleChange}
          changeStateName="newOwner"
          onClickFunc={this.transferOwnership}
          buttonText="Transfer"
          label="Address"
          helperText=""
          value=""
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
      jusdBalance,
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
            Current JUSD balance: {web3.utils.fromWei(jusdBalance, 'ether')} JUSD
          </Typography>
        </ContractInfoContainer>
        {this.renderFunctions()}
        {this.renderOwnerFunctions()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(DEFIContract);
