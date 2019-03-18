import React, { Component, Fragment } from 'react'
import { Typography, Button } from '@material-ui/core'
import web3 from '../../../web3';
import pot from '../../../pot';
import poi from '../../../poi';
import poc from '../../../poc';
import SimpleField from '../../SimpleField'
const instnaces = { pot, poi, poc }
export default class ProofOfTransaction extends Component{
  state = {
    currentAddress: '',
    newOwner: '',
    balance: '',
    potNewOwner:'',

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
    const withdrawInterval = await pot.methods.withdrawInterval().call()
    const withdrawAmount = web3.utils.fromWei(await pot.methods.withdrawAmount().call() , 'ether')
    const potOwner = await pot.methods.owner().call();
    const poiOwner = await poi.methods.owner().call();
    const pocOwner = await poc.methods.owner().call();
    this.setState({ currentAddress,potOwner, poiOwner, pocOwner, balance, withdrawInterval, withdrawAmount});
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
    const lastWithdrawBlock = await pot.methods.lastWithdrawBlock().call()
    console.log(await pot.methods.withdrawInterval().call())
    // console.log(await pot.methods.withdraw().send({
    //   from: accounts[0]
    // }));
    console.log(await web3.eth.getBlockNumber())

    this.setState({ potWithdrawAmount: await pot.methods.withdrawAmount().call() });
  }


  renderWithdrawlableText = async () => {
    const lastWithdrawBlock = await pot.methods.lastWithdrawBlock().call()
  }

  render() {
    console.log(this.state)
    return(
      <Fragment>
        <button onClick={this.onPotWithdrawAmount}></button>
        <h2>Proof Of Transaction Contract</h2>
        <p>This contract is owned by {this.state.potOwner}.</p>
        <p>Your account address is {this.state.currentAddress}.</p>
        <hr />
        <div>
          <Typography variant='h5'>Check withdrawlabe status</Typography>
          <Button variant='contained' color='primary' >Check</Button>

        </div>

        <hr />


        <SimpleField
          title='Transfer POT ownership'
          handleChange={this.handleChange}
          changeStateName='potNewOwner'
          value=''
          onClickFunc={this.onPotTransferSubmit}
          buttonText='Transfer'
          label='Type new address'
          helperText=''
        />
      </Fragment>
    )
  }
}
