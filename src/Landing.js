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
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sendXTZAmount, setSendXTZAmount] = useState(0);
  const [contractoperationGroupID, setContractoperationGroupID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const [transactionOperationGroupID, setTransactionOperationGroupID] = useState("");

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

  const handlerSendTransaction = async () => {
    const result = await magic.tezos.sendTransactionOperation(
        destinationAddress,
        parseInt(sendXTZAmount * 1000000),
        15000,
        ""
    );

    const operationGroupID = result.operationGroupID.trim();

    setTransactionOperationGroupID(
        operationGroupID.substring(1, operationGroupID.length - 1)
    );
    console.log(`Injected operation group id ${operationGroupID}`);

  };

  const handleSendContractOrigination = async () => {
    const contract = contractData.code;
    const storage = contractData.storage;

    const params = {
      amount: 0,
      delegate: undefined,
      fee: 100000,
      derivationPath: "",
      storage_limit: 20000,
      gas_limit: 500000,
      code: contract,
      storage,
      codeFormat: "micheline"
    };

    const result = await magic.tezos.sendContractOriginationOperation(
        params.amount,
        params.delegate,
        params.fee,
        params.derivationPath,
        params.storage_limit,
        params.gas_limit,
        params.code,
        params.storage,
        params.codeFormat
    );

    const operationGroupID = result.operationGroupID.trim();

    setContractoperationGroupID(
        operationGroupID.substring(1, operationGroupID.length - 1)
    );
    console.log(
        `Injected operation group id ${result.operationGroupID}`,
        result
    );
  };

  const handleInvokeContract = async () => {

    const params = {
      contract: contractData.address,
      amount: 100000000,
      fee: 100000,
      derivationPath: '',
      storageLimit: 20000,
      gasLimit: 500000,
      entrypoint: '',
      parameters: '(Left (Left (Right (Left 5))))',
      parameterFormat: 'michelson'
    };

    const result = await magic.tezos.sendContractInvocationOperation(
        params.contract,
        params.amount,
        params.fee,
        params.derivationPath,
        params.storageLimit,
        params.gasLimit,
        params.entrypoint,
        params.parameters,
        params.parameterFormat
    );
    console.log(`Injected operation`, result);
  };

  const redeem = async () => {

    const params = {
      contract: contractData.address,
      amount: 100000000,
      fee: 100000,
      derivationPath: '',
      storageLimit: 20000,
      gasLimit: 500000,
      entrypoint: '',
      parameters: '(Left (Right (Right (Right 0))))',
      parameterFormat: 'michelson'
    };

    const result = await magic.tezos.sendContractInvocationOperation(
        params.contract,
        params.amount,
        params.fee,
        params.derivationPath,
        params.storageLimit,
        params.gasLimit,
        params.entrypoint,
        params.parameters,
        params.parameterFormat
    );
    console.log(`Injected operation`, result);
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
              {/*
              <div >
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
                      <div className="container">
                        <h1>Current user: {userMetadata.email}</h1>
                        <button onClick={logout}>Logout</button>
                      </div>
                      <div className="container">
                        <h1>Tezos address</h1>
                        <div className="info">
                          <a
                              href={`https://carthagenet.tzstats.com/${publicAddress}`}
                              target="_blank"
                          >
                            {publicAddress}
                          </a>
                        </div>
                      </div>
                      <div className="container">
                        <h1>Send Transaction</h1>
                        {
                          transactionOperationGroupID ?
                              <div>
                                <div>
                                  Send transaction success
                                </div>
                                <div className="info">
                                  <a
                                      href={`https://carthagenet.tzstats.com/${transactionOperationGroupID}`}
                                      target="_blank"
                                  >
                                    {transactionOperationGroupID}
                                  </a>
                                </div>
                              </div>
                              :
                              <div/>
                        }
                        <input
                            type="text"
                            name="destination"
                            className="full-width"
                            required="required"
                            placeholder="Destination address"
                            onChange={event => {
                              setDestinationAddress(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            name="amount"
                            className="full-width"
                            required="required"
                            placeholder="Amount in XTZ"
                            onChange={event => {
                              setSendXTZAmount(event.target.value);
                            }}
                        />
                        <button id="btn-send-txn" onClick={handlerSendTransaction}>
                          Send Transaction
                        </button>
                      </div>
                      <div className="container">
                        <h1>Smart Contract</h1>
                        <div className="info">
                          <a
                              href={`https://carthagenet.tzstats.com/${contractoperationGroupID}`}
                              target="_blank"
                          >
                            {contractoperationGroupID}
                          </a>
                        </div>
                        <button id="btn-deploy" onClick={handleSendContractOrigination}>
                          Deploy Contract
                        </button>
                      </div>
                    </div>
                )}
              </div>
              */}
              {/*
              <Button onClick={handleSendContractOrigination} style={{marginLeft:10}}>Originate Contract</Button>
              */}

              <Button onClick={redeem} style={{marginLeft:10}}>invoke Contract</Button>

              <Home />
            </div>
        )}
      </div>
  );
}