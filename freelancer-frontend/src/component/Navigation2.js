import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

class Navigation2 extends Component{
    
    render(){
        const styleButton = {
            float: 'right'
        }
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className=" nav navbar-nav">
                        <li className="active"><a href="/user">Home</a></li>
                        <li><a href="/myProjects">Freelancer</a></li>
                        <li><a href="/showProjectsPosted">Employer</a></li>
                    </ul>
                    <ul style = {styleButton}>
                        <li>
                            <div className="text-xs-right warnBtn">
                                <Link className="btn btn-warning" to="/addProject" >Post a Project</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation2;