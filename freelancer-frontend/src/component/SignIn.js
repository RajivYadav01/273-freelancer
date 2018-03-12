import React,{Component} from 'react';
import Navigation from './Navigation';
import axios from 'axios';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './SignIn.css';
import Logo from '../assets/images/freelancer-logo.png';
import cookie from 'react-cookies';


class SignIn extends Component{
    state = {
        email : null,
        password : null
    }
    handleChange = (events) =>{
        if(events.target.name === 'email'){
            this.setState({
                email : events.target.value
            });
        }
        if(events.target.name === 'password'){
            this.setState({
                password : events.target.value
            });
        }
    }
    handleSubmit = (events) =>{
        events.preventDefault();
        const newData = {
            email : this.state.email,
            password : this.state.password
        }  
        this.props.submitForm(newData);
    }
    render(){
        let authRedirect = null;
        let errorMsg = null;
        console.log("ID SET : "+this.props.id);
        /*if (this.props.id !== null) {
            authRedirect = <Redirect to='/user'/>
        }*/
        if(cookie.load('myCookie')){
            authRedirect = <Redirect to= '/user'/>
        }
        if(this.props.error){
            console.log("Error Msg Value : "+this.props.error);
            errorMsg = (
                <div className="myErrorMsg">
                    Invalid Username/Password
                </div>
            );
        }
        return(
            <div className = "mainCenter">
                {authRedirect}
                <div>
                    <div>
                    <img src = {Logo} className="img-rounded imageStyle" alt="Logo"></img>
                        <br/><br/>
                        {errorMsg}
                        <br/>
                        
                        <form onSubmit = {this.handleSubmit.bind(this)}>
			    			<div className="form-item">
			    				<input className=" inputField form-control" onChange = {this.handleChange} type="email" name="email" id="email" placeholder="Email or Username"/>
			    			</div>

                            <br/>
                            <div className="form-item">
			    				<input className=" inputField form-control" onChange = {this.handleChange}  type="password" name="password" id="password" placeholder="Password"/>
			    			</div>

                            <br/>
			    			<input type="submit" value="Log In" className=" signInBtn btn btn-primary form-control"/>
			    		</form>
                        <br/><br/>
                        <div>
                            <input className = "labelLeft" type="checkbox" id="remember" name="remember" value="Remember me"/>
                            <label className="labelRem" for="remember">Remember Me</label>

                            <label  className = "labelRight" for="remember"><a className = "anc">Forget Password?</a></label>
                        </div>
                        <br/><br/>
                        <div>
                            <h5 className = "labelRem">Don't have an account?<a className = "anc">Sign Up</a></h5>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.id,
        error : state.error
    };
};

function mapDispatchToProps(dispatch) {
    return {
        submitForm: (newData) => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            console.log("Data sent  :" ,newData);
            /*console.log("Data sent : ",newData);
            axios.post('http://localhost:1500/signin/', JSON.stringify(newData))
                .then((response) => {
                dispatch({type: 'LOGIN_SUCCESS',payload : response})
            });*/

            axios('http://localhost:1500/signin/', {
                method: 'post',
                mode: 'no-cors',
                redirect: 'follow',
                //credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
                withCredentials: true,
                data: JSON.stringify(newData)
            }).then((response) => {
                dispatch({type: 'LOGIN_SUCCESS',payload : response})
            });
            //console.log("Cookie Value : ",cookies.load('myCookie'));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);