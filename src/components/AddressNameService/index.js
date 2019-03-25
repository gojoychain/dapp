import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import SimpleField from '../SimpleField';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import ANS from '../../contracts/ans';

class AddressNameService extends Component {
  state = {
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
    const { currentAddress } = this.props;
    if (!currentAddress || !ANS()) return;

    const owner = await ANS().methods.owner().call();
    this.setState({ owner });
  }

  resolveAddress = async () => {
    const { network } = this.props;
    const { nameValue } = this.state;
    const addressValue = await ANS(network).methods.resolveName(nameValue).call();
    this.setState({ addressValue });
  }

  getMinLimit = async () => {
    const { network } = this.props;
    const { limitAddress } = this.state;
    const minLimit = await ANS(network).methods.getMinLimit(limitAddress).call();
    this.setState({ minLimit });
  }

  assignName = async () => {
    const { currentAddress, network } = this.props;
    const { newNameValue } = this.state;
    await ANS(network).methods.assignName(newNameValue).send({
      from: currentAddress,
    });
    this.setState({ nameValue: newNameValue });
  }

  setMinLimit = async () => {
    const { currentAddress, network } = this.props;
    const { limitAddress, newMinLimit } = this.state;
    await ANS(network).methods.setMinLimit(limitAddress, newMinLimit).send({
      from: currentAddress,
    });
    const minLimit = await ANS(network).methods.getMinLimit(limitAddress).call();
    this.setState({ minLimit });
  }

  transferOwnership = async () => {
    const { currentAddress, network } = this.props;
    const { newOwner } = this.state;
    await ANS(network).methods.transferOwnership(newOwner).send({
      from: currentAddress,
    });
    const owner = await ANS.methods.owner().call();
    this.setState({ owner });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderOwnerFunctions = () => {
    const { currentAddress } = this.props;
    const { owner } = this.state;
    return currentAddress && owner && currentAddress === owner
      && (
        <Fragment>
          <SimpleField
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
          <SimpleField
            title="Transfer Ownership (Only Owner)"
            description="Transfers the contract ownership to the given address."
            handleChange={this.handleChange}
            changeStateName="newOwner"
            onClickFunc={this.transferOwnership}
            buttonText="Set"
            label="Address"
          />
        </Fragment>
      );
  }

  render() {
    const { classes, currentAddress } = this.props;
    const { owner, addressValue, minLimit } = this.state;

    return (
      <TabContentContainer>
        <ContractInfoContainer>
          <Typography variant="h4" className={classes.heading}>
            Address Name Service Contract
          </Typography>
          <Typography variant="subtitle1">
            This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.
          </Typography>
          <Typography variant="subtitle1">
            Your account address is <AddressWrapper>{currentAddress}</AddressWrapper>.
          </Typography>
        </ContractInfoContainer>
        <SimpleField
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
        <SimpleField
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
            <SimpleField
              title="Assign Name"
              description="Assigns the name for the current address."
              handleChange={this.handleChange}
              changeStateName="newNameValue"
              onClickFunc={this.assignName}
              buttonText="Set"
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
