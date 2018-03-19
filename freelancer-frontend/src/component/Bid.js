import React,{Component} from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';
import axios from 'axios';
import './ShowProjectDetails.css';
import {submitBid} from '../actions/index';
import { bindActionCreators } from 'redux';
import { Redirect,Link } from 'react-router-dom';
import cookie from 'react-cookies';
import Bidlist from './BidList';

class Bid extends Component {
    
    constructor(props){
        super(props);
        this.state = {  
            bids:null,
            totalBid:null,
            range:null,
            userbid:0,
            total:5,
            time:null,
            oid:null,
            pname : null
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    } 

    handleChange = (events) => {
        if(events.target.name === "bidrate"){
            this.setState({
                ...this.state,
                userbid : events.target.value,
                total: +events.target.value+5
            });
           
        }
        
        if(events.target.name === "time"){
            this.setState({
                time : events.target.value
            });
        }
       
    }


    handleSubmit = (events) =>{
        //events.preventDefault();
        this.props.submitBid(
            {
                total: this.state.total,
                time:this.state.time,
                eid: cookie.load('cookie'),
                oid: this.state.oid,
                // userID: cookie.load('cookie')
                
            },this.props.match.params.pid);

           
    }

    componentWillMount(){
        axios.post('http://localhost:8900/bid/'+this.props.match.params.pid)
                .then((response) => {
                    console.log("BIDSSSS",response.data);
                this.setState({
                    pname : response.data.projects[0].pName,
                   bids:response.data.projects[0].bids,
                   totalBid:response.data.projects[0].totalBid,
                   range:response.data.projects[0].budgetRange,
                   oid: response.data.projects[0].userID
                });
            });
    }

    

    render(){
        let bids = 0;
        if(this.state.bids){
            bids = this.state.bids;
        }

        let avgBid = 0;
        if(this.state.bids){
            avgBid = parseInt(this.state.totalBid, 10)/parseInt(this.state.bids,10)
        }
        console.log(this.state.project);
        
        return(
            <div>
            <form onSubmit = {this.handleSubmit}>
                <div className = "mainDiv"> 
                    <h3><b>{this.state.pname}</b></h3>
                    <br/>
                    <table className = "styleTable">
                        <td className="col-md-2">
                            <p className = "styletd">Bids</p>
                            <p className = "blueP">{bids}</p>
                        </td>
                        <td className="col-md-3">
                            <p className = "styletd">Avg Bid(USD)</p>
                            <p className = "blueP">${avgBid}</p>
                        </td>
                        <td className="col-md-12">
                            <p className = "styletd">Project Bid(USD)</p>
                            <p className = "blueP">{this.state.range}</p>
                        </td>
                    </table> 
                    <br/>
                    <br/>
                    
                    <div style = {{paddingBottom : '50px'}}>
                        <div >
                            <table style = {{float : 'left',width : '500px',paddingRight : '100px',lineHeight : '30px'}}   >
                                <tr>
                                    <th>Bid:</th>
                                    <th></th>
                                    <th></th>
                                    <th style = {{paddingRight : '100px'}}></th>
                                </tr> 
                                <tbody>
                                    <tr>
                                        <td>Paid to you : </td>
                                        <td>$</td>
                                        <td style = {{width:'50px',textAlign:'center', display: 'inline-block',marginRight : '20px'}}>
                                        <input style = {{width : '100px'}} onChange = {this.handleChange} maxlength="6" size="6" type="text" name="bidrate" id="bidrate"  placeholder="0"/>
                                        </td>
                                        <td>USD</td>
                                    </tr>
                                    <tr>
                                        <td>Freelancer Project Fee : </td>
                                        <td><b>$</b></td>
                                        <td><b>5 USD</b></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>You Bid : </td>
                                        <td><b>$</b></td>
                                        <td><b>{this.state.total} USD</b></td>
                                        <td></td>
                                    </tr>
                                </tbody>  
                            </table>
                        </div>
                        <div>
                            <table style = {{lineHeight : '30px'}}>
                                <tr>
                                    <th>Deliver In:</th>
                                    <th></th>
                                </tr> 
                                <tr>
                                    <td style = {{marginLeft : '20px'}}> <input onChange = {this.handleChange} maxlength="4" size="4" type="text" name="time" id="time"  placeholder=""/></td>
                                    <td><b>Days</b></td>
                                </tr>  
                            </table>
                        </div>
                    </div>
                    <div>
                    <Link onClick = {this.handleSubmit} style = {{width : '150px'}}  className=" signInBtn btn btn-primary form-control" to="/myProjects">
                    Place Bid</Link></div>
                </div>
                </form>

            </div>
        );
        
    }
}

const mapStateToProps = state => {
    
    return {
        id : state.id
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({submitBid},dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Bid);