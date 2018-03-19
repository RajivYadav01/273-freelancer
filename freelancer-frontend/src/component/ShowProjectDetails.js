import React,{Component} from 'react';
import axios, { post } from 'axios';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import FileDownload  from 'react-file-download';
import Bidlist from './BidList';

import './ShowProjectDetails.css';

class ShowProjectDetails extends Component {
    constructor(){
        super();
        this.state = {  
            bidLists : []
        }
    }    
    componentWillMount(){
        const projectID = this.props.project.pID;
        console.log("pid----" + projectID);
        axios.post('http://localhost:8900/ShowProject/',{'pid': projectID})
                .then((response) => {
                    console.log("Response Recieved for project : ",response.data);
                this.setState({
                   /*bids:response.data.projects[0].bids,
                   totalBid:response.data.projects[0].totalBid,
                   range:response.data.projects[0].budgetRange,
                   projDesc : response.data.projects[0].projDesc,
                   skills : response.data.projects[0].skills*/
                   //bidList : response.data
                   bidLists : this.state.bidLists.concat(response.data.bids)
                });
            });
    }

    downloadProject = (projectID) =>{
        axios.post('http://localhost:8900/downloads/',{'pid': projectID, 'url':this.props.project.fileUplURL})
            .then((response) => {
                console.log("response-----", response);
                //window.location.href = response.data;
                FileDownload(response.data, this.props.project.fileUplURL);
            });
    }

    render(){
        console.log("Inside Show Proj Details : ", this.props);
        let fileComp = null;
        if(this.props.project.fileUplURL !== null) {
            fileComp = (
                <div>
                    <h3><b>Project Related File</b></h3>
                    <Link to="/showproject" onClick = {() => this.downloadProject(this.props.project.pID)}>
                        {this.props.project.fileUplURL}
                    </Link>
                </div>
            );
        }
        let bidAmount = 0;
        if(this.props.project.bids){
            bidAmount = this.props.project.bids
        }

        let avgBid = 0;
        if(this.props.project.bids){
            avgBid = parseInt(this.props.project.totalBid, 10)/parseInt(this.props.project.bids,10);
        }
        return(
            

            <div>
                <div className = "mainDiv"> 
                    <h3><b>{this.props.project.pName}</b></h3>
                    <br/>
                    <table className = "styleTable">
                        <td className="col-md-2">
                            <p className = "styletd">Bids</p>
                            <p className = "blueP">{bidAmount}</p>
                        </td>
                        <td className="col-md-3">   
                            <p className = "styletd">Avg Bid(USD)</p>
                            <p className = "blueP">${avgBid}</p>
                        </td>
                        <td className="col-md-12">
                            <p className = "styletd">Project Bid(USD)</p>
                            <p className = "blueP">{this.props.project.budgetRange}</p>
                        </td>
                    </table> 
                    <br/>
                    <div>
                    {/* <div className = "styleBid">
                        <h4>Great! Your bid has been placed successfully! Good job!</h4>
                    </div>  */}
                    <br/>
                    <div>
                        <h3><b>Project Description</b></h3>
                        <h5>{this.props.project.Description}</h5>
                    </div>  
                    {fileComp}
                    <br/>
                    <div>
                        <h3><b>Skills Required</b></h3>
                        <h5 className = "blueText">{this.props.project.skills}</h5>
                    </div> 
                    <br/> 
                    <div>
                    <Link className="btn btn-warning" to="/addproject" >Post a Project like this</Link>
                    </div>
                    </div> 
                    <Bidlist bList = {this.state.bidLists} projectOwner = {this.props.project.userID} />
                </div>
                
            </div>
        );
        
    }
}

const mapStateToProps = state => {
    console.log("Inside New Comp : ",state);
    return {
        project : state.project
    };
};



export default connect(mapStateToProps)(ShowProjectDetails);