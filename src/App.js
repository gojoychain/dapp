import React, { Component } from 'react';
import web3 from './web3';
import ghusd from './ghusd';

class App extends Component {
  state = {
    owner: '',
    ghusdBalance: '',
    balance: '',
    mintValue: '',
    burnValue: ''
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const owner = await ghusd.methods.owner().call();
    const ghusdBalance = await ghusd.methods.balanceOf(owner).call();
    const balance = await web3.eth.getBalance(accounts[0]);
    this.setState({ owner, ghusdBalance, balance });
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

  render() {
    return (
      <div>
        <h2>GHUSD Contract</h2>
        <p>This contract is owned by {this.state.owner}.</p>
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
      </div>
    );
  }
}
export default App;
