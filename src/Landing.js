import React, { useState, useEffect } from "react";
import {Button, Image,Card, Row, Col} from 'react-bootstrap';
import "./App.css";
import Safe from './TezosSafe.png';
import contractData from "./mock_contract";

import { Magic } from "magic-sdk";
import { TezosExtension } from "@magic-ext/tezos";
import Home from "./Home";
import {observer} from 'mobx-react';
import store from './store.js';


const magic = new Magic("pk_test_8363773537E9D19E", {
  extensions: {
    tezos: new TezosExtension({
      rpcUrl: "https://tezos-dev.cryptonomic-infra.tech:443/"
    })
  }
});


const Landing = observer(
    function Landing() {
    const [email, setEmail] = useState("");
    const [publicAddress, setPublicAddress] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMetadata, setUserMetadata] = useState({});


    useEffect(() => {
      magic.user.isLoggedIn().then(async magicIsLoggedIn => {
        setIsLoggedIn(magicIsLoggedIn);
        if (magicIsLoggedIn) {
          const publicAddress = await magic.tezos.getAccount();
          setPublicAddress(publicAddress);
          setUserMetadata(await magic.user.getMetadata());
          store.setPublicAddress(publicAddress);
          store.setIsLoggedIn(true);
        }
      });
    }, [isLoggedIn]);

    const login = async () => {
      await magic.auth.loginWithMagicLink({ email });
      setIsLoggedIn(true);
    };

    const logout = async () => {
      await magic.user.logout();
      setIsLoggedIn(false);
    };

    return (
        <div className="App">
          {!isLoggedIn ? (
              <div>
                <Row style={ {marginTop:40}}>
                  <Col style={{display:'flex', flexDirection:'column' }} sm={12} md={6}>
                    <div style={{display:'flex', justifyContent:'flex-start', marginLeft:40}}>
                      <p style={{fontWeight:'bold', fontSize:45, color:'dodgerblue'}}>Get your future stake now </p>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-start', marginLeft:40}}>
                      <p style={{fontWeight:'bold', fontSize:20, color:'grey'}}>
                        Lock your Tezos and get 4% compound interest UP FRONT.
                        There is no liquidation, and you always get your locked funds back.
                      </p>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', flexDirection:'row', marginTop:20}} >
                      <input
                          type="email"
                          name="email"
                          required="required"
                          placeholder="Enter your email"
                          onChange={event => {
                            setEmail(event.target.value);
                          }}
                      />
                      <Button onClick={login} style={{marginLeft:10}}>Sign Up / Log In</Button>
                    </div>

                  </Col>
                  <Col style={{display:'flex', justifyContent:'center',}} sm={12} md={6}>
                    <Image src={Safe} style={{width:'60%',}} />
                  </Col>
                </Row>

                </div>
          ) : (
              <div>
                <div className="topRightCorner">
                  <Button variant="outline-secondary" onClick={logout}>Logout</Button>
                </div>


                <div style={{display:"flex", alignItems:'flex-end', flexDirection:'column', marginRight:10}}>
                  <a  style={{fontWeight:'bold', fontSize:16, color:'slate'}}
                      href={`https://carthagenet.tzstats.com/${publicAddress}`}
                      target="_blank"
                  >
                    {publicAddress}
                  </a>
                  <p style={{fontWeight:'bold', fontSize:16, color:'slate'}}>{userMetadata.email}</p>
                </div>

                <Home />
              </div>
          )}
        </div>
    );
  }
);

export default Landing;