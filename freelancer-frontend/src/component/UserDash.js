import React,{Component} from 'react';
import Navigation from './Navigation';
import Navigation2 from './Navigation2';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import './ShowProject.css';
import axios from 'axios';


class UserDash extends Component{
    constructor(){
        super();
        this.state = {  
            projects : []
        }
    }    

    componentWillMount(){
        //const id = this.props.id;
        axios.post('http://localhost:8900/user/', {'userID' : cookie.load('cookie')})
                .then((response) => {
                this.setState({
                    projects : this.state.projects.concat(response.data.projects) 
                });
            });
    }

    render(){
        //console.log(projects);
        let filteredProjects=this.state.projects.filter(project => project.eid !=cookie.load('cookie') && project.userID != cookie.load('cookie'));
        console.log("filter=>>",filteredProjects);
        let projects = filteredProjects.map(project =>{
            let numBids = 0;
            if(project.bids){
                numBids = project.bids;
            }
            let avgBid = 0;
            if(project.bids){
                avgBid = parseInt(project.totalBid, 10)/parseInt(project.bids,10);
            }
            return(
                    <tr>
                        <td className = "projectTitle">
                        <Link to="/ShowProject" 
                        onClick = {() => this.props.showProject(project)}>
                        {project.pName}
                        </Link>
                        </td>
                        <td>{project.Description}</td>
                        <td>{project.userName}</td>
                        <td>{project.budgetRange}</td>
                        <td>{numBids}</td>
                        <td>$ {avgBid}</td> 
                        {/*<td>{project.bidEndDate}</td>*/} 
                        <td>
                        <Link className="btn btn-warning" to={"/bid/"+project.pID} >Bid Now</Link>
                        </td>  
                    </tr>
             );   
        });

        const styleColumn = {
            width: '14%',
            backgroundColor: '#1a1a1a',
            color: 'white'
        }
        let redirect = null;
        if(!cookie.load('cookie')){
            redirect = <Redirect to ="/signin"/>
        }
        return(
            <div>
            {redirect}
            <Navigation/>
            <Navigation2/>
            <div>
            <div>
                <h1 className = "myProjects">All Open Projects</h1>
            </div>
            <div className = "divDashboardProjectTable">
            
            <table className="table table-hover">
                <thead className = "thread-inverse">
                    <tr className='table-secondary'>
                        <th style = {styleColumn}>PROJECT NAME</th>
                        <th style = {styleColumn} >DESCRIPTION</th>
                        <th style = {styleColumn}>EMPLOYER</th>
                        <th style = {styleColumn} >BUDGET RANGE</th>
                        <th style = {styleColumn} >NUMBER OF BIDS</th>
                        <th style = {styleColumn}> AVERAGE BID</th>
                        <th style = {styleColumn}>BID NOW</th>
                    </tr>
                </thead>
                <tbody>
                    {projects}
                </tbody>
            </table>
            </div>
            </div>

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

function mapDispatchToProps(dispatch) {
    return {
        showProject: (project) => {
            console.log("Selected Project : ",project);
            dispatch({type: 'SHOW_PROJ',payload : project})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDash);