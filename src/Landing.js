import React, { useState, useEffect } from "react";
import {Button, Image,Card, Row, Col} from 'react-bootstrap';
import "./App.css";
import Safe from './TezosSafe.png';
import contractData from "./mock_contract";

import { Magic } from "magic-sdk";
import { TezosExtension } from "@magic-ext/tezos";
import Home from "./Home";


const magic = new Magic("pk_test_8363773537E9D19E", {
  extensions: {
    tezos: new TezosExtension({
      rpcUrl: "https://tezos-dev.cryptonomic-infra.tech:443/"
    })
  }
});



export default function Landing() {
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

              <Row style={ {marginTop:20}}>
                <Col style={{display:'flex', alignItems:'center', flexDirection:'column' }} xs={6}>
                  <div style={{display:'flex', justifyContent:'flex-start', marginLeft:20}}>
                    <p style={{fontWeight:'bold', fontSize:45, color:'dodgerblue'}}>Get your future stake now </p>
                  </div>
                  <div style={{display:'flex', justifyContent:'flex-start', marginLeft:20}}>
                    <p style={{fontWeight:'bold', fontSize:20, color:'grey'}}>
                      Lock your Tezos and get 4% compound intrest UP FRONT.
                      There is no liquidation, and you always get your locked funds back.
                    </p>
                  </div>
                </Col>
                <Col style={{display:'flex', justifyContent:'center',}}>
                  <Image src={Safe} style={{width:'60%',}} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div style={{display:'flex', justifyContent:'flex-start', flexDirection:'row', marginLeft:20}}>
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