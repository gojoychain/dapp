import React, { Component } from 'react';
import web3 from './web3';
import ghusd from './ghusd';
import ans from './ans';

class App extends Component {
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

    const owner = await ghusd.methods.owner().call();
    const ghusdBalance = await ghusd.methods.balanceOf(owner).call();
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

  render() {
    return (
      <div>
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
        <hr />

        <h2>Address Name Service Contract</h2>
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
        <h4>Check Min Limit</h4>
        <div>
          <label>Address </label>
          <input
            value={this.state.limitAddress}
            onChange={event => this.setState({ limitAddress: event.target.value })}
          />
        </div>
        <div>
        <label> Min Limit Length {this.state.minLimit} </label>
        </div>
        <button onClick={this.onGetMinLimitSubmit}>Check</button>
        <hr />
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
        <hr />
      </div>
    );
  }
}
export default App;
