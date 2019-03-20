import React, { Component, Fragment } from 'react';
import { withStyles, Paper, Typography } from '@material-ui/core';
import SimpleField from '../SimpleField';
import web3 from '../../web3';
import ghusd from '../../ghusd';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';

class GHUSDContract extends Component {
  state = {
    owner: '',
    newOwner: '',
    ghusdBalance: '',
    balance: '',
    mintValue: '',
    burnValue: '',
  };

  async componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps) {
    const { currentAddress } = this.props;
    if (prevProps.currentAddress !== currentAddress) {
      this.initState();
    }
  }

  initState = async () => {
    const { currentAddress } = this.props;
    if (!currentAddress) return;
    const owner = await ghusd.methods.owner().call();
    const ghusdBalance = await ghusd.methods.balanceOf(currentAddress).call();
    const balance = await web3.eth.getBalance(currentAddress);
    this.setState({ owner, ghusdBalance, balance });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onMintSubmit = async () => {
    const { currentAddress } = this.props;
    const { mintValue } = this.state;
    await ghusd.methods.mint(currentAddress, web3.utils.toWei(mintValue, 'ether')).send({
      from: currentAddress,
    });
    this.setState({ ghusdBalance: await ghusd.methods.balanceOf(currentAddress).call() });
  }

  onBurnSubmit = async () => {
    const { currentAddress } = this.props;
    const { burnValue } = this.state;
    await ghusd.methods.burn(currentAddress, web3.utils.toWei(burnValue, 'ether')).send({
      from: currentAddress,
    });
    this.setState({ ghusdBalance: await ghusd.methods.balanceOf(currentAddress).call() });
  }

  onTransferSubmit = async () => {
    const { currentAddress } = this.props;
    const { newOwner } = this.state;
    await ghusd.methods.transferOwnership(newOwner).send({
      from: currentAddress,
    });
    this.setState({ owner: await ghusd.methods.owner().call() });
  }

  renderOwnerPart = () => (
    <Fragment>
      <SimpleField
        title="Mint by owner"
        handleChange={this.handleChange}
        changeStateName="mintValue"
        value=""
        onClickFunc={this.onMintSubmit}
        buttonText="Mint"
        label="Type mint amount"
        helperText=""
        adornment="GHUSD"
      />
      <hr />
      <SimpleField
        title="Burn by owner"
        handleChange={this.handleChange}
        changeStateName="burnValue"
        value=""
        onClickFunc={this.onBurnSubmit}
        buttonText="Burn"
        label="Type Burn amount"
        helperText=""
        adornment="GHUSD"
      />
      <hr />
      <SimpleField
        title="Transfer ownership"
        handleChange={this.handleChange}
        changeStateName="newOwner"
        value=""
        onClickFunc={this.onTransferSubmit}
        buttonText="Transfer"
        label="Type new address"
        helperText=""
      />
      <hr />
    </Fragment>
  )

  render() {
    const { owner, ghusdBalance, balance } = this.state;
    const { classes, currentAddress } = this.props;
    return (
      <Paper className={classes.root}>
        <h2>GHUSD Contract</h2>
        <Typography variant="h5">This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.</Typography>
        <Typography variant="h5">Your account address is <AddressWrapper>{currentAddress}</AddressWrapper>.</Typography>
        <Typography variant="h5">Your current GHUSD balance is {web3.utils.fromWei(ghusdBalance, 'ether')}GHUSD.</Typography>
        <Typography variant="h5">Your current GEC balance is {web3.utils.fromWei(balance, 'ether')}GEC.</Typography>
        <hr />
        {owner === currentAddress && currentAddress !== undefined && this.renderOwnerPart()}
      </Paper>
    );
  }
}

export default withStyles(styles)(GHUSDContract);
