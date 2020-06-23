import React, { Component } from 'react'
import {Button, Modal, Card,} from 'react-bootstrap';

import {X} from 'react-bootstrap-icons';

import contractData from "./contract";
import store from './store.js';

import firebase from './firebase';
require("firebase/firestore");
var db = firebase.firestore();


const magic = store.magic

class PreviewModal extends Component {
    constructor(props) {
        super(props)
        this.state = {screen: 1,

        }
    }

    async createCertificate(){
        let that = this;
        let lastId = 0;
        //get last certificate id
        let lastIdRef = db.collection("last_Id").doc("last_Id");

        await lastIdRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().last_Id);

                lastId = doc.data().last_Id;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        const params = {
            contract: contractData.address,
            amount: (this.props.deposit+1)*100000,
            fee: 100000,
            derivationPath: '',
            storageLimit: 20000,
            gasLimit: 500000,
            entrypoint: '',
            parameters: `(Left (Left (Right (Left ${ this.props.months }))))`,
            parameterFormat: 'michelson'
        };

        try {
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

            let nextId = lastId + 1;
            const publicAddress = await magic.tezos.getAccount();

            var docData = {
                id: nextId ,
                amount: this.props.deposit,
                stakePaid: this.props.stake,
                date: this.props.date,
                redeemed:false,
                owner:publicAddress

            };
            db.collection("certificates").doc(nextId.toString()).set(docData).then(function() {
                console.log("Document successfully written!");
            });

            //increment last_Id
            const increment = firebase.firestore.FieldValue.increment(1)
            await lastIdRef.update({ last_Id: increment });

            this.setState({screen: 2});

        } catch(err) {

            alert(err);
        }


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
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold',marginTop:5}}>Review Transaction</p>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>
                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Deposit</p>
                                                <ul style={{fontSize:14, color:'slate', marginTop:-5}}>
                                                    <li>  {this.props.deposit} XTZ </li>
                                                </ul>
                                                <hr/>
                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Return</p>
                                                <ul style={{fontSize:14, color:'slate', marginTop:-5}}>
                                                    <li> {this.props.stake} {this.props.currency} Stake </li>
                                                    <li> Certificate redeemable for {this.props.deposit} XTZ on the date {this.props.date}</li>
                                                </ul>
                                               <hr/>
                                                <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Price</p>
                                                <div style={{display:'flex', justifyContent:'center', marginTop:-15}}>
                                                    <p style={{fontSize:14, color:'slate', }}>{this.props.deposit} XTZ</p>
                                                    <p style={{fontSize:12, color:'grey', fontStyle:'italic', marginLeft:4 , marginTop:2}}> + 1.00 XTZ (fee) </p>
                                                </div>
                                                <hr/>
                                                <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Total</p>
                                                <div style={{display:'flex', justifyContent:'center', marginTop:-15}}>
                                                    <p style={{fontSize:14, color:'slate', }}>{Number(this.props.deposit) + 1.00}  XTZ</p>
                                                </div>
                                            </Card.Body>
                                        </Card>

                                        <div style={{display:'flex', justifyContent:'center', marginTop:20 }}>
                                            <Button size="lg" onClick={() => this.createCertificate()  } style={{color:'white', backgroundColor:'seagreen'}}>Confirm</Button>
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
                                                marginTop:5
                                                }}>Congratulations, you successfully got your stake!</p>

                                            <Card style={{backgroundColor:''}}>
                                                <Card.Body>
                                                    <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Received</p>
                                                    <ul>
                                                        <li> <p style={{fontSize:14, color:'slate'}}> {this.props.stake} {this.props.currency} Stake</p> </li>
                                                        <li> <p style={{fontSize:14, color:'slate'}}> Certificate redeemable for {this.props.deposit} XTX on the date {this.props.date}</p> </li>
                                                    </ul>
                                                </Card.Body>
                                            </Card>
                                            <div style={{display:'flex'}}>
                                                <p style={{fontSize:14, color:'grey', marginTop:30}}>You may now check your Certificates page for updates</p>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'center', marginTop:0 }}>
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

export default PreviewModal;


