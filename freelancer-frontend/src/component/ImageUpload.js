import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './imageUpload.css';
import cookie from 'react-cookies';

class Imageuploader extends Component {
    constructor(props) {
        super();
        this.state = {
            fileSelected: '',
            imagePreview: '',
            display: 'none',
            loadImg:''
        }
    }

    componentWillMount(){
        if(cookie.load('cookie')){
            axios.post('http://localhost:8900/loadImage/',{'userID':cookie.load('cookie')})
            .then(response=>{
                console.log("response",response);
                let imagePreview = 'data:image/jpg;base64,' + response.data;
                this.setState({
                    imagePreview: imagePreview,
                    display: 'block'
                })
            })
        }
    }

    handleChange = e => {
        e.preventDefault();
        
        let rdr = new FileReader();
        let fileSelected = this.uploadInput.files[0];
        rdr.onloadend = () => {
          this.setState({
            loadImg: this.state.imagePreview,  
            fileSelected: fileSelected,
            imagePreview: rdr.result,
            display: 'block'
          });
        }
    
        rdr.readAsDataURL(fileSelected);
    }

    handleUplaod = () => {
        console.log("In handle upload...")
       
        // this.setState({
        //     fupl : this.uploadInput.files[0]
        // });
        var fData = new FormData();
        fData.append('userID', cookie.load('cookie'));
        fData.append('iFile', this.state.fileSelected);
        axios.post('http://localhost:8900/saveImage', fData)
            .then( (response) => {
                console.log(Response);
            })
    }

    handleCancel = () => {
        this.setState({
            fileSelected: '',
            imagePreview: this.state.loadImg,
            display: 'none'
        });
    }


    render() {
        const styleUpl = {
            display : 'none'
        }
        const styleBorder = {
            border : '1px solid',
            borderRadius : '0px',
            marginRight: '10px'
        }
        let {imagePreview} = this.state;
        let {loadImg} = this.state;
        let $imagePreviewFinal = null;
        if (imagePreview) {
            $imagePreviewFinal = (<img src = {imagePreview} alt = "This is user's display pic"/>);
          }
        const style ={
            display : this.state.display
        }
        console.log("eVal-----" + this.props.eVal)
        let uplImg = null;
        if(this.props.eVal) {
            if(this.state.fileSelected==='') {
                uplImg = (
                    <div id='imageUploader'> 
                        <label htmlFor="uplbtn" style={styleBorder} id="btn-file-uploader" className="btn btn-plain">
                            <span> <b>Upload Image</b></span>
                        </label>
                        <input style={styleUpl} type='file' id="uplbtn" className='fileInput' onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }}/>
                        {/* <button style = {style} onClick = {this.handleUplaod} className="btn btn-primary"><label>Upload</label></button> */}
                    </div>
                );
            }
            else {
                uplImg = (
                <div id='imageUploader'>
                    <label htmlFor="uplbtn" style={styleBorder} id="btn-file-uploader" className="btn btn-plain">
                        <span> <b>Save</b></span>
                    </label>
                    <label htmlFor="canbtn" style={styleBorder} id="btn-file-uploader" className="btn btn-plain">
                        <span> <b>Cancel</b></span>
                    </label>
                    {/* <input style={styleUpl} type='file' id="uplbtn" className='fileInput' onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }}/> */}
                    <button id="uplbtn" style = {styleUpl} onClick = {this.handleUplaod} ></button>
                    <button id="canbtn" style = {styleUpl} onClick = {this.handleCancel} ></button>
                </div>
                );
            }
        }
        return(
            <div className="Imageuploader">
                <div id='profileImage'>
                    {$imagePreviewFinal}
                    {uplImg}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveImage : (image) => {
            //console.log("In mapDispatch" + imageDetails + "......" + imageName);
            
        }
    }
}

export default connect(null, mapDispatchToProps)(Imageuploader);
