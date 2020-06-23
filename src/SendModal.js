import React, { Component } from 'react'
import {Button, Modal, Card, Row, Form, InputGroup, FormControl,} from 'react-bootstrap';

import {X} from 'react-bootstrap-icons';

import contractData from "./contract";
import store from './store.js';

import firebase from './firebase';
import {Magic} from "magic-sdk";
import {TezosExtension} from "@magic-ext/tezos";

require("firebase/firestore");
var db = firebase.firestore();

const magic = new Magic("pk_test_8363773537E9D19E", {
    extensions: {
        tezos: new TezosExtension({
            rpcUrl: "https://tezos-dev.cryptonomic-infra.tech:443/"
        })
    }
});

class SendModal extends Component {
    constructor(props) {
        super(props)
        this.state = {screen: 1,

        }
    }

    async send(){

        const params = {
            contract: contractData.address,
            amount: 0,
            fee: 100000,
            derivationPath: '',
            storageLimit: 20000,
            gasLimit: 500000,
            entrypoint: 'transfer',
            parameters: `{ Pair ${store.publicAddress} {Pair ${this.state.sendAddress} (Pair ${this.props.tokenId} 1)} }`,
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

        db.collection("certificates").doc(this.props.tokenId.toString()).set({
            owner: this.state.sendAddress,
        }, { merge: true })

        this.setState({screen: 2});
    }

    hideModal(){
        this.setState({
            screen: 1,
            sendAddress:''
        });

        this.props.onHide();
    }

    render(){
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div>
                        {(() => {
                            switch (this.state.screen) {
                                case 1:
                                    return(<div>
                                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                                            <X color="slate" size={20} onClick={() => this.hideModal()}/>
                                        </div>
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold',marginTop:5}}>Send Certificate</p>

                                        <Form.Group controlId="sendAddress">
                                            <Form.Label style={{color:'slate', fontSize:14, }}>Receiving Address</Form.Label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="tz1..."
                                                    aria-label="Deposit"
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e)=> this.setState({sendAddress: e.target.value})}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>

                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Details</p>

                                                <div style={{display:'flex'}}>
                                                    <p style={{color:'slate', fontSize:14}}>
                                                        Transfer of Tezos IOU Certificate redeemable for {this.props.amount} XTZ on the date of {this.props.date}
                                                    </p>
                                                </div>

                                            </Card.Body>
                                        </Card>

                                        <div style={{display:'flex', justifyContent:'center', marginTop:15 }}>
                                            <Button size="lg" onClick={() => this.send()  } style={{color:'white', backgroundColor:'seagreen'}}>Send</Button>
                                        </div>
                                    </div>);
                                case 2:
                                    return(
                                        <div>
                                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                                                <X color="slate" size={20} onClick={() => this.hideModal()}/>
                                            </div>
                                            <p style={{color:'grey',
                                                fontSize:14,
                                                fontWeight:'bold',
                                                marginTop:5,
                                                }}>Congratulations, you successfully sent the certificate!
                                            </p>

                                            <Card style={{backgroundColor:'',marginTop:10}}>
                                                <Card.Body>
                                                    <div style={{display:'flex', marginTop:10}} >
                                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Transaction Hash</p>
                                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                        <p style={{fontSize:14, color:'slate'}}> ooasdaradreraravafvafvafdfv</p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <div style={{display:'flex'}}>
                                                <p style={{fontSize:14, color:'grey', marginTop:20}}>You may now check the Certificates page for updates</p>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'center', marginTop:10, marginBottom:10 }}>
                                                <Button size="lg" onClick={() => this.hideModal()} style={{ background:'whitesmoke', fontSize:22, color:'slategray', width:150,}}>
                                                    Ok
                                                </Button>
                                            </div>
                                        </div>);
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default SendModal;





