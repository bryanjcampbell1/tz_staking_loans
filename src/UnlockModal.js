import React, { Component } from 'react'
import {Button, Modal, Card,} from 'react-bootstrap';

import {X} from 'react-bootstrap-icons';

class UnlockModal extends Component {
    constructor(props) {
        super(props)
        this.state = {screen: 1,

        }
    }

    unlock(){
        console.log('here');
        this.setState({screen: 2});
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
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:5}}>Unlock Certificate</p>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>
                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>
                                                    Unlocking will free the XTZ in the certificate and transfer the funds to your account
                                                </p>
                                                <hr/>
                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate',}}>
                                                    Returning Funds
                                                </p>
                                                <div style={{display:'flex', justifyContent:'center'}}>
                                                    <p style={{color:'slate', fontSize:22, fontWeight:'bold', }}>100 XTZ</p>
                                                </div>

                                            </Card.Body>
                                        </Card>

                                        <div style={{display:'flex', justifyContent:'center', marginTop:20, marginBottom:0 }}>
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
                                                    <p style={{fontWeight:'bold', fontSize:14, color:'slate',marginTop:10}}>100 XTZ has been returned to your account</p>
                                                    <div style={{display:'flex'}}>
                                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Transaction Hash</p>
                                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                        <p style={{fontSize:14, color:'slate'}}> ooasdaradreraravafvafvafdfv</p>
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

export default UnlockModal;





