import React, { Component } from 'react';

import {
    Alert,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink} from 'reactstrap';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import { connect } from 'react-redux';

class RegisterModal extends Component {
  state = {
      modal: false,
      name: '',
      email: '',
      password: '',
      msg: null,
    }  
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error != prevProps.error){
            // Check for a register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({
                    msg: error.msg.msg
                });
            }
            else{
                this.setState({msg: null});
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

  toggle = () => {
      this.props.clearErrors();
      this.setState({modal: !this.state.modal});
  }

  onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  }

  onSubmit = (e)=>{
      e.preventDefault();
      const { name, email, password } = this.state;

      // Create a user object
      const newUser = {
          name,
          email,
          password,
      };

      this.props.register(newUser);
  }

  render() {
    return (
      <div>


        <NavLink onClick={this.toggle} href="#">Register</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
        <ModalBody>
            {this.state.msg ? (<Alert color='danger'>{this.state.msg}</Alert>): null}
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" 
                        className='mb-3'
                        name="name"
                        id="name"
                        onChange={this.onChange}
                        placeholder="Name"></Input>
                            
                    <Label for="email">E-Mail</Label>
                    <Input type="text" 
                        className='mb-3'
                        name="email"
                        id="email"
                        onChange={this.onChange}
                        placeholder="E-Mail"></Input>

                    <Label for="password">Password</Label>
                    <Input type="password" 
                       className='mb-3'
                        name="password"
                        id="password"
                        onChange={this.onChange}
                        placeholder="Password"></Input>
                    <Button color="dark" style={{marginTop:'2rem'}} block> Register</Button>    
                </FormGroup>
            </Form>
        </ModalBody>
        </Modal>
      </div>
    )
  }
} 


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});
export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
