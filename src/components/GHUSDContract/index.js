import React, { Component, Fragment } from 'react'
import SimpleField from '../SimpleField'
import web3 from '../../web3';
import ghusd from '../../ghusd';
import { withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});
class GHUSDContract extends Component{
  state = {
    currentAddress: '',
    owner: '',
    newOwner: '',
    ghusdBalance: '',
    balance: '',
    mintValue: '',
    burnValue: '',
  };

  async componentDidMount() {
    this.initState()
  }

  componentDidUpdate(prevProps) {
    const { currentAddress } = this.props
    if(prevProps.currentAddress !== currentAddress){
      this.initState()
    }
  }

  initState = async () => {
    const { currentAddress } = this.props
    if(!currentAddress) return;
    const owner = await ghusd.methods.owner().call();
    const ghusdBalance = await ghusd.methods.balanceOf(currentAddress).call();
    const balance = await web3.eth.getBalance(currentAddress);
    this.setState({ owner, ghusdBalance, balance });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onMintSubmit = async () => {
    const { currentAddress } = this.props
    await ghusd.methods.mint(currentAddress, web3.utils.toWei(this.state.mintValue, 'ether')).send({
      from: currentAddress
    });
    this.setState({ ghusdBalance: await ghusd.methods.balanceOf(this.state.owner).call() });
  }

  onBurnSubmit = async () => {
    const { currentAddress } = this.props
    await ghusd.methods.burn(currentAddress, web3.utils.toWei(this.state.burnValue, 'ether')).send({
      from: currentAddress
    });
    this.setState({ ghusdBalance: await ghusd.methods.balanceOf(this.state.owner).call() });
  }

  onTransferSubmit = async (event) => {
    const { currentAddress } = this.props
    await ghusd.methods.transferOwnership(this.state.newOwner).send({
      from: currentAddress
    });
    this.setState({ owner: await ghusd.methods.owner().call() });
  }

  renderOwnerPart = () => {
    return (
      <Fragment>
        <SimpleField
          title='Mint by owner'
          handleChange={this.handleChange}
          changeStateName='mintValue'
          value={''}
          onClickFunc={this.onMintSubmit}
          buttonText='Mint'
          label='Type mint amount'
          helperText=''
          adornment = 'GHUSD'
        />
        <hr />
        <SimpleField
          title='Burn by owner'
          handleChange={this.handleChange}
          changeStateName='burnValue'
          value={''}
          onClickFunc={this.onBurnSubmit}
          buttonText='Burn'
          label='Type Burn amount'
          helperText=''
          adornment = 'GHUSD'
        />
        <hr />
        <SimpleField
          title='Transfer ownership'
          handleChange={this.handleChange}
          changeStateName='newOwner'
          value=''
          onClickFunc={this.onTransferSubmit}
          buttonText='Transfer'
          label='Type new address'
          helperText=''
        />
        <hr />
      </Fragment>
    )
  }

  render() {
    const { owner, ghusdBalance, balance } = this.state
    const { classes, currentAddress } = this.props
    return(
      <Paper className={classes.root}>
        <h2>GHUSD Contract</h2>
        <p>This contract is owned by {owner}.</p>
        <p>Your account address is {currentAddress}.</p>
        <p>Your current GHUSD balance is {web3.utils.fromWei(ghusdBalance, 'ether')} GHUSD.</p>
        <p>Your current GEC balance is {web3.utils.fromWei(balance, 'ether')} GEC.</p>
        <hr />
        {owner === currentAddress && this.renderOwnerPart()}
      </Paper>
    )
  }
}

export default withStyles(styles)(GHUSDContract)
