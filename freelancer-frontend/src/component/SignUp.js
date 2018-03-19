import React,{Component} from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import './SignUp.css';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router';
import { signupAction } from '../actions/index';
import Logo from '../assets/images/freelancer-logo.png';


class SignUp extends Component{
    state = {
        tempUname : '',
        tempPass : '',
        email : '',
        userType : null,
    }


    handleChange = (events) => {
        if(events.target.name === "username"){
            this.setState({
                tempUname : events.target.value
            });
           
        }
        
        if(events.target.name === "password"){
            this.setState({
                tempPass : events.target.value
            });
        }

        if(events.target.name === 'email'){
            this.setState({
                email: events.target.value
            });
        }
        console.log("Temp data : " + events.target.value);
    }

    handleSubmit = (events) =>{
        events.preventDefault();
        const newData = {
            username : this.state.tempUname,
            password : this.state.tempPass,
            email : this.state.email,
            userType : this.state.userType
        }
        this.props.signupAction(newData);
        if(this.state.id !== null){
            <Redirect to="/user"/>
        }
    }

    handleUserType = (events) => {
        if(events.target.name === 'Employer'){
            this.setState({
                userType : 1
            });
        }
        if(events.target.name === 'Worker'){
            this.setState({
                userType : 0
            });
        }
        console.log("User Type Value : " + this.state.userType);
    }
    render(){
        let authRedirect = null;
        if (this.props.id !== null) {
            authRedirect = <Redirect to='/user'/>
        }
        return(
            
            <div>
                {authRedirect}
                <div className = "mainCenter">
                    <div>
                        <img src = {Logo} className="img-rounded imageStyle" alt="Logo"></img>
                        <h4 className = "h4Label">Sign Up for free today!</h4>
                        <br/>
                        <form onSubmit = {this.handleSubmit.bind(this)}>
			    			<div className="form-group">
			    				<input onChange = {this.handleChange} className=" inputField form-control" type="email" name="email" id="email" required="required" placeholder="Email Address"/>
			    			</div>

                            <div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="text" name="username" id="username" required="required" placeholder="Username"/>
			    			</div>

                            <div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="password" name="password" id="password" required="required" placeholder="Password"/>
			    			</div>

                            <div className="signup-objective button-group">
                                <label className=" userTypeDiv btn signup-objective-label">
                                    <input onChange={this.handleUserType} name="looking_for" id="looking_to_hire" value="Employer" type="radio"/>Hire
                                </label>
	                            <label className="userTypeDiv btn signup-objective-label">
                                    <input onChange={this.handleUserType} name="looking_for" id="looking_for_work" value="Worker" type="radio"/>Work
                                </label>
                            </div>
                            <br/>
			    			<input type="submit" value="Create Account" className=" signUpBtn btn btn-primary form-control"/>
			    		</form>
                            <br/>
                            <h5>
                                By registering you confirm that you accept <a>Terms and Conditions</a>and<a>Privacy Policy</a>
                            </h5>

                            <br/><br/>
                            <h5>Already a Freelancer.com member?<a>Log In</a></h5>
                        </div>
                    </div>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        uname : state.tempUname,
        pass : state.tempPass,
        id : state.id
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signupAction }, dispatch);
    // return {
    //     submitForm: (newData) => {
    //         // axios.post('http://localhost:8900/signUp/', JSON.stringify(newData))
    //         //     .then((response) => {
    //         //     dispatch({type: 'SUCCESS',payload : response})
    //         // });
    //         var headers = new Headers();
    //         headers.append('Content-Type', 'application/json');
    //         headers.append('Accept', 'application/json');
    //         console.log("Data sent : ",newData);
    //         axios('http://localhost:8900/signUp/', {
    //             method: 'post',
    //             mode: 'no-cors',
    //             redirect: 'follow',
    //             withCredentials: true,
    //             headers: headers,
    //             data: JSON.stringify(newData)
    //         })
    //         .then((response) => {
    //              dispatch({type: 'SUCCESS',payload : response})
    //              console.log(response);
    //         })
    //     }
    // }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);