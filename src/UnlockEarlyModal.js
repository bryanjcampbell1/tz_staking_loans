import React, { Component } from 'react'
import {Button, Modal, Card,} from 'react-bootstrap';

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

class UnlockEarlyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screen: 1,
            hash:''
        }
    }

    async unlock(){

        const params = {
            contract: contractData.address,
            amount: 0,
            fee: 100000,
            derivationPath: '',
            storageLimit: 20000,
            gasLimit: 500000,
            entrypoint: '',
            parameters: `(Left (Right (Right (Right ${this.props.certificate_id}))))`,
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

        await db.collection("certificates").doc(this.props.certificate_id.toString()).set({
            redeemed: true,
        }, { merge: true })


        let hash = result.operationGroupID.substring(1, result.operationGroupID.length-1);

        this.setState({hash:hash, screen: 2});
    }

    hideModal(){
        this.setState({
            screen: 1,
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
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:5}}>Unlock Early</p>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>

                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>
                                                    To unlock early you must pay back the stake you received up front.
                                                </p>
                                                <div style={{display:'flex', justifyContent:'center',marginTop:-10}}>
                                                    <p style={{fontWeight:'bold', fontSize:16, color:'grey'}}>
                                                        ({Number(this.props.stake)} XTZ)
                                                    </p>
                                                </div>
                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate',marginTop:10}}>
                                                    Subtracting the stake from your certificate value leaves you with a return of
                                                </p>
                                                <div style={{display:'flex', justifyContent:'center'}}>
                                                    <p style={{color:'slate', fontSize:22, fontWeight:'bold', }}>
                                                        {this.props.amount - this.props.stake} XTZ
                                                    </p>
                                                </div>

                                            </Card.Body>
                                        </Card>

                                        <div style={{display:'flex', justifyContent:'center', marginTop:20, marginBottom:10 }}>
                                            <Button size="lg" onClick={() => this.unlock()  } style={{color:'white', backgroundColor:'seagreen'}}>Unlock</Button>
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
                                                marginTop:5}}>Congratulations, you successfully unlocked your XTZ!</p>

                                            <Card style={{backgroundColor:''}}>
                                                <Card.Body>
                                                    <p style={{fontWeight:'bold', fontSize:14, color:'slate',marginTop:10}}>{this.props.amount - this.props.stake} XTZ has been returned to your account</p>
                                                    <div style={{display:'flex'}}>
                                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Transaction</p>
                                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                        <a href={`https://carthagenet.tezblock.io/transaction/${this.state.hash}`}
                                                           style={{
                                                               fontSize:12,
                                                               whiteSpace: 'nowrap',
                                                               overflow: 'hidden',
                                                               textOverflow: 'ellipsis'
                                                           }}>
                                                            {this.state.hash}
                                                        </a>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <div style={{display:'flex'}}>
                                                <p style={{fontSize:14, color:'grey', marginTop:30}}>You may now check your Certificates Page for updates</p>
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

export default UnlockEarlyModal;





