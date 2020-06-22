import React, { useState, useEffect } from "react";
import {Button, Image, Row, Col} from 'react-bootstrap';
import "./App.css";
import Safe from './TezosSafe.png';

import {observer} from 'mobx-react';
import store from './store.js';


const Landing = observer(
    function Landing() {
    const [email, setEmail] = useState("");

    useEffect(() => {
      store.magic.user.isLoggedIn().then(async magicIsLoggedIn => {
          store.setIsLoggedIn(magicIsLoggedIn);
        if (magicIsLoggedIn) {
          store.setUserMetadata(await store.magic.user.getMetadata());
          store.setPublicAddress(await store.magic.tezos.getAccount());
        }
      });
    });

    const login = async () => {
      await store.magic.auth.loginWithMagicLink({ email });
      store.setIsLoggedIn(true);
    };

    return (
        <div className="App">
            <Row style={ {marginTop:40}}>
              <Col style={{display:'flex', flexDirection:'column' }} sm={12} md={6}>
                <div style={{display:'flex', justifyContent:'flex-start', marginLeft:40}}>
                  <p style={{fontWeight:'bold', fontSize:42, color:'dodgerblue'}}>Get your future stake now </p>
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
    );
  }
);

export default Landing;