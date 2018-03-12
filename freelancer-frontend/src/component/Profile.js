import React,{Component} from 'react';
import Navigation from './Navigation';
import ProfilePic from '../assets/images/freelancer-logo.png';
import './Profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';
import pencilLogo from '../assets/images/pencil.png';
import Navigation2 from './Navigation2';

class Profile extends Component{
    constructor(props){
        super(props);
        this._handleF = this._handleF.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.state = {
            disabled : true,
            name : null,
            designation:null,
            aboutMe : null,
            skills : null,
            email : null,
            phNo : null,
            form : null
        }
    }
    
    _handleF(text) {
        this.setState({
            form : (
                <div>
                    <button>Save</button>
                </div>
            )
        });
    }

    _handleFocusOut(text) {
        console.log("Text Value : ",text);
        //text.preventDefault();
        this.setState({
            name : text
        });
    }


    componentWillMount(){
        const id = this.props.id;
        axios.post('http://localhost:1500/profile/',JSON.stringify(id))
                .then((response) => {
                this.setState({
                    name : response.data.name,
                    designation : response.data.designation,
                    aboutMe : response.data.aboutMe,
                    skills : response.data.skills,
                    email : response.data.email,
                    phNo : response.data.phoneNumber
                });
                console.log("Name after post : ", response);
            });
            
    }
    handleChange = (events) => {
        this.setState({
            name : events.target.value
        });
    }
    handleEditClick = (events) => {
        console.log("Inside handle click");
        this.setState({
            disabled : !this.state.disabled
        });
    }
    render(){
        const pencilStyle = {
            height:'20px',
            width : '20px'
        }
        let pencil = null;
        if(!this.state.disabled){
            pencil = (<img style = {pencilStyle} onClick = {this._handleF} src = {pencilLogo} className="img-rounded imageStyle" alt="edit"></img>);
        }

        const styleSkills = {
            width : '200px'
        }
        console.log("ID inside profile : " + this.props.id);
        return(
            
            <div className="container-fluid ">
                <Navigation/>
                <Navigation2/>
                <div>
                <span>
                <EditableLabel text={this.state.name}
                    labelClassName='myLabelClass'
                    inputClassName='myInputClass'
                    inputWidth='200px'
                    inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    inputFontWeight='bold'
                    //onFocus={this._handleF}
                    onFocusOut={this._handleFocusOut}
                    disabled = 'true'
                    //onClick={this.onFocus}
                />
                {pencil}
                </span>
                {this.state.form}
                </div>
                <br/><br/>
                <div className="row content ">
                    <div className="col-sm-3 divStyle ">
                        <img src = {ProfilePic} className="img-rounded imageStyle" alt="Insert Photo here"></img>
                        <h4>Email : {this.state.email}</h4>
                        <h4>Phone : {this.state.phNo}</h4>
                    </div> 
                    <div className="col-sm-6 divStyle">
                        <h3>{this.state.name}</h3>
                        <h4>{this.state.designation}</h4>
                        <h4>{this.state.aboutMe}</h4>
                    </div>
                    <div className="col-sm-2 div3Style">
                        <button onClick = {this.handleEditClick.bind(this)} className = "btn btn-primary form-control">Edit Profile</button>
                        {<h4 style = {styleSkills}>Skills : {this.state.skills}</h4>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.id
    };
};

export default connect(mapStateToProps)(Profile);