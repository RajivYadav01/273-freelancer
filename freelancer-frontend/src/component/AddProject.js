import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchForm } from '../actions/index';
import './AddProject.css';

class AddProjects extends Component {

    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.uploadInput = this.uploadInput.bind(this);
        this.state = {
            pname : null,
            textlg : null,
            skills: null,
            fupl: null,
            radiobtn: "1",
            drp1: "USD",
            drp2: "$10 - $30"
        }
      }

    handleChange = (events) =>{
        if(events.target.name === 'pname'){
            this.setState({
                pname : events.target.value
            });
        }
        if(events.target.name === 'textlg'){
            this.setState({
                textlg : events.target.value
            });
        }
        if(events.target.name === 'skills'){
            this.setState({
                skills : events.target.value
            });
        }
        if(events.target.name === 'fupl'){
            this.setState({
                fupl : this.uploadInput.files[0]
            });
        }
        if(events.target.name === 'radiobtn'){
            this.setState({
                radiobtn : events.target.value
            });
        }
        if(events.target.name === 'drp1'){
            this.setState({
                drp1 : events.target.value
            });
        }
        if(events.target.name === 'drp2'){
            this.setState({
                drp2 : events.target.value
            });
        }
    }

    onFormSubmit(event){
        // event.preventDefault() // Stop form submit
        console.log("inside onformsubmit", this.state);
        this.props.fetchForm(this.state);
        // <Redirect to="/showProjectsPosted" />
      }

    renderpname(field) {
        console.log(field);
        return (
            <div>
                <input 
                    name={field.name}
                    type="text"
                    placeholder={field.placeholder}
                    // onChange = {field.input.onChange}
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        const style = {
            display : 'none'
        }

        const styleBorder = {
            border : '1px solid',
            borderRadius : '0px'
        }
        
        return (
            <form id="formbox" onSubmit={this.onFormSubmit}>
                <h1>Tell us what you need done</h1>
                <p>Get free quotes from skilled freelancers within minutes, view profiles, 
                    ratings and portfolios and chat with them. Pay the freelancer only when 
                     you are 100% satisfied with their work.</p>
                <br/> <br/>
                <h3>Choose a name for your project</h3>
                <input 
                    name="pname"
                    placeholder="e.g. Build me a website"
                    onChange = {this.handleChange}
                    type="text"
                    // component={this.renderpname}
                />
                <br/> <br/>
                <h3>Tell us more about your project</h3>
                <p>Great project descriptions include a little bit about yourself, details of what you are trying to achieve, and any decisions that 
                you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help
                you fill in the blanks.</p>
                <textarea 
                    id="lg-txt-area"
                    placeholder="Describe your project here..."
                    type="text"
                    name="textlg"
                    onChange = {this.handleChange}
                />
                <div id="file-upload">
                    <label htmlFor="fuplbtn" style={styleBorder} id="btn-file-uploader" className="btn btn-plain">
                        <span>
                            <i className="fa fa-plus"></i>
                            <span> <b>Upload Files</b></span>
                        </span>
                        <input id="fuplbtn" name="fupl" style={style} onChange = {this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file" className="upload" />    
                    </label>
                    <p>Drag & drop any images or documents that might be helpful in explaining your project brief here.</p>
                </div>
                <br/> <br/>
                <h3>What skills are required?</h3>
                <p>Enter up to 5 skills that best describe your project.
                     Freelancers will use these skills to find projects they are most interested and experienced in.</p>
                <input 
                    name="skills"
                    placeholder="What skills are required?"
                    onChange = {this.handleChange}
                    type="text"
                    // component={this.renderpname}
                />
                <br/><br/>
                <h3>How do you want to pay?</h3>
                <div className="radio radio-info">
                    <label><input type="radio" value="1" name="radiobtn" onChange = {this.handleChange} component="rinput" checked={this.state.radiobtn==="1"}/>Fixed price project</label>
                </div>
                <div className="radio radio-info">
                    <label><input type="radio" value="2" name="radiobtn" onChange = {this.handleChange} component="rinput" checked={this.state.radiobtn==="2"}/>Hourly project</label>
                </div>
                <br/><br/>
                <h3>What is your estimated budget?</h3>
                <div id="drpdwn">
                    <select id="currency" name="drp1" onChange = {this.handleChange}>
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="GBP">GBP</option>
                        <option value="YEN">YEN</option>
                    </select>
                    <select id="range" name="drp2" onChange = {this.handleChange}>
                        <option value="$10 - $30" label="Micro Project ($10 - 30 USD)">Micro Project ($10 - 30 USD)</option>
                        <option value="$30 - $250" label="Simple project ($30 - 250 USD)">Simple project ($30 - 250 USD)</option>
                        <option value="$250 - $750" label="Very small project ($250 - 750 USD)">Very small project ($250 - 750 USD)</option>
                        <option value="$750 - $1500" label="Small project ($750 - 1500 USD)">Small project ($750 - 1500 USD)</option>
                    </select>
                </div>
                <br/> <br/> <br/>
                {/* <input type="submit" className="btn btn-warning btn-lg"  value="Post My Project"/> */}
                <div>
                    <Link onClick={this.onFormSubmit} className="btn btn-warning btn-lg" to="/showProjectsPosted">Post My Project</Link>
                </div>
            </form>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchForm }, dispatch);
    // return {
    //     submitForm: (newData) => {
    //         console.log("Data sent : ",newData);
    //         axios.post('http://localhost:1500/signin/', JSON.stringify(newData))
    //             .then((response) => {
    //             dispatch({type: 'LOGIN_SUCCESS',payload : response})
    //         });
    //     }
    // }
}
export default connect(null, mapDispatchToProps)(AddProjects);
