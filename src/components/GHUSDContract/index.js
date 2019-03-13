import React, { Component, Fragment } from 'react'
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
    newAnsOwner: '',
    nameValue: '',
    addressValue: '',
    newNameValue: '',
    minLimit: '',
    newMinLimit: '',
    limitAddress: ''
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

  render() {
    return(
      <Fragment>
        <h2>GHUSD Contract</h2>
        <p>This contract is owned by {this.state.owner}.</p>
        <p>Your account address is {this.state.currentAddress}.</p>
        <p>Your current GHUSD balance is {web3.utils.fromWei(this.state.ghusdBalance, 'ether')} GHUSD.</p>
        <p>Your current GEC balance is {web3.utils.fromWei(this.state.balance, 'ether')} GEC.</p>
        <hr />
        <h4>Mint by owner</h4>
        <div>
          <label>Mint amount </label>
          <input
            value={this.state.mintValue}
            onChange={event => this.setState({ mintValue: event.target.value })}
          />
          <label> GHUSD</label>
        </div>
        <button onClick={this.onMintSubmit}>Mint</button>
        <hr />
        <h4>Burn by owner</h4>
        <div>
          <label>Burn amount </label>
          <input
            value={this.state.burnValue}
            onChange={event => this.setState({ burnValue: event.target.value })}
          />
          <label> GHUSD</label>
        </div>
        <button onClick={this.onBurnSubmit}>Burn</button>
        <hr />
        <h4>Transfer ownership</h4>
        <div>
          <label>New address </label>
          <input
            value={this.state.newOwner}
            onChange={event => this.setState({ newOwner: event.target.value })}
          />
        </div>
        <button onClick={this.onTransferSubmit}>Transfer</button>
      </Fragment>
    )
  }
}

