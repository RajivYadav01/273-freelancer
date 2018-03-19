import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

class ShowProjects extends Component{
    constructor(){
        super();
        this.state = {
            projects : []
        }
    }    
    componentWillMount(){
        axios.post('http://localhost:8900/projectsBid/',{'userID':cookie.load('cookie')})
                .then((response) => {

                console.log("Bid Dta : ",response.data);
                this.setState({
                    projects : this.state.projects.concat(response.data) 
                });
            });
    }

    render(){
        //let filteredProjects=this.state.projects.filter(project => project.userID != cookie.load('cookie'));
        //console.log("filter=>>",filteredProjects);
        let projects = this.state.projects.map(projects =>{
            return(
                    <tr>
                        <td>
                        <Link to="/ShowProject" 
                        onClick = {() => this.props.showProject(projects)}>
                        {projects.pName}
                        </Link>
                        </td>
                        <td>{projects.bids}</td>
                        <td>{projects.bidAmt}</td> 
                        <td>$ {parseInt(projects.totalBid, 10)/parseInt(projects.bids,10)}</td> 
                        <td>{projects.bidEndDate}</td> 
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
            <div>
            <div>
                <h1 className = "myProjects">Projects Bid</h1>
            </div>
            <div className = "divDashboardProjectTable">
            
            <table className="table table-hover">
                <thead className = "thread-inverse">
                    <tr className='table-secondary'>
                        <th className = "numberOfBidsColomn">PROJECT NAME</th>
                        <th className = "numberOfBidsColomn" >BIDS</th>
                        <th className = "numberOfBidsColomn">MY BID</th>
                        <th className = "numberOfBidsColomn" >AVG BID</th>
                        <th className = "numberOfBidsColomn" >BID END DATE</th>
                        <th className = "numberOfBidsColomn">ACTION</th>
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

export default connect(null,mapDispatchToProps)(ShowProjects);