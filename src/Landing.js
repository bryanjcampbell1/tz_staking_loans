import React, { useState, useEffect } from "react";
import {Button, Card} from 'react-bootstrap';
import "./App.css";

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
            <div className="container">
              <h1>Please sign up or login</h1>
              <input
                  type="email"
                  name="email"
                  required="required"
                  placeholder="Enter your email"
                  onChange={event => {
                    setEmail(event.target.value);
                  }}
              />
              <button onClick={login}>Send</button>
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