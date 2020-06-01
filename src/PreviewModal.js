import React, { Component } from 'react'
import {Button, Modal, Card,} from 'react-bootstrap';

import {X} from 'react-bootstrap-icons';

class PreviewModal extends Component {
    constructor(props) {
        super(props)
        this.state = {screen: 1,

        }
    }

    createCertificate(){
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
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Review Transaction</p>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>
                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Deposit</p>
                                                <ul>
                                                    <li> <p style={{fontSize:14, color:'slate'}}> 100 XTX</p> </li>
                                                </ul>
                                                <hr/>
                                                <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Return</p>
                                                <ul>
                                                    <li> <p style={{fontSize:14, color:'slate'}}> 23 XTX Stake</p> </li>
                                                    <li> <p style={{fontSize:14, color:'slate'}}> Certificate redeemable for 100 XTX on the date 9/11/22</p> </li>
                                                </ul>
                                               <hr/>
                                                <div style={{display:'flex'}}>
                                                    <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Price:&nbsp;</p>
                                                    <p style={{fontSize:14, color:'slate', }}>100 XTZ</p>
                                                    <p style={{fontSize:12, color:'grey', fontStyle:'italic', marginLeft:4 , marginTop:2}}> +1.00 XTZ (fee) </p>
                                                </div>
                                                <hr/>
                                                <div style={{display:'flex'}}>
                                                    <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Total:&nbsp;</p>
                                                    <p style={{fontSize:14, color:'slate', }}>{100 + 1.00}  XTZ</p>
                                                </div>

                                            </Card.Body>
                                        </Card>

                                        <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
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
                                                marginTop:20}}>Congratulations, you successfully got your stake!</p>

                                            <Card style={{backgroundColor:''}}>
                                                <Card.Body>
                                                    <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Recieved</p>
                                                    <ul>
                                                        <li> <p style={{fontSize:14, color:'slate'}}> 23 XTX Stake</p> </li>
                                                        <li> <p style={{fontSize:14, color:'slate'}}> Certificate redeemable for 100 XTX on the date 9/11/22</p> </li>
                                                    </ul>
                                                </Card.Body>
                                            </Card>
                                            <div style={{display:'flex'}}>
                                                <p style={{fontSize:14, color:'grey', marginTop:30}}>You may now check your Certificates page for updates</p>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'center', marginTop:30 }}>
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


