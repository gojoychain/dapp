import React, { Component, Fragment } from 'react'
import SimpleField from '../SimpleField'
import web3 from '../../web3';
import ghusd from '../../ghusd';
import ans from '../../ans';
export default class GHUSDContract extends Component{
  state = {
    currentAddress: '',
    owner: '',
    newOwner: '',
    ghusdBalance: '',
    balance: '',
    mintValue: '',
    burnValue: '',

    ansOwner: '',
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const currentAddress = accounts[0];
    if(currentAddress === undefined) {
      return
    }
    const owner = await ghusd.methods.owner().call();
    const ghusdBalance = await ghusd.methods.balanceOf(currentAddress).call();
    const balance = await web3.eth.getBalance(accounts[0]);
    const ansOwner = await ans.methods.owner().call();
    this.setState({ currentAddress, owner, ghusdBalance, balance, ansOwner });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onMintSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await ghusd.methods.mint(accounts[0], web3.utils.toWei(this.state.mintValue, 'ether')).send({
      from: accounts[0]
    });
    this.setState({ ghusdBalance: await ghusd.methods.balanceOf(this.state.owner).call() });
  }

  onBurnSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await ghusd.methods.burn(accounts[0], web3.utils.toWei(this.state.burnValue, 'ether')).send({
      from: accounts[0]
    });
    this.setState({ ghusdBalance: await ghusd.methods.balanceOf(this.state.owner).call() });
  }

  onTransferSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await ghusd.methods.transferOwnership(this.state.newOwner).send({
      from: accounts[0]
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
    const { currentAddress, owner, ghusdBalance, balance } = this.state
    return(
      <Fragment>
        <h2>GHUSD Contract</h2>
        <p>This contract is owned by {owner}.</p>
        <p>Your account address is {currentAddress}.</p>
        <p>Your current GHUSD balance is {web3.utils.fromWei(ghusdBalance, 'ether')} GHUSD.</p>
        <p>Your current GEC balance is {web3.utils.fromWei(balance, 'ether')} GEC.</p>
        <hr />
        {owner === currentAddress && this.renderOwnerPart()}
      </Fragment>
    )
  }
}

