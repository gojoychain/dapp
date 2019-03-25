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
        title="Set Min Limit (Only Owner)"
        description="Sets the minimum length for a given address."
        handleChange={this.handleChange}
        changeStateName="limitAddress"
        value=""
        onClickFunc={this.onSetMinLimitSubmit}
        buttonText="Set"
        label="Address"
        helperText=""
        secondInputLabel="Minimum Length"
        secondInputChangeStateName="newMinLimit"
      />
      <SimpleField
        title="Transfer Ownership (Only Owner)"
        description="Transfers the contract ownership to the given address."
        handleChange={this.handleChange}
        changeStateName="newOwner"
        value=""
        onClickFunc={this.onTransferAnsSubmit}
        buttonText="Set"
        label="Address"
        helperText=""
      />
    </Fragment>
  )

  render() {
    const { classes, currentAddress } = this.props;
    const { owner, addressValue, minLimit } = this.state;

    return (
      <TabContentContainer>
        <div className={classes.contractInfoContainer}>
          <Typography variant="h4" className={classes.heading}>
            Address Name Service Contract
          </Typography>
          <Typography variant="subtitle1">
            This contract is owned by <AddressWrapper>{owner}</AddressWrapper>.
          </Typography>
          <Typography variant="subtitle1">
            Your account address is <AddressWrapper>{currentAddress}</AddressWrapper>.
          </Typography>
        </div>
        <SimpleField
          title="Resolve Name"
          description="Looks up the name and returns the assigned address (if set)."
          handleChange={this.handleChange}
          changeStateName="nameValue"
          value={addressValue && <AddressWrapper>{addressValue}</AddressWrapper>}
          onClickFunc={this.onResolveAddressSubmit}
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
          onClickFunc={this.onGetMinLimitSubmit}
          buttonText="Check"
          label="Address"
          helperText="Min Limit Length "
        />
        {
          currentAddress && (
            <SimpleField
              title="Assign Name"
              description="Assigns the name for the current address."
              handleChange={this.handleChange}
              changeStateName="newNameValue"
              onClickFunc={this.onAssignNameSubmit}
              buttonText="Set"
              label="Name"
              helperText=""
              value=""
            />
          )
        }
        {/* {currentAddress === owner && currentAddress !== undefined && this.renderOwnerPart()} */}
        {this.renderOwnerPart()}
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(AddressNameService);
