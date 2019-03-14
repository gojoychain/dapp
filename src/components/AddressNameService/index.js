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


  onResolveAddressSubmit = async (event) => {
    event.preventDefault();
    const addressValue = await ans.methods.resolveName(this.state.nameValue).call();
    this.setState({ addressValue });
  }

  onAssignNameSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await ans.methods.assignName(this.state.newNameValue).send({
      from: accounts[0]
    });
    this.setState({ nameValue: this.state.newNameValue });
  }

  onGetMinLimitSubmit = async (event) => {
    event.preventDefault();
    const minLimit = await ans.methods.getMinLimit(this.state.limitAddress).call();
    this.setState({ minLimit });
  }

  onSetMinLimitSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await ans.methods.setMinLimit(this.state.limitAddress, this.state.newMinLimit).send({
      from: accounts[0]
    });
    this.setState({ minLimit: await ans.methods.getMinLimit(this.state.limitAddress).call() });
  }

  onTransferAnsSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await ans.methods.transferOwnership(this.state.newAnsOwner).send({
      from: accounts[0]
    });
    this.setState({ ansOwner: await ans.methods.owner().call() });
  }

  renderOwnerPart = () => {
    return (
      <Fragment>
        <h4>Set Min Limit</h4>
        <div>
          <label>Address </label>
          <input
            value={this.state.limitAddress}
            onChange={event => this.setState({ limitAddress: event.target.value })}
          />
          <label> Minimum Length </label>
          <input
            value={this.state.newMinLimit}
            onChange={event => this.setState({ newMinLimit: event.target.value })}
          />
        </div>
        <button onClick={this.onSetMinLimitSubmit}>Set</button>
        <hr />
        <h4>Transfer ownership</h4>
        <div>
          <label>New address </label>
          <input
            value={this.state.newAnsOwner}
            onChange={event => this.setState({ newAnsOwner: event.target.value })}
          />
        </div>
        <button onClick={this.onTransferAnsSubmit}>Transfer</button>
        <hr />
      </Fragment>
    )
  }

  render() {
    const { ansOwner, currentAddress, addressValue, nameValue, newNameValue, limitAddress, minLimit } = this.state
    return(
      <Fragment>
        <h2>Address Name Service Contract</h2>
        <p>This contract is owned by {ansOwner}.</p>
        <p>Your account address is {currentAddress}.</p>
        <hr />
        <h4>Check name</h4>
        <div>
          <label>Type name </label>
          <input
            value={nameValue}
            onChange={event => this.setState({ nameValue: event.target.value })}
          />
        </div>
        <div>
        <label>Address {addressValue}</label>
        </div>
        <button onClick={this.onResolveAddressSubmit}>Check</button>
        <hr />
        <h4>Set Name</h4>
        <div>
          <label>Type name </label>
          <input
            value={newNameValue}
            onChange={event => this.setState({ newNameValue: event.target.value })}
          />
        </div>
        <button onClick={this.onAssignNameSubmit}>Set</button>
        <hr />
        <h4>Check Min Limit</h4>
        <div>
          <label>Address </label>
          <input
            value={limitAddress}
            onChange={event => this.setState({ limitAddress: event.target.value })}
          />
        </div>
        <div>
        <label> Min Limit Length {minLimit} </label>
        </div>
        <button onClick={this.onGetMinLimitSubmit}>Check</button>
        <hr />
        {currentAddress === ansOwner && this.renderOwnerPart()}
      </Fragment>
    )
  }
}

