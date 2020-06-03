import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



import Landing from "./Landing";
import Certificates from './Certificates'

export default class App extends React.Component {

  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
     // const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
     // const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
     // const networkId = await web3.eth.net.getId();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
     // this.setState({ web3, accounts, });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    return (
        <div>

          <Navbar style={{backgroundColor:'lightblue'}}>
            <Navbar.Brand href="/" style={{marginLeft:5, fontWeight:'bold',}}>AccessStaking</Navbar.Brand>
            <Nav>
              <Nav.Link href="/Certificates" style={{ fontWeight:'bold',}}>Certificates</Nav.Link>
            </Nav>
          </Navbar>

          <Router>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/Certificates" component={Certificates}/>
            </Switch>
          </Router>

          <div style={ {backgroundColor:'lightblue', marginTop:50, height:150}}></div>
        </div>
    );
  }
}
