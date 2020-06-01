import React, { Component } from 'react'
import { Button, Row, Col, Card } from 'react-bootstrap';
import SendModal from "./SendModal";
import UnlockEarlyModal from "./UnlockEarlyModal";
import UnlockModal from "./UnlockModal";

let c1 = {
    id: 320,
    amount: 100,
    stakePaid:12,
    date: "8/3/22"
}

let c2 = {
    id: 13,
    amount: 80,
    stakePaid:8,
    date: "9/3/22"
}
let c3 = {
    id: 1007,
    amount: 1000,
    stakePaid:26,
    date: "10/13/22"
}

let mock_data = [c1,c2,c3];



const Certificate = (props) =>{

    let rVal = 255*(props.id)/(props.id +255)
    let gVal = 255*(props.id)/(props.id*props.id)
    let bVal = 255 - 255*(props.id)/(props.id*props.id)

    let rgb = `rgb(${rVal}, ${gVal}, ${bVal})`

    return(
      <div>
          <Card style={{padding:20, width:300}}>
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


class Certificates extends Component {
    constructor(props) {
        super(props)
        this.state = { account: '',
            sendModalShow: false,
            unlockModalShow:false,
            unlockEarlyModalShow:false,
            web3:null,
            accounts: null,
            certsArray: mock_data,
            index:0
        }
    }

    componentDidMount = async () => {
        try {

            //const web3 = await getWeb3();
            //const accounts = await web3.eth.getAccounts();

            //await this.setState({ web3, accounts, } );
            //this.getData();

        } catch (error) {

            console.error(error);
        }
    }

    clicked(e){
        console.log("yo", e);
    }
    hideModals(){
        this.setState({unlockEarlyModalShow:false, unlockModalShow: false,sendModalShow:false })
        this.forceUpdate();
    }


    render() {
        return (
            <div>
                <Row>
                    <Col style={{ textAlign: 'center',}}>
                            <p style={{color:'slate', fontSize:16, fontWeight:'bold',marginTop:20}}> My Certificates</p>
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
                                                 unlocked={true}
                                    />
                                </div>
                            )
                        }
                    </Col>
                    <Col></Col>
                </Row>
                <SendModal
                    show={this.state.sendModalShow}
                    onHide={() => this.hideModals()}
                    amount={this.state.certsArray[this.state.index].amount}
                    date={this.state.certsArray[this.state.index].date}
                />
                <UnlockEarlyModal
                    show={this.state.unlockEarlyModalShow}
                    onHide={() => this.hideModals()}
                    amount={this.state.certsArray[this.state.index].amount}
                    date={this.state.certsArray[this.state.index].date}
                    stake={this.state.certsArray[this.state.index].stakePaid}
                />
                <UnlockModal
                    show={this.state.unlockModalShow}
                    onHide={() => this.hideModals()}
                    amount={this.state.certsArray[this.state.index].amount}
                    date={this.state.certsArray[this.state.index].date}
                    stake={this.state.certsArray[this.state.index].stakePaid}
                />
            </div>
        )
    }
}

export default Certificates