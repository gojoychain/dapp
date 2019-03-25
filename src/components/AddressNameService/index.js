import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import SimpleField from '../SimpleField';
import ans from '../../contracts/ans';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';

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
    const { currentAddress } = this.props;
    if (prevProps.currentAddress !== currentAddress) {
      this.initState();
    }
  }

  initState = async () => {
    const { currentAddress, network } = this.props;
    if (!currentAddress) return;

    const owner = await ans(network).methods.owner().call();
    this.setState({
      owner,
    });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onResolveAddressSubmit = async () => {
    const { network } = this.props;
    const { nameValue } = this.state;
    const addressValue = await ans(network).methods.resolveName(nameValue).call();
    this.setState({ addressValue });
  }

  onAssignNameSubmit = async () => {
    const { currentAddress, network } = this.props;
    const { newNameValue } = this.state;
    await ans(network).methods.assignName(newNameValue).send({
      from: currentAddress,
    });
    this.setState({ nameValue: newNameValue });
  }

  onGetMinLimitSubmit = async () => {
    const { network } = this.props;
    const { limitAddress } = this.state;
    const minLimit = await ans(network).methods.getMinLimit(limitAddress).call();
    this.setState({ minLimit });
  }

  onSetMinLimitSubmit = async () => {
    const { currentAddress, network } = this.props;
    const { limitAddress, newMinLimit } = this.state;
    await ans(network).methods.setMinLimit(limitAddress, newMinLimit).send({
      from: currentAddress,
    });
    const minLimit = await ans(network).methods.getMinLimit(limitAddress).call();
    this.setState({ minLimit });
  }

  onTransferAnsSubmit = async () => {
    const { currentAddress, network } = this.props;
    const { newOwner } = this.state;
    await ans(network).methods.transferOwnership(newOwner).send({
      from: currentAddress,
    });
    const owner = await ans.methods.owner().call();
    this.setState({ owner });
  }

  renderOwnerPart = () => (
    <Fragment>
      <SimpleField
        title="Set Min Limit"
        handleChange={this.handleChange}
        changeStateName="limitAddress"
        value=""
        onClickFunc={this.onSetMinLimitSubmit}
        buttonText="Set"
        label="Type address"
        helperText=""
        secondInputLabel="Minimum Length"
        secondInputChangeStateName="newMinLimit"
      />
      <hr />
      <SimpleField
        title="Transfer ownership"
        handleChange={this.handleChange}
        changeStateName="newOwner"
        value=""
        onClickFunc={this.onTransferAnsSubmit}
        buttonText="Transfer"
        label="Type new address"
        helperText=""
      />
      <hr />
    </Fragment>
  )

  render() {
    const { currentAddress } = this.props;
    const { owner, addressValue, minLimit } = this.state;

    return (
      <TabContentContainer>
        <h1>Address Name Service Contract</h1>
        <Typography variant="h5">This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.</Typography>
        <Typography variant="h5">Your account address is <AddressWrapper>{currentAddress}</AddressWrapper>.</Typography>
        <hr />
        <SimpleField
          title="Check name"
          handleChange={this.handleChange}
          changeStateName="nameValue"
          value={<AddressWrapper>{addressValue}</AddressWrapper>}
          onClickFunc={this.onResolveAddressSubmit}
          buttonText="Check"
          label="Type name"
          helperText="Address is "
        />
        <hr />
        {
          currentAddress && (
            <SimpleField
              title="Set Name"
              handleChange={this.handleChange}
              changeStateName="newNameValue"
              onClickFunc={this.onAssignNameSubmit}
              buttonText="Set"
              label="Type name"
              helperText=""
              value=""
            />
          )
        }
        <hr />
        <SimpleField
          title="Check Min Limit"
          handleChange={this.handleChange}
          changeStateName="limitAddress"
          value={minLimit}
          onClickFunc={this.onGetMinLimitSubmit}
          buttonText="Check"
          label="Type Address"
          helperText="Min Limit Length "
        />
        <hr />
        {currentAddress === owner && currentAddress !== undefined && this.renderOwnerPart()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(AddressNameService);
