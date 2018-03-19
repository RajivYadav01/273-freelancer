import React,{Component} from 'react';
import Navigation from './Navigation';
import ProfilePic from '../assets/images/freelancer-logo.png';
import './Profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';
import pencilLogo from '../assets/images/pencil.png';
import Navigation2 from './Navigation2';
import Imageupload from './ImageUpload';
import { bindActionCreators } from 'redux';
import {updateProfile} from '../actions/index';
import cookie from 'react-cookies';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            disabled : true,
            loadedProfileDetails:null,
            username : '',
            designation:'',
            aboutme : '',
            skills :'',
            email : '',
            phone : '',
            file : null,
            image : '',
            editing : false,
            uid:'',
            save: false
            
        }

        this.handleChange=this.handleChange.bind(this);
        
    }
    componentWillMount(){

        if(cookie.load('cookie')){
            axios.post('http://localhost:8900/profile/',{'userID':cookie.load('cookie')})
            .then(response=>{
                console.log("response",response);
                this.setState({
                    username:response.data.name,
                    designation:response.data.designation,
                    phone:response.data.phoneNumber,
                    email:response.data.email,
                    skills:response.data.skills,
                    aboutme:response.data.aboutMe
                })
            
            });
        }
    }


    edit() {
        this.setState({
            editing: true,
            disabled: false
        });
    }

    cancel() {  
        this.setState({
            editing: false,
            disabled: true,
            save: false
        });
    }


    handleChange = (events) =>{
        if(events.target.name === 'aboutme'){
            this.setState({
                aboutme : events.target.value
            });
        }
        if(events.target.name === 'skills'){
            this.setState({
                skills : events.target.value
            });
        }
        if(events.target.name === 'email'){
            this.setState({
                email : events.target.value
            });
        }
        if(events.target.name === 'phone'){
            this.setState({
                phone : events.target.value
            });
        }
        
    }

    saveUpdatedUser(e) {
        e.preventDefault();
        this.props.updateProfile(
            {
                username: this.state.username,
                email: this.state.email,
                phone: this.state.phone,
                aboutMe: this.state.aboutme,
                skills:this.state.skills,
                designation:this.state.designation,
                userID:cookie.load('cookie')
            });
        this.setState({
            editing: false,
            disabled: true,
            save: true
        })    
    }

    render(){

        console.log("in profile");
        let buttons = null;
        let saveCancelButton = null;
        if(this.state.editing === false) {
            buttons = (
                <div className="form-group">
                                <div className="btn-group btn-group-justified">
                                    <div className="btn-group">
                                        <button type="button" onClick={this.edit.bind(this)} className="btn btn-primary form-control"><label> Edit your profile </label></button>
                                    </div>
                                </div>
                                
                            </div>
            );
            saveCancelButton = null;
        } else {
            saveCancelButton = (
                <div className="form-group">
                                <div className="btn-group btn-group-justified">
                                    <div className="btn-group">
                                        <button type="button" onClick={this.saveUpdatedUser.bind(this)} className="btn btn-primary form-control"><label>Save</label></button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" onClick={this.cancel.bind(this)} className="btn btn-primary form-control"><label>Cancel</label></button>
                                    </div>
                                </div>
                                
                            </div> 
            )
        }
        let profileDetails=null;
        if(this.state.username){
       
        profileDetails=(
            <div className = 'Userprofile'>
            <Navigation />
            <Navigation2 />
            <div className='container-fluid'>
                <div className='row'>
                    <Imageupload eVal={this.state.editing} sVal={this.state.save} />
                    <div id='profileDescription'>
                    <div>
                    <form >
                        <div className="form-group">
                            <div id='name'><h1>{this.state.username}</h1></div>
                        </div>
                        <div className="form-group">
                            <div id='name'><h4>{this.state.designation}</h4></div>
                        </div>
                        <div className="form-group">
                            <label>About Me:  <span className="glyphicon glyphicon-edit"></span></label>
                            <textarea id="txtaboutme" value={this.state.aboutme} disabled={this.state.disabled} onChange={this.handleChange} className="form-control" rows="5" name="aboutme" ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Email:  <span className="glyphicon glyphicon-edit"></span></label>    
                            <input type="email"  ref="emailid"  value={this.state.email} disabled={this.state.disabled} onChange={this.handleChange} className="form-control" placeholder='Enter your email id'  id="txtEmailId" name="email" />
                        </div>
                        <div className="form-group">
                            <label>Phone:  <span className="glyphicon glyphicon-edit"></span></label>
                            <input type="text" ref="phone"  value={this.state.phone} disabled={this.state.disabled} onChange={this.handleChange} className="form-control" placeholder='Enter your phone number' id="txtPhone" name="phone" />
                        </div>
                        
                    </form>
                    </div>
                    <div>
                    {saveCancelButton}
                    </div>
                    
                    </div>
                    <div id='profileSkillsAndEditButton'>
                        {buttons}
                        <div id = 'profileSkills'>
                            <div className="form-group">
                                <label>Skills:  <span className="glyphicon glyphicon-edit"></span></label>
                                <textarea id="txtskills" value={this.state.skills} className="form-control" rows="5" onChange={this.handleChange} name='skills' disabled={this.state.disabled}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            );
        }else{
           <div>Waiting</div>
        }
        return(
            <div>
                {profileDetails}
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
    return bindActionCreators({updateProfile},dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);