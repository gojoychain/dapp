import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import web3 from './web3';
import GHUSDContract from './components/GHUSDContract';
import AddressNameService from './components/AddressNameService';
import Proof from './components/Proof';

class App extends Component {
  state = {
    value: 0,
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const currentAddress = accounts[0];
    if (currentAddress === undefined) {
      return;
    }
    this.setState({ currentAddress: accounts[0] });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, currentAddress } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Address Name Service" />
            <Tab label="GHUSD" />
            <Tab label="Proof Contract" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><AddressNameService currentAddress={currentAddress} /></TabContainer>}
        {value === 1 && <TabContainer><GHUSDContract currentAddress={currentAddress} /></TabContainer>}
        {value === 2 && <TabContainer><Proof currentAddress={currentAddress} /></TabContainer>}
      </div>
    );
  }
}
export default App;

function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
