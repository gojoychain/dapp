import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import styles from './styles';
import TabContentContainer from '../TabContentContainer';
import ContractInfoContainer from '../ContractInfoContainer';
import web3 from '../../web3';
import GRC223 from '../../contracts/grc223';

class CreateToken extends Component {
  state = {
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

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

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
      </TabContentContainer>
    );
  }
}

export default withStyles(styles)(CreateToken);
