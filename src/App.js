import React from "react";
import {Navbar, Nav, Button, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";


import {observer} from 'mobx-react';
import store from './store.js';

import Symbol from './symbol.png';

import Home from "./Home";
import Landing from "./Landing";
import Certificates from './Certificates'

import {Magic} from "magic-sdk";
import {TezosExtension} from "@magic-ext/tezos";

const magic = new Magic("pk_test_8363773537E9D19E", {
    extensions: {
        tezos: new TezosExtension({
            rpcUrl: "https://tezos-dev.cryptonomic-infra.tech:443/"
        })
    }
});

store.setMagic(magic);


const App = observer(
    function App() {

        const logout = async () => {
            console.log("here");
            await magic.user.logout();
            store.setIsLoggedIn(false);
        };

        return (
            <Router>
                <div>
                    <Navbar style={{backgroundColor: '#79BEDB'}}>
                        <LinkContainer to="/" style={{
                            marginLeft: 5,
                            fontWeight: 'bold',
                            color: 'darkslategrey'
                        }}>
                            <Navbar.Brand> <Image src={Symbol} style={{width:30,height:30,marginRight:5,marginTop:-2}} /> AccessStaking</Navbar.Brand>
                        </LinkContainer>
                        {
                            (store.isLoggedIn) ?
                                <div>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="mr-auto">
                                            <LinkContainer to="/Certificates" style={{fontWeight: 'bold', color: 'slate'}}>
                                                <Nav.Link>Certificates</Nav.Link>
                                            </LinkContainer>
                                        </Nav>

                                    </Navbar.Collapse>
                                    <div className="topRightCorner">
                                        <Button variant="outline-secondary" onClick={logout}>Logout</Button>
                                    </div>
                                </div>
                                :
                                <div></div>
                        }

                    </Navbar>
                    <Switch>
                        <Route path="/Certificates">
                            <Certificates/>
                        </Route>
                        <Route path="/">
                            {
                                (store.isLoggedIn) ?
                                    <Home/>
                                    :
                                    <Landing/>
                            }
                        </Route>
                    </Switch>
                </div>
                <div style={{backgroundColor: '#79BEDB', marginTop: 150, height: 120}}></div>
            </Router>
        );
    }
);



export default App