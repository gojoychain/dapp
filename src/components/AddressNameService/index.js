import React, { Component, Fragment } from 'react'
import SimpleField from '../SimpleField'
import web3 from '../../web3';
import ghusd from '../../ghusd';
import ans from '../../ans';
import { withStyles, Paper } from '@material-ui/core';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});
class AddressNameService extends Component{
  state = {
    currentAddress: '',
    owner: '',
    newOwner: '',
    nameValue: '',
    addressValue: '',
    newNameValue: '',
    minLimit: '',
    newMinLimit: '',
    limitAddress: ''
  };

  initState = async () => {
    const { currentAddress } = this.props
    if(!currentAddress) return;
    const ghusdBalance = await ghusd.methods.balanceOf(currentAddress).call();
    const balance = await web3.eth.getBalance(currentAddress);
    const owner = await ans.methods.owner().call();
    // await this.onGetMinLimitSubmit();
    this.setState({ currentAddress, owner, ghusdBalance, balance });
  }

  componentDidMount() {
    this.initState()
  }

  componentDidUpdate(prevProps, prevStates) {
    const { currentAddress } = this.props
    if(prevProps.currentAddress !== currentAddress){
      this.initState()
    }
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
    const { currentAddress } = this.props
    await ans.methods.assignName(this.state.newNameValue).send({
      from: currentAddress
    });
    this.setState({ nameValue: this.state.newNameValue });
  }

  onGetMinLimitSubmit = async () => {
    const minLimit = await ans.methods.getMinLimit(this.state.limitAddress).call();
    this.setState({ minLimit });
  }

  onSetMinLimitSubmit = async () => {
    const { currentAddress } = this.props
    await ans.methods.setMinLimit(this.state.limitAddress, this.state.newMinLimit).send({
      from: currentAddress
    });
    this.setState({ minLimit: await ans.methods.getMinLimit(this.state.limitAddress).call() });
  }

  onTransferAnsSubmit = async () => {
    const { currentAddress } = this.props
    await ans.methods.transferOwnership(this.state.newOwner).send({
      from: currentAddress
    });
    this.setState({ owner: await ans.methods.owner().call() });
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
          changeStateName='newOwner'
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
    const { owner, addressValue, minLimit } = this.state
    const { classes, currentAddress } = this.props
    return(
      <Paper className={classes.root}>
        <h2>Address Name Service Contract</h2>
        <p>This contract is owned by {owner}.</p>
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
        {
          currentAddress && <SimpleField
            title='Set Name'
            handleChange={this.handleChange}
            changeStateName='newNameValue'
            onClickFunc={this.onAssignNameSubmit}
            buttonText='Set'
            label='Type name'
            helperText=''
            value=''
          />
        }
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
        {currentAddress === owner && this.renderOwnerPart()}
      </Paper>
    )
  }
}

export default withStyles(styles)(AddressNameService)