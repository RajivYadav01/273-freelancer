import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ShowProjects extends Component{
    constructor(){
        super();
        this.state = {
            projects : []
        }
    }    
    componentWillMount(){
        const id = this.props.id;
        axios.post('http://localhost:1500/myProjects/')
                .then((response) => {
                this.setState({
                    projects : this.state.projects.concat(response.data) 
                });
            });
    }

    render(){
        let projects = this.state.projects.map(project =>{
            return(
                    <tr>
                        <td>
                        <Link to="/ShowProject" 
                        onClick = {() => this.props.showProject(project)}>
                        {project.projectName}
                        </Link>
                        </td>
                        <td>{project.bids}</td>
                        <td>{project.myBid}</td> 
                        <td>{project.avgBid}</td> 
                        <td>{project.bidEndDate}</td> 
                        <td>
                            <select>
                                <option>Select</option>
                                <option>Retract Bid</option>
                                <option>Edit Bid</option>
                                <option>Send Message</option>
                                <option>Clarify</option>
                            </select>
                        </td>  
                    </tr>
             );   
        });
        return(
            <table className="table">
                <thead className="thead-inverse">
                    <tr>
                        <th>PROJECT NAME</th>
                        <th>BIDS</th>
                        <th>MY BID</th>
                        <th>AVG BID</th>
                        <th>BID END DATE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {projects}
                </tbody>
            </table>
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

export default connect(null,mapDispatchToProps)(ShowProjects);