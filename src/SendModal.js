import React, { Component } from 'react'
import {Button, Modal, Card,} from 'react-bootstrap';

import {X} from 'react-bootstrap-icons';

class SendModal extends Component {
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
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Review Buy</p>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>
                                                <div style={{display:'flex'}}><p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p><p style={{fontSize:14, color:'slate'}}>Travis Scott</p></div>

                                                <div style={{display:'flex'}}>
                                                    <p style={{color:'seagreen', fontSize:14}}> Available Shares </p>
                                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                    <p style={{fontSize:14, color:'slate'}}> DAI per Share</p>
                                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                    <p style={{fontSize:14, color:'slate'}}>Settled on advar</p>
                                                </div>

                                                <hr/>
                                                <div style={{display:'flex'}}>
                                                    <div>
                                                        <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>Quantity:&nbsp;</p>
                                                    </div>
                                                    <div>
                                                        <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>ss</p>
                                                    </div>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Price:&nbsp;</p>
                                                    <p style={{fontSize:14, color:'slate', }}>sss  DAI</p>
                                                    <p style={{fontSize:12, color:'grey', fontStyle:'italic', marginLeft:4 , marginTop:2}}>+2.99 DAI (fee) </p>
                                                </div>
                                                <hr/>
                                                <div style={{display:'flex'}}>
                                                    <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Total:&nbsp;</p>
                                                    <p style={{fontSize:14, color:'slate', }}>{300 + 2.99}  DAI</p>
                                                </div>

                                            </Card.Body>
                                        </Card>

                                        <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                            <Button size="lg" onClick={() => this.createCertificate()  } style={{color:'white', backgroundColor:'seagreen'}}>Preview Buy</Button>
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
                                                marginTop:20}}>Congratulations, you successfully bought shares!</p>

                                            <Card style={{backgroundColor:''}}>
                                                <Card.Body>
                                                    <div style={{display:'flex'}}>
                                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>hljljvlvlvlhvhj</p>
                                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                        <p style={{fontSize:14, color:'slate'}}>kh;khkh Shares for k[ppp DAI</p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <div style={{display:'flex'}}>
                                                <p style={{fontSize:14, color:'grey', marginTop:30}}>You may now check your portfolio for updates</p>
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

export default SendModal;





