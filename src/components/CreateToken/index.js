import React, { Component, Fragment } from 'react';
import {
  withStyles,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';

import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import web3 from '../../web3';
import GRC223 from '../../contracts/grc223';
import { toLowestDenom } from '../../utils/convert';

class CreateToken extends Component {
  state = {
    name: '',
    symbol: '',
    decimals: '',
    totalSupply: '',
    owner: '',
    response: 'resp',
  };

  componentDidMount() {
    // this.initState();
  }

  componentDidUpdate(prevProps) {
    // const { mmLoaded } = this.props;
    // if (prevProps.mmLoaded !== mmLoaded) {
    //   this.initState();
    // }
  }

  // initState = async () => {
  //   const { currentAddress } = this.props;
  //   if (!currentAddress || !web3) return;

  //   const owner = await GHUSD().methods.owner().call();
  //   const ghusdBalance = await GHUSD().methods.balanceOf(currentAddress).call();
  //   const balance = await web3.eth.getBalance(currentAddress);
  //   this.setState({ owner, ghusdBalance, balance });
  // }

  createToken = () => {
    const {
      name,
      symbol,
      decimals,
      totalSupply,
      owner,
    } = this.state;

    const encodedParams = web3.eth.abi.encodeParameters(
      ['string', 'string', 'uint8', 'uint256', 'address'],
      [name, symbol, decimals, toLowestDenom(totalSupply, decimals), owner],
    ).substr(2);

    // web3.eth.sendTransaction({
    //   from: web3.eth.accounts[0],
    //   gasLimit: 2000000,
    //   data: GRC223.bytecode + encodedParams,
    // });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderForm = () => {
    const { classes } = this.props;
    const {
      name,
      symbol,
      decimals,
      totalSupply,
      owner,
    } = this.state;

    return (
      <div className={classes.fieldsContainer}>
        <TextField
          id="name"
          className={classes.textField}
          label="Name"
          value={name}
          onChange={this.handleChange('name')}
        />
        <TextField
          id="symbol"
          className={classes.textField}
          label="Symbol"
          value={symbol}
          onChange={this.handleChange('symbol')}
        />
        <TextField
          id="decimals"
          className={classes.textField}
          label="Decimals"
          value={decimals}
          onChange={this.handleChange('decimals')}
        />
        <TextField
          id="totalSupply"
          className={classes.textField}
          label="Total Supply"
          value={totalSupply}
          onChange={this.handleChange('totalSupply')}
        />
        <TextField
          id="owner"
          className={classes.textField}
          label="Owner"
          value={owner}
          onChange={this.handleChange('owner')}
        />
        <div>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            color="secondary"
            onClick={this.createToken}
          >
            Create Token
          </Button>
        </div>
      </div>
    );
  }

  renderResponse = () => {
    const { response } = this.state;
    return response && (
      <Typography variant="subtitle2">
        Transaction ID: {response}
      </Typography>
    );
  }

  render() {
    const { classes, currentAddress } = this.props;

    if (!currentAddress || !web3) {
      return <div />;
    }

    return (
      <TabContentContainer>
        <ContractInfoContainer>
          <Typography variant="h4" className={classes.heading}>
            Create GRC223 Token
          </Typography>
        </ContractInfoContainer>
        {this.renderForm()}
        {this.renderResponse()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(CreateToken);
