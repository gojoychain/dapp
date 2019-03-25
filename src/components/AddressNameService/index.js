import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import SimpleField from '../SimpleField';
import AddressWrapper from '../AddressWrapper';
import styles from './styles';
import TabContentContainer from '../TabContentContainer';
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
    console.log('ans didMount');
    this.initState();
  }

  componentDidUpdate(prevProps) {
    console.log('ans compDidUpdate', prevProps);
    const { mmLoaded } = this.props;
    if (prevProps.mmLoaded !== mmLoaded) {
      this.initState();
    }
  }

  initState = async () => {
    console.log('ans initState', ANS());
    const { currentAddress } = this.props;
    if (!currentAddress || !ANS()) return;

    const owner = await ANS().methods.owner().call();
    this.setState({ owner });
  }

  onResolveAddressSubmit = async () => {
    const { network } = this.props;
    const { nameValue } = this.state;
    const addressValue = await ANS(network).methods.resolveName(nameValue).call();
    this.setState({ addressValue });
  }

  onAssignNameSubmit = async () => {
    const { currentAddress, network } = this.props;
    const { newNameValue } = this.state;
    await ANS(network).methods.assignName(newNameValue).send({
      from: currentAddress,
    });
    this.setState({ nameValue: newNameValue });
  }

  onGetMinLimitSubmit = async () => {
    const { network } = this.props;
    const { limitAddress } = this.state;
    const minLimit = await ANS(network).methods.getMinLimit(limitAddress).call();
    this.setState({ minLimit });
  }

  onSetMinLimitSubmit = async () => {
    const { currentAddress, network } = this.props;
    const { limitAddress, newMinLimit } = this.state;
    await ANS(network).methods.setMinLimit(limitAddress, newMinLimit).send({
      from: currentAddress,
    });
    const minLimit = await ANS(network).methods.getMinLimit(limitAddress).call();
    this.setState({ minLimit });
  }

  onTransferAnsSubmit = async () => {
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
    const { classes, currentAddress } = this.props;
    const { owner, addressValue, minLimit } = this.state;

    console.log('ans render', this.props);

    return (
      <TabContentContainer>
        <Typography variant="h4" className={classes.heading}>
          Address Name Service Contract
        </Typography>
        <Typography variant="h6">
          This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.
        </Typography>
        <Typography variant="h6">
          Your account address is <AddressWrapper>{currentAddress}</AddressWrapper>.
        </Typography>
        <hr />
        <SimpleField
          title="Lookup Name"
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
        {/* {currentAddress === owner && currentAddress !== undefined && this.renderOwnerPart()} */}
        {this.renderOwnerPart()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(AddressNameService);
