import React, { Component } from 'react'
import { Button, Row, Col, InputGroup, Modal, Card } from 'react-bootstrap';



class Home extends Component {
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

                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home