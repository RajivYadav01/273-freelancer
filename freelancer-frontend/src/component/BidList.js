import React,{Component} from 'react';
import axios, { post } from 'axios';
import Logo from '../assets/images/burger-logo.png';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

export default class BidList extends Component {
    state = {
        imgPrev : null
    }    
    handleHireButton = (pid) => {
        axios.post('http://localhost:8900/hireNow/', {'pid' : pid})
                .then((response) => {
                    console.log("BIDSSSS",response.data);
                this.setState({
                });
            });
    }
    render(){
        /*function fetchPhoto(eid){
            axios.post('http://localhost:8900/loadImage/',{'userID':eid})
            .then(response=>{
                console.log("response",response);
                this.setState({
                    imgPrev : response.data
                })
            })
        }*/
        let bids = this.props.bList.map(bid =>{
            //fetchPhoto(bid.eid);
            let imagePreview = 'data:image/png;base64,' + bid.imagePath;
            let hireNowButton = null;
            if(this.props.projectOwner == cookie.load('cookie')){
                hireNowButton = (<td>
                    <Link className="btn btn-warning" onClick = {() => this.handleHireButton(bid.pid)} to = "/myProjects">Hire Now</Link> 
                </td>);
                }
            return(
                    <tr>
                        <td>
                        {<img src = {imagePreview} className = "img-rounded"></img>}
                        </td>
                        <td>{bid.userName}</td>
                        <td>{bid.bidAmt}</td> 
                        <td>{bid.deliverydays}</td> 
                         {hireNowButton}
                    </tr>
             );   
        });
        console.log("Project Id inside Bid List",this.props.bList);
        const tableColomn = {
            width: '20%',
            backgroundColor: '#1a1a1a',
            color: 'white',
        }
        const imageUpload = {
            border: '1px solid',
            width: '200px',
            height: '200px',
            maxWidth:'100%',
            maxHeight:'100%',
            objectFit: 'contain'
        }
        let hireNowButton = null;
        if(this.props.projectOwner == cookie.load('cookie')){
            hireNowButton = (<th style = {tableColomn}>HIRE NOW</th>);
            }
        return(
            <div> 
                <table  style = {{margin : '50px 5px',width:'1100px'}} className="table table-hover">
                <thead className = "thread-inverse">
                    <tr className='table-secondary'>
                        <th style = {tableColomn}>IMAGE</th>
                        <th style = {tableColomn}>FREELANCER NAME</th>
                        <th style = {tableColomn}>BID PRICE</th>
                        <th style = {tableColomn}>PERIOD IN DAYS</th>
                         {hireNowButton}
                    </tr>
                </thead>
                <tbody>
                    {bids}
                </tbody>
            </table>
            </div>
        );
    }
    
}