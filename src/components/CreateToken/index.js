import React, { Component } from 'react';
import { withStyles, Typography, Button } from '@material-ui/core';
import { isFinite } from 'lodash';

import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import FormField from '../FormField';
import web3 from '../../web3';
import JRC223 from '../../contracts/jrc223';
import { toLowestDenom } from '../../utils/convert';

class CreateToken extends Component {
  state = {
    name: '',
    symbol: '',
    decimals: '',
    totalSupply: '',
    owner: '',
    txHash: '',
    txError: '',
  };

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    const { currentAddress } = this.props;
    if (!currentAddress) {
      return;
    }
    this.setState({ owner: currentAddress });
  }

  createToken = () => {
    if (!this.isFormComplete()) {
      return;
    }

    const { currentAddress } = this.props;
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

    web3.eth.sendTransaction({
      from: currentAddress,
      gasLimit: 2000000,
      data: JRC223.bytecode + encodedParams,
    }).on('transactionHash', (hash) => {
      this.setState({ txHash: hash });
    }).on('error', (err) => {
      this.setState({ txError: err.message });
    });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  validateName = () => {
    const { name } = this.state;
    return name;
  }

  validateSymbol = () => {
    const { symbol } = this.state;
    return symbol;
  }

  validateDecimals = () => {
    const { decimals } = this.state;
    try {
      return decimals && isFinite(Number(decimals));
    } catch (err) {
      return false;
    }
  }

  validateTotalSupply = () => {
    const { totalSupply } = this.state;
    try {
      return totalSupply && isFinite(Number(totalSupply));
    } catch (err) {
      return false;
    }
  }

  validateOwner = () => {
    const { owner } = this.state;
    return web3.utils.isAddress(owner);
  }

  isFormComplete = () => this.validateName()
    && this.validateSymbol()
    && this.validateDecimals()
    && this.validateTotalSupply()
    && this.validateOwner();

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
        <FormField
          id="name"
          label="Name"
          value={name}
          onChange={this.handleChange('name')}
          error={!this.validateName()}
        />
        <FormField
          id="symbol"
          label="Symbol"
          value={symbol}
          onChange={this.handleChange('symbol')}
          error={!this.validateSymbol()}
        />
        <FormField
          id="decimals"
          label="Decimals"
          value={decimals}
          onChange={this.handleChange('decimals')}
          error={!this.validateDecimals()}
        />
        <FormField
          id="totalSupply"
          label="Total Supply"
          value={totalSupply}
          onChange={this.handleChange('totalSupply')}
          error={!this.validateTotalSupply()}
        />
        <FormField
          id="owner"
          label="Owner"
          value={owner}
          onChange={this.handleChange('owner')}
          error={!this.validateOwner()}
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
    const { txHash, txError } = this.state;

    // Display error message if found
    if (txError) {
      return (
        <Typography variant="subtitle2" color="error">
          Error: {txError}
        </Typography>
      );
    }

    // Display tx hash
    return txHash && (
      <Typography variant="subtitle2">
        Transaction ID: {txHash}
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
            Create JRC223 PreMinted Token
          </Typography>
        </ContractInfoContainer>
        {this.renderForm()}
        {this.renderResponse()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(CreateToken);
