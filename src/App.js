import React, { Component } from 'react';

import GHUSDContract from './components/GHUSDContract'
import AddressNameService from './components/AddressNameService'
import Proof from './components/Proof'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
		console.log('TCL: App -> handleChange -> value', value)
		console.log('TCL: App -> handleChange -> event', event)
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><GHUSDContract /></TabContainer>}
        {value === 1 && <TabContainer><AddressNameService /></TabContainer>}
        {value === 2 && <TabContainer><Proof /></TabContainer>}
      </div>
    );
  }
}
export default App;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
