import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card } from 'react-bootstrap';
import SendModal from "./SendModal";
import UnlockEarlyModal from "./UnlockEarlyModal";
import UnlockModal from "./UnlockModal";

import moment from 'moment';
import { Magic } from "magic-sdk";
import { TezosExtension } from "@magic-ext/tezos";

import contractData from "./mock_contract";

import firebase from './firebase';
require("firebase/firestore");
var db = firebase.firestore();

const magic = new Magic("pk_test_8363773537E9D19E", {
    extensions: {
        tezos: new TezosExtension({
            rpcUrl: "https://tezos-dev.cryptonomic-infra.tech:443/"
        })
    }
});

/*

let c1 = {
    id: 320,
    amount: 100,
    stakePaid:12,
    date: 2519211811670
}

let c2 = {
    id: 13,
    amount: 80,
    stakePaid:8,
    date: 1520211811670
}
let c3 = {
    id: 1007,
    amount: 1000,
    stakePaid:26,
    date: 1619211811670
}

let mock_data = [c1,c2,c3];

*/

const Certificate = (props) =>{

    //let rVal = 255*(props.id)/(props.id +255)
    //let gVal = 255*(props.id)/(props.id*props.id)
    //let bVal = 255 - 255*(props.id)/(props.id*props.id)

    let rVal = 255*Math.random()
    let gVal = 255*Math.random()
    let bVal = 255*Math.random()

    let rgb = `rgb(${rVal}, ${gVal}, ${bVal})`

    return(
      <div>
          <Card style={{padding:20, width:300, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
              <Card.Body>
                  <div style={{display:'flex', justifyContent:'center'}}>
                      <p style={{color:'slate', fontSize:14, fontWeight:'bold',marginTop:-20}}>Tezos IOU Certificate {props.id}</p>
                  </div>
                  <div style={{display:'flex', justifyContent:'center'}}>
                      <div style={{borderRadius:'50%', height:50, width:50, backgroundColor:rgb }}></div>
                  </div>
                  <div>
                      <div style={{display:'flex', marginTop:20}}>
                          <p style={{color:'slate', fontSize:14, fontWeight:'bold',}}>Amount</p>
                          <p style={{color:'grey', fontSize:14, fontWeight:'bold',marginLeft:15}}>{props.amount} XTZ</p>
                      </div>
                      <div style={{display:'flex', }}>
                          <p style={{color:'slate', fontSize:14, fontWeight:'bold',}}>Unlocks</p>
                          <p style={{color:'grey', fontSize:14, fontWeight:'bold',marginLeft:15}}>{props.date}</p>
                      </div>
                  </div>
                  <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                      <div style={{display:'flex', justifyContent:'center'}}>
                          <Button onClick={() => props.showSend()} style={{width:150, backgroundColor:'lightblue', borderColor:'lightblue'}}>Send</Button>
                      </div>
                      <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
                          {
                              (props.unlocked)?
                                  <Button onClick={() => props.showUnlock()} style={{width:150}} >Unlock</Button>
                                  :
                                  <Button onClick={() => props.showUnlockEarly()} style={{width:150}} >Unlock Early</Button>

                          }
                      </div>
                  </div>

              </Card.Body>
          </Card>
      </div>
    );
}


class Certificates extends React.Component {
    constructor(props) {
        super(props)
        this.state = { account: '',
            sendModalShow: false,
            unlockModalShow:false,
            unlockEarlyModalShow:false,
            certsArray: [],
            index:0
        }
    }

    componentDidMount = async () => {
        try {
            //get certs
            const publicAddress = await magic.tezos.getAccount();


            let certsRef = db.collection("certificates");
            let query = certsRef.where("owner", "==", publicAddress ).where("redeemed", "==", false);

            let certificates = []
            await query.get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        certificates.push(doc.data());

                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

            console.log(certificates);
            this.setState({certsArray:certificates })

        } catch (error) {

            console.error(error);
        }
    }


    async hideModals(){
        this.setState({unlockEarlyModalShow:false, unlockModalShow: false,sendModalShow:false })

        const publicAddress = await magic.tezos.getAccount();

        let certsRef = db.collection("certificates");
        let query = certsRef.where("owner", "==", publicAddress ).where("redeemed", "==", false);

        let certificates = []
        await query.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    certificates.push(doc.data());

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        console.log(certificates);
        this.setState({certsArray:certificates,
            unlockEarlyModalShow:false,
            unlockModalShow: false,
            sendModalShow:false })

    }

    render() {
        return (
            <div>
                <Row>
                    <Col style={{ textAlign: 'center',}}>
                            <p style={{color:'slate', fontSize:16, fontWeight:'bold',marginTop:20,
                                textShadow: "2px 4px 3px rgba(0,0,0,0.3)"}}> My Certificates</p>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col style={{   display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    flexDirection:'column',
                                    marginTop:-15
                                    }}>
                        {
                            this.state.certsArray.map((row, key) =>
                                <div style={{marginTop:20}}>
                                    <Certificate amount={row.amount}
                                                 date={row.date}
                                                 id={row.id}
                                                 showSend={() => this.setState({sendModalShow:true, index:key})}
                                                 showUnlock={() => this.setState({unlockModalShow:true, index:key})}
                                                 showUnlockEarly={() => this.setState({unlockEarlyModalShow:true, index:key})}
                                                 unlocked={Date.now() > Date.parse(row.date) }
                                    />
                                </div>
                            )
                        }
                        { (this.state.certsArray.length === 0)?
                            <div style={{height:600}}></div>
                            :
                            <div>
                            </div>
                        }
                    </Col>
                    <Col></Col>
                </Row>
                { (this.state.certsArray.length === 0)?
                    <div></div>
                    :
                    <div>
                        <SendModal
                            show={this.state.sendModalShow}
                            onHide={() => this.hideModals()}
                            amount={this.state.certsArray[this.state.index].amount}
                            date={ moment(this.state.certsArray[this.state.index].date).calendar()}
                            tokenId={this.state.certsArray[this.state.index].id}
                        />
                        <UnlockEarlyModal
                            show={this.state.unlockEarlyModalShow}
                            certificate_id={this.state.certsArray[this.state.index].id}
                            onHide={() => this.hideModals()}
                            amount={this.state.certsArray[this.state.index].amount}
                            date={moment(this.state.certsArray[this.state.index].date).calendar()}
                            stake={this.state.certsArray[this.state.index].stakePaid}
                        />
                        <UnlockModal
                            show={this.state.unlockModalShow}
                            certificate_id={this.state.certsArray[this.state.index].id}
                            onHide={() => this.hideModals()}
                            amount={this.state.certsArray[this.state.index].amount}
                            date={moment(this.state.certsArray[this.state.index].date).calendar()}
                            stake={this.state.certsArray[this.state.index].stakePaid}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default Certificates