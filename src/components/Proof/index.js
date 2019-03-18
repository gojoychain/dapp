import React, { Component, Fragment } from 'react'
import web3 from '../../web3';
import pot from '../../pot';
import poi from '../../poi';
import poc from '../../poc';
import SimpleField from '../SimpleField'
import ProofOfTransaction from './ProofOfTransaction'
const instnaces = { pot, poi, poc }
export default class GHUSDContract extends Component{
  state = {
    currentAddress: '',
    newOwner: '',
    balance: '',
    potNewOwner:'',
    poiNewOwner:'',
    pocNewOwner:'',
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
    const balance = await web3.eth.getBalance(accounts[0]);
    const potOwner = await pot.methods.owner().call();
    const poiOwner = await poi.methods.owner().call();
    const pocOwner = await poc.methods.owner().call();
    this.setState({ currentAddress,potOwner, poiOwner, pocOwner, balance});
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onPotTransferSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    await pot.methods.transferOwnership(this.state.potNewOwner).send({
      from: accounts[0]
    });
    this.setState({ potOwner: await pot.methods.owner().call() });
  }

  onPoiTransferSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    await poi.methods.transferOwnership(this.state.poiNewOwner).send({
      from: accounts[0]
    });
    this.setState({ poiOwner: await poi.methods.owner().call() });
  }

  onPocTransferSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    await poc.methods.transferOwnership(this.state.pocNewOwner).send({
      from: accounts[0]
    });
    this.setState({ pocOwner: await poc.methods.owner().call() });
  }

  onPotWithdrawAmount = async () => {
    const accounts = await web3.eth.getAccounts();
    // console.log(await pot.methods.withdrawAmount(this.state.potNewOwner).send({
    //   from: accounts[0]
    // }))
    console.log(web3.utils.fromWei(await pot.methods.withdrawAmount().call() , 'ether'))
    console.log(await pot.methods.lastWithdrawBlock().call())
    console.log(await pot.methods.withdrawInterval().call())
    this.setState({ potWithdrawAmount: await pot.methods.withdrawAmount().call() });
  }


  render() {
    console.log(this.state)
    return(
      <Fragment>
        <ProofOfTransaction />

        <h2>Proof Of Investment Contract</h2>
        <p>This contract is owned by {this.state.poiOwner}.</p>
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

        <SimpleField
          title='Transfer POI ownership'
          handleChange={this.handleChange}
          changeStateName='poiNewOwner'
          value=''
          onClickFunc={this.onPoiTransferSubmit}
          buttonText='Transfer'
          label='Type new address'
          helperText=''
        />

        <hr />

        <h2>Proof Of Contribution Contract</h2>
        <p>This contract is owned by {this.state.pocOwner}.</p>
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
        <SimpleField
          title='Transfer POC ownership'
          handleChange={this.handleChange}
          changeStateName='pocNewOwner'
          value=''
          onClickFunc={this.onPocTransferSubmit}
          buttonText='Transfer'
          label='Type new address'
          helperText=''
        />
      </Fragment>
    )
  }
}
