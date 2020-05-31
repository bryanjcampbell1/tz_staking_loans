import React, { Component } from 'react'
import {Button,
        Row,
        Col,
        InputGroup,
        Modal,
        Card,
        FormControl,
        Form,
        Dropdown,
        DropdownButton } from 'react-bootstrap';



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

    updateQuantity(e){
        this.setState({quantity:e})
    }


    render() {
        return (
            <div>
                {/*
                <Row>
                    <Col style={{ background: 'whitesmoke',textAlign: 'center', height:180}}>

                    </Col>
                </Row>
                */}
                <Row style={{marginTop:50}}>
                    <Col></Col>

                    <Col xs={6} >
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="3">
                                            Deposit Amount
                                        </Form.Label>
                                        <Col sm="9" >
                                            <InputGroup className="mb-3" style={{width:300}}>
                                                <FormControl
                                                    placeholder="0"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text id="basic-addon2">XTZ</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="3">
                                            Lockup Period
                                        </Form.Label>
                                        <Col sm="9">
                                            <DropdownButton id="dropdown-basic-button" title="Duration" style={{width:300}}>
                                                <Dropdown.Item href="#/action-1">3 Months</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">6 Months</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">9 Months</Dropdown.Item>
                                                <Dropdown.Item href="#/action-4">1 Year</Dropdown.Item>
                                                <Dropdown.Item href="#/action-5">15 Months</Dropdown.Item>
                                                <Dropdown.Item href="#/action-6">18 Months</Dropdown.Item>
                                                <Dropdown.Item href="#/action-7">21 Months</Dropdown.Item>
                                                <Dropdown.Item href="#/action-8">2 Years</Dropdown.Item>
                                            </DropdownButton>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="3">
                                            Return Type
                                        </Form.Label>
                                        <Col sm="9">
                                            <DropdownButton id="dropdown-basic-button" title="Currency" style={{width:300}}>
                                                <Dropdown.Item href="#/action-1">XTZ</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">USDtz</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">tzBTC</Dropdown.Item>
                                            </DropdownButton>
                                        </Col>
                                    </Form.Group>


                                </Form>



                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Card style={{backgroundColor:'lightblue', width:300, height:100}}>
                                <p>Return</p>
                                <div><p style={{display:'flex', justifyContent:'center'}}>24 USDtz</p></div>

                            </Card>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', marginTop:40}}>
                            <Button size="lg"> Get Stake Now </Button>
                        </div>
                    </Col>

                    <Col ></Col>
                </Row>
            </div>
        )
    }
}

export default Home