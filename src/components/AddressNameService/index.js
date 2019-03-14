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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onResolveAddressSubmit = async () => {
    const addressValue = await ans.methods.resolveName(this.state.nameValue).call();
    this.setState({ addressValue });
  }

  onAssignNameSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    await ans.methods.assignName(this.state.newNameValue).send({
      from: accounts[0]
    });
    this.setState({ nameValue: this.state.newNameValue });
  }

  onGetMinLimitSubmit = async () => {
    const minLimit = await ans.methods.getMinLimit(this.state.limitAddress).call();
    this.setState({ minLimit });
  }

  onSetMinLimitSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    await ans.methods.setMinLimit(this.state.limitAddress, this.state.newMinLimit).send({
      from: accounts[0]
    });
    this.setState({ minLimit: await ans.methods.getMinLimit(this.state.limitAddress).call() });
  }

  onTransferAnsSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    await ans.methods.transferOwnership(this.state.newAnsOwner).send({
      from: accounts[0]
    });
    this.setState({ ansOwner: await ans.methods.owner().call() });
  }

  renderOwnerPart = () => {
    return (
      <Fragment>

        <SimpleField
          title='Set Min Limit'
          handleChange={this.handleChange}
          changeStateName='limitAddress'
          value=''
          onClickFunc={this.onSetMinLimitSubmit}
          buttonText='Set'
          label='Type address'
          helperText=''
          secondInputLabel='Minimum Length'
          secondInputChangeStateName='newMinLimit'
        />
        <hr />
        <SimpleField
          title='Transfer ownership'
          handleChange={this.handleChange}
          changeStateName='newAnsOwner'
          value=''
          onClickFunc={this.onTransferAnsSubmit}
          buttonText='Transfer'
          label='Type new address'
          helperText=''
        />
        <hr />
      </Fragment>
    )
  }

  render() {
    const { ansOwner, currentAddress, addressValue, minLimit } = this.state
    return(
      <Fragment>
        <h2>Address Name Service Contract</h2>
        <p>This contract is owned by {ansOwner}.</p>
        <p>Your account address is {currentAddress}.</p>
        <hr />

        <SimpleField
          title='Check name'
          handleChange={this.handleChange}
          changeStateName='nameValue'
          value={addressValue}
          onClickFunc={this.onResolveAddressSubmit}
          buttonText='Check'
          label='Type name'
          helperText='Address is'
        />
        <hr />
        <SimpleField
          title='Set Name'
          handleChange={this.handleChange}
          changeStateName='newNameValue'
          onClickFunc={this.onAssignNameSubmit}
          buttonText='Set'
          label='Type name'
          helperText=''
          value=''
        />

        <hr />
        <SimpleField
          title='Check Min Limit'
          handleChange={this.handleChange}
          changeStateName='limitAddress'
          value={minLimit}
          onClickFunc={this.onGetMinLimitSubmit}
          buttonText='Check'
          label='Type Address'
          helperText='Min Limit Length'
        />
        <hr />
        {currentAddress === ansOwner && this.renderOwnerPart()}
      </Fragment>
    )
  }
}

