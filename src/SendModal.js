import React, { Component } from 'react'
import {Button, Modal, Card, Row, Form, InputGroup, FormControl,} from 'react-bootstrap';

import {X} from 'react-bootstrap-icons';

class SendModal extends Component {
    constructor(props) {
        super(props)
        this.state = {screen: 1,

        }
    }

    send(){
        console.log('here');
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





