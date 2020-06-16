import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {observer} from 'mobx-react';
import store from './store.js';



import Landing from "./Landing";
import Certificates from './Certificates'

const App = observer(
    class App extends React.Component {

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

              <Navbar style={{backgroundColor:'#79BEDB'}}>
                <Navbar.Brand href="/" style={{marginLeft:5, fontWeight:'bold',color:'darkslategrey'}}>AccessStaking</Navbar.Brand>
                  {
                      (store.isLoggedIn)?
                          <div>
                              <Nav>
                                  <Nav.Link href="/Certificates" style={{ fontWeight:'bold', color:'slate'}}>Certificates</Nav.Link>
                              </Nav>
                          </div>
                   :
                          <div></div>
                  }
              </Navbar>

              <Router>
                <Switch>
                  <Route exact path="/" component={Landing}/>
                  <Route path="/Certificates" component={Certificates}/>
                </Switch>
              </Router>
              <div style={ {backgroundColor:'#79BEDB', marginTop:150, height:120}}></div>
            </div>
        );
      }
    }
);

export default App