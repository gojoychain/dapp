import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { isString } from 'lodash';
import APIField from '../APIField';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import ANS from '../../contracts/ans';
import { addressesEqual } from '../../utils';

class AddressNameService extends Component {
  state = {
    contract: undefined,
    owner: '',
    newOwner: '',
    nameValue: '',
    addressValue: '',
    newNameValue: '',
    minLimit: '',
    newMinLimit: '',
    limitAddress: '',
  };

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps) {
    const { mmLoaded } = this.props;
    if (prevProps.mmLoaded !== mmLoaded) {
      this.initState();
    }
  }

  initState = async () => {
    const { network, currentAddress } = this.props;
    if (!network || !currentAddress) return;

    const contract = ANS(network);
    const owner = await contract.methods.owner().call();
    this.setState({ contract, owner });
  }

  resolveAddress = async () => {
    const { contract, nameValue } = this.state;
    const addressValue = await contract.methods.resolveName(nameValue).call();
    this.setState({ addressValue });
  }

  getMinLimit = async () => {
    const { contract, limitAddress } = this.state;
    const minLimit = await contract.methods
      .getMinLimit(limitAddress.toLowerCase())
      .call();
    this.setState({ minLimit });
  }

  assignName = async () => {
    const { currentAddress } = this.props;
    const { contract, newNameValue } = this.state;
    await contract.methods
      .assignName(newNameValue)
      .send({ from: currentAddress });
    this.setState({ nameValue: newNameValue });
  }

  setMinLimit = async () => {
    const { currentAddress } = this.props;
    const { contract, limitAddress, newMinLimit } = this.state;
    await contract.methods
      .setMinLimit(limitAddress.toLowerCase(), newMinLimit)
      .send({ from: currentAddress });
  }

  transferOwnership = async () => {
    const { currentAddress } = this.props;
    const { contract, newOwner } = this.state;
    await contract.methods
      .transferOwnership(newOwner)
      .send({ from: currentAddress });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: isString(event.target.value)
        ? event.target.value.toLowerCase()
        : event.target.value,
    });
  };

  renderOwnerFunctions = () => {
    const { currentAddress } = this.props;
    const { owner } = this.state;
    return addressesEqual(currentAddress, owner) && (
      <Fragment>
        <APIField
          title="Set Min Limit (Only Owner)"
          description="Sets the minimum length for a given address."
          handleChange={this.handleChange}
          changeStateName="limitAddress"
          onClickFunc={this.setMinLimit}
          buttonText="Set"
          label="Address"
          secondInputLabel="Minimum Length"
          secondInputChangeStateName="newMinLimit"
        />
        <APIField
          title="Transfer Ownership (Only Owner)"
          description="Transfers the contract ownership to the given address."
          handleChange={this.handleChange}
          changeStateName="newOwner"
          onClickFunc={this.transferOwnership}
          buttonText="Transfer"
          label="Address"
        />
      </Fragment>
    );
  }

  render() {
    const { classes, currentAddress } = this.props;
    const { owner, addressValue, minLimit } = this.state;

    if (!currentAddress) {
      return <div />;
    }

    return (
      <TabContentContainer>
        <ContractInfoContainer>
          <Typography variant="h4" className={classes.heading}>
            Address Name Service Contract
          </Typography>
          <Typography variant="subtitle1">
            This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.
          </Typography>
        </ContractInfoContainer>
        <APIField
          title="Resolve Name"
          description="Looks up the name and returns the assigned address (if set)."
          handleChange={this.handleChange}
          changeStateName="nameValue"
          value={addressValue && <AddressWrapper>{addressValue}</AddressWrapper>}
          onClickFunc={this.resolveAddress}
          buttonText="Check"
          label="Name"
          helperText="Address is "
        />
        <APIField
          title="Check Min Limit"
          description="Returns the minimum length for a given address."
          handleChange={this.handleChange}
          changeStateName="limitAddress"
          value={minLimit}
          onClickFunc={this.getMinLimit}
          buttonText="Check"
          label="Address"
          helperText="Min Limit is "
        />
        {
          currentAddress && (
            <APIField
              title="Assign Name"
              description="Assigns the name for the current address."
              handleChange={this.handleChange}
              changeStateName="newNameValue"
              onClickFunc={this.assignName}
              buttonText="Assign"
              label="Name"
            />
          )
        }
        {this.renderOwnerFunctions()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(AddressNameService);
