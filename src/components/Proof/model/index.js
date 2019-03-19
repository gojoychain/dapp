// eslint-disable-page
import React, { Component, Fragment } from 'react'
import { Typography as MTypography, Button, Paper, withStyles } from '@material-ui/core'
import web3 from '../../../web3';
import SimpleField from '../../SimpleField'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});


class ProofOfTransaction extends Component{
  state = {
    newOwner: '',
    checked: false,
  };


  componentDidUpdate(prevProps) {
    const { currentAddress } = this.props
    if(prevProps.currentAddress !== currentAddress){
      this.initState()
    }
  }

  componentDidMount() {
    this.initState()
  }

  initState = async () => {
    const { currentAddress } = this.props
    if(!currentAddress) return;
    const { contractAt } = this.props
    const lastWithdrawBlock = await contractAt.methods.lastWithdrawBlock().call()
    const currentBlockNumber = await web3.eth.getBlockNumber()
    const withdrawInterval = await contractAt.methods.withdrawInterval().call()
    const withdrawAmount = web3.utils.fromWei(await contractAt.methods.withdrawAmount().call() , 'ether')
    const owner = await contractAt.methods.owner().call();
    this.setState({ owner,lastWithdrawBlock, currentBlockNumber, withdrawInterval, withdrawAmount});
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onTransferSubmit = async () => {
    const { contractAt, currentAddress } = this.props
    await contractAt.methods.transferOwnership(this.state.newOwner).send({
      from: currentAddress
    });
    this.setState({ owner: await contractAt.methods.owner().call() });
  }

  onWithdraw = async () => {
    const { contractAt, currentAddress } = this.props
    await contractAt.methods.withdraw().send({
      from: currentAddress
    });
    await this.onCheckSubmit()
    this.renderWithdrawlableText()
  }

  onCheckSubmit = async () => {
    const { contractAt } = this.props
    const lastWithdrawBlock = await contractAt.methods.lastWithdrawBlock().call()
    const currentBlockNumber = await web3.eth.getBlockNumber()
    this.setState({currentBlockNumber, lastWithdrawBlock, checked: true})
  }

  renderWithdrawlableText = () => {
    const { withdrawInterval, withdrawAmount, currentBlockNumber, lastWithdrawBlock } = this.state
    const canWithdraw = currentBlockNumber - lastWithdrawBlock >= withdrawInterval

    let totalWithdrawAmount = 0;
    if(canWithdraw) {
      const times = Math.floor((currentBlockNumber - lastWithdrawBlock) /withdrawInterval)
      totalWithdrawAmount = times * withdrawAmount
    }
    return(
      <Fragment>
        <Typography>Current Block Number: {currentBlockNumber}</Typography>
        <Typography>Last Withdraw Block Numberw: {lastWithdrawBlock}</Typography>
        {
          canWithdraw ?
          (
            <div>
              <Typography>You can withdraw {totalWithdrawAmount} GHU in total.</Typography>
              <Typography>Each time you can withdraw {withdrawAmount} GHU.</Typography>
              <Button variant='contained' color='primary' onClick={this.onWithdraw}>Withdraw</Button>
            </div>
          )
          :
          <Typography>You cannot withdraw now. Next withdraw block number is {Number(lastWithdrawBlock) + Number(withdrawInterval)}</Typography>
        }
      </Fragment>
    )
  }

  render() {
    const { checked, owner } = this.state
    const { title, classes, currentAddress } = this.props
    return(
      <Paper className={classes.root}>
        <h1>{title}</h1>
        <Typography>This contract is owned by {owner}.</Typography>
        <Typography>Your account address is {currentAddress}.</Typography>
        {owner === currentAddress && currentAddress !== undefined &&
          <Fragment>
            <hr />
            <div>
              <Typography>Check withdrawlabe status</Typography>
              <Button variant='contained' color='primary' onClick={this.onCheckSubmit}>Check</Button>
              {checked && this.renderWithdrawlableText()}
            </div>
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
          </Fragment>
        }
      </Paper>
    )
  }
}


export default withStyles(styles)(ProofOfTransaction);

const Typography = (props) => {
  return <MTypography variant='h5'>
      {props.children}
  </MTypography>
}