import React,{Component} from 'react';
import { connect } from 'react-redux';
import './Navigation.css';
import Logo from '../assets/images/freelancer-logo.png';
import item1 from '../assets/images/item1.png';
import item2 from '../assets/images/item2.png';
import item3 from '../assets/images/item3.png';
import item4 from '../assets/images/item4.png';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

class Navigation extends Component{
    state = {
        isLoggedIn : false,
        showError : false
    }
    logoutHandler(){
        cookie.remove('cookie');
    }
    render(){
        let navChanges = null;

        if(cookie.load('cookie')){
            navChanges = (
                <ul className="styleUl nav navbar-nav">
                    <li className="active"><a onClick = {this.logoutHandler} href = "/">Logout</a></li>
                    <li ><Link to ="/profile">Profile</Link></li>
                </ul>
            );
        }
        else{
            navChanges = (
                <ul className="styleUl nav navbar-nav">
                    <li><a href="/signin">Login</a></li>
                    <li><a href="/signUp">Signup</a></li>
                    <li><div className="text-xs-right warnBtn">
                        <Link className="btn btn-warning" to="/post" >Post a Project</Link>
                    </div></li>
                </ul>
            );
        }
        let carousel = null;
        if(cookie.load('cookie') == null){
            carousel = (
                <div id="myCarousel" className=" carouselDiv carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                        <li data-target="#myCarousel" data-slide-to="3"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src={item1} alt="item1" />
                        </div>
    
                        <div className="item">
                            <img src={item2} alt="item2"/>
                        </div>
        
                        <div className="item">
                            <img src={item3} alt="item3"/>
                        </div>
    
                        <div className="item">
                            <img src={item4} alt="item4"/>
                        </div>
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            );
        }
        return(
                <nav className = " styleNav navbar navbar-default">
                    <div className=" firstDiv container-fluid">
                        <div className="navbar-header">
                            <img src = {Logo} className="img-rounded imageStyle" alt="Logo"></img>
                        </div>
                        {navChanges}
                    </div>
                   {carousel}
                </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.id
    };
};



export default connect(mapStateToProps)(Navigation);