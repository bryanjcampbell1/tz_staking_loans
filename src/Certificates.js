import React, { Component } from 'react'
import { Button, Row, Col, InputGroup, Modal, Card } from 'react-bootstrap';

let c1 = {
    id: 320,
    amount: 100,
    date: "8/3/22"
}

let c2 = {
    id: 13,
    amount: 80,
    date: "9/3/22"
}
let c3 = {
    id: 1007,
    amount: 100,
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
                          <Button style={{width:150, backgroundColor:'lightblue', borderColor:'lightblue'}}>Send</Button>
                      </div>
                      <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
                          <Button style={{width:150}}>Unlock Early</Button>
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
            buyModalShow: false,
            betModalShow:false,
            web3:null,
            accounts: null,
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

    hideModals(){
        //this.setState({buyModalShow: false,betModalShow:false })
        //this.forceUpdate();
    }


    render() {
        return (
            <div>
                <Row>
                    <Col style={{ background: 'whitesmoke',textAlign: 'center'}}>
                            Certificates
                    </Col>

                </Row>
                <Row>
                    <Col></Col>
                    <Col style={{   display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    flexDirection:'column',
                                    }}>
                        {
                            mock_data.map((row) =>
                                <div style={{marginTop:20}}>
                                    <Certificate amount={row.amount} date={row.date} id={row.id} />
                                </div>
                            )
                        }
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}

export default Certificates