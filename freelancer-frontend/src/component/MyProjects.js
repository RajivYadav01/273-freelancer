import React,{Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Navigation from './Navigation';
import Navigation2 from './Navigation2';
import ShowProjectsBid from './ShowProjectsBid';

class MyProjects extends Component{


    render(){
        return(
            <div>
                <Navigation/>
                <Navigation2/>
                <ShowProjectsBid/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.id
    };
};

export default connect(mapStateToProps)(MyProjects);
