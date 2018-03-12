import React,{Component} from 'react';
import Navigation from './Navigation';
import Navigation2 from './Navigation2';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

class UserDash extends Component{


    render(){
        console.log("Cookie Value : ", cookie.load('myCookie'));
        let redirect = null;
        if(cookie.load('myCookie') == null){
            redirect = <Redirect to ="/signin"/>
        }
        return(
            <div>
            {redirect}
            <Navigation/>
            {cookie.load('myCookie') ? (<Navigation2/>) : (null)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectName : state.projectName,
        id : state.id
    };
};

export default connect(mapStateToProps)(UserDash);
