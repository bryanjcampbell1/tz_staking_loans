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

import PreviewModal from "./PreviewModal";



class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { account: '',
            previewModalShow: false,
            web3:null,
            accounts: null,
            deposit:0,
            duration:0,
            currency:'XTZ',
            returnRate: 0

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
        this.setState({previewModalShow: false, })
        this.forceUpdate();
    }

    updateForm(a,b){
        console.log(a);
        console.log(b);

        this.setState({[`${a}`]:b})
    }

    setReturnRate(e){
        if(e==='3 Months'){
            this.setState({returnRate: 0.01})
        }
        else if(e==='6 Months'){
            this.setState({returnRate: 0.021})
        }
        else if(e==='9 Months'){
            this.setState({returnRate: 0.033})
        }
        else if(e==='1 Year'){
            this.setState({returnRate: 0.0406})
        }
        else if(e==='15 Months'){
            this.setState({returnRate: 0.0510})
        }
        else if(e==='18 Months'){
            this.setState({returnRate: 0.0615})
        }
        else if(e==='21 Months'){
            this.setState({returnRate: 0.0721})
        }
        else{
            this.setState({returnRate: 0.0829})
        }

    }


    render() {
        return (
            <div>
                <Row style={{marginTop:50}}>
                    <Col></Col>

                    <Col xs={6} >

                        <Card>
                            <Card.Body style={{padding:50}}>
                        <Form>
                            <Form.Group as={Row} controlId="deposit">
                                <Form.Label>Deposit Amount</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="0"
                                        aria-label="Deposit"
                                        aria-describedby="basic-addon1"
                                        onChange={(e)=> this.updateForm(e.target.id, e.target.value)}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2">XTZ</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Row} controlId="duration" style={{marginTop:-20}}>
                                <Form.Label>Lockup Period</Form.Label>
                                <Form.Control as="select"
                                              onChange={(e)=> this.setReturnRate(e.target.value)}>
                                    <option>3 Months</option>
                                    <option>6 Months</option>
                                    <option>9 Months</option>
                                    <option>1 Year</option>
                                    <option>15 Months</option>
                                    <option>18 Months</option>
                                    <option>21 Months</option>
                                    <option>2 Years</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Row} controlId="currency" style={{marginTop:10}}>
                                <Form.Label>Return Currency</Form.Label>
                                <Form.Control as="select"
                                              onChange={(e)=> this.updateForm(e.target.id, e.target.value)}>
                                    <option>XTZ</option>
                                    <option>USDtz</option>
                                    <option>tzBTC</option>
                                </Form.Control>
                            </Form.Group>

                        </Form>
                        <div style={{display:'flex', justifyContent:'center', marginTop:35}}>
                            <Card style={{backgroundColor:'lightblue', width:'70%', height:100}}>
                                <p>Return</p>
                                <div><p style={{display:'flex', justifyContent:'center'}}>{this.state.deposit*this.state.returnRate} {this.state.currency}</p></div>
                            </Card>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', marginTop:35}}>
                            <Button size="lg" onClick={() => this.setState({previewModalShow: true}) }> Get Stake Now </Button>
                        </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col ></Col>
                </Row>

                <PreviewModal
                    show={this.state.previewModalShow}
                    onHide={() => this.hideModals()}
                />
            </div>
        )
    }
}

export default Home