import React,{Component} from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import './ShowProjectDetails.css';

class ShowProjectDetails extends Component {
    state = {
        projectDet : []
    }

    /*componentWillMount(){
        const projectID = this.props.project.projectID;
        axios.post('http://localhost:1500/ShowProject/',projectID)
                .then((response) => {
                this.setState({
                    projectDet : response.data
                });
            });
    }*/

    render(){
        
        return(
            <div>
                <div className = "mainDiv"> 
                    <h3><b>Build a Test Website</b></h3>
                    <br/>
                    <table className = "styleTable">
                        <td className="col-md-2">
                            <p className = "styletd">Bids</p>
                            <p className = "blueP">8</p>
                        </td>
                        <td className="col-md-3">
                            <p className = "styletd">Avg Bid(USD)</p>
                            <p className = "blueP">$28</p>
                        </td>
                        <td className="col-md-12">
                            <p className = "styletd">Project Bid(USD)</p>
                            <p className = "blueP">$10 - $30</p>
                        </td>
                    </table> 
                    <br/>
                    <div>
                    <div className = "styleBid">
                        <h4>Great! Your bid has been placed successfully! Good job!</h4>
                    </div> 
                    <br/>
                    <div>
                        <h3><b>Project Description</b></h3>
                        <h5>I need to make a test website</h5>
                    </div>  
                    <br/>
                    <div>
                        <h3><b>Skills Required</b></h3>
                        <h5 className = "blueText">C, C++, JAVA, ReactJS</h5>
                    </div> 
                    <br/> 
                    <div>
                    <button  type="button" className=" styleButton btn btn-warning">Post a Project like this</button>
                    </div>
                    </div> 
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