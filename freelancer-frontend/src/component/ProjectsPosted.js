import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import Navigation2 from './Navigation2';
import cookie from 'react-cookies';

class ProjectsPosted extends Component{
    constructor(){
        super();
        this.state = {  
            projects : []
        }
    }    
    componentWillMount(){
        const id = this.props.id;
        axios.post('http://localhost:8900/myProjects/',{ userID: cookie.load('cookie')})
                .then((response) => {
                    console.log("Show ProjectsResult : ",response.data);
                this.setState({
                    projects : this.state.projects.concat(response.data) 
                });
            });
    }

    render(){
        let projects = this.state.projects.map(project =>{
            var eDate = new Date(project.bidEndDate);
            var tDate = new Date();
            var days = eDate.getDate() - tDate.getDate();
            var bidsValue = 0;
            if(project.bids){
                bidsValue = project.bids;
            }
            var avgBidValue = 0;
            if(project.bids){
                avgBidValue = parseInt(project.totalBid, 10)/parseInt(project.bids,10);
            }
            return(
                    <tr>
                        <td className = "projectTitle">
                        <Link to="/ShowProject" 
                        onClick = {() => this.props.showProject(project)}>
                        {project.pName}
                        </Link>
                        </td>
                        <td>{bidsValue}</td> 
                        <td>${avgBidValue}</td> 
                        <td>{days}</td> 
                        <td>
                            <select>
                                <option>Select</option>
                                <option>Delete</option>
                                <option>Upgrade</option>
                                <option>Award</option>
                                <option>Extend</option>
                                <option>Edit</option>
                                <option>Close</option>
                            </select>
                        </td>  
                    </tr>
             );   
        });
        const mainDiv1 = {
            background: 'white',
            marginTop: '3%',
            marginLeft: '2%',
            marginBottom: '20%',
            width: '1300px',
            height: 'auto'
        }

        const tableColomn = {
            width: '20%',
            backgroundColor: '#1a1a1a',
            color: 'white'
        }
        return(
            <div>
                <Navigation/>
                <Navigation2/>
            <div>
                <h1 className = "myProjects">Projects Posted</h1>
            </div>
            <div style = {mainDiv1}>
            
            <table className="table table-hover">
                <thead className = "thread-inverse">
                    <tr className='table-secondary'>
                        <th style = {tableColomn}>PROJECT NAME</th>
                        <th style = {tableColomn}>BIDS</th>
                        <th style = {tableColomn}>AVG BID</th>
                        <th style = {tableColomn}>BID END DATE</th>
                        <th style = {tableColomn}>ACTION</th>  
                    </tr>
                </thead>
                <tbody>
                    {projects}
                </tbody>
            </table>
            </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        showProject: (project) => {
            console.log("Selected Project : ",project);
            dispatch({type: 'SHOW_PROJ',payload : project})
        }
    }
}

export default connect(null,mapDispatchToProps)(ProjectsPosted);