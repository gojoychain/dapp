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

  render() {
    return(
      <Fragment>
        <h2>Proof Of Transaction Contract</h2>
        <p>This contract is owned by {this.state.potOwner}.</p>
        <p>Your account address is {this.state.currentAddress}.</p>
        <hr />
        <h4>Check name</h4>
        <div>
          <label>Type name </label>
          <input
            value={this.state.nameValue}
            onChange={event => this.setState({ nameValue: event.target.value })}
          />
        </div>
        <div>
        <label>Address {this.state.addressValue}</label>
        </div>
        <button onClick={this.onResolveAddressSubmit}>Check</button>
        <hr />
        <h4>Set Name</h4>
        <div>
          <label>Type name </label>
          <input
            value={this.state.newNameValue}
            onChange={event => this.setState({ newNameValue: event.target.value })}
          />
        </div>
        <button onClick={this.onAssignNameSubmit}>Set</button>
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

        <h2>Proof Of Investment Contract</h2>
        <p>This contract is owned by {this.state.ansOwner}.</p>
        <p>Your account address is {this.state.currentAddress}.</p>
        <hr />
        <h4>Check name</h4>
        <div>
          <label>Type name </label>
          <input
            value={this.state.nameValue}
            onChange={event => this.setState({ nameValue: event.target.value })}
          />
        </div>
        <div>
        <label>Address {this.state.addressValue}</label>
        </div>
        <button onClick={this.onResolveAddressSubmit}>Check</button>
        <hr />
        <h4>Set Name</h4>
        <div>
          <label>Type name </label>
          <input
            value={this.state.newNameValue}
            onChange={event => this.setState({ newNameValue: event.target.value })}
          />
        </div>
        <button onClick={this.onAssignNameSubmit}>Set Name</button>
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

        <h2>Proof Of Contribution Contract</h2>
        <p>This contract is owned by {this.state.ansOwner}.</p>
        <p>Your account address is {this.state.currentAddress}.</p>
        <hr />
        <h4>Check name</h4>
        <div>
          <label>Type name </label>
          <input
            value={this.state.nameValue}
            onChange={event => this.setState({ nameValue: event.target.value })}
          />
        </div>
        <div>
        <label>Address {this.state.addressValue}</label>
        </div>
        <button onClick={this.onResolveAddressSubmit}>Check</button>
        <hr />
        <h4>Set Name</h4>
        <div>
          <label>Type name </label>
          <input
            value={this.state.newNameValue}
            onChange={event => this.setState({ newNameValue: event.target.value })}
          />
        </div>
        <button onClick={this.onAssignNameSubmit}>Set</button>
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
      </Fragment>
    )
  }
}
