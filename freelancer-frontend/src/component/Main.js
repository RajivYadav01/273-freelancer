import React from 'react';
import {Switch,Route} from 'react-router-dom';
import SignUp  from './SignUp';
import Navigation from './Navigation';
import SignIn from './SignIn';
import UserDash from './UserDash';
import Profile from './Profile';
import MyProjects from './MyProjects';
import ShowProjectDetails from './ShowProjectDetails';
import AddProjects from './AddProject';
import ProjectsPosted from './ProjectsPosted';
import Bid from './Bid';

const Main = () => (
    <Switch>
        <Route exact path = '/' component = {Navigation}/>
        <Route exact path = '/signUp' component = {SignUp}/>
        <Route exact path = '/signin' component = {SignIn}/>
        <Route exact path = '/user' component = {UserDash}/>
        <Route exact path = '/profile' component = {Profile}/>
        <Route exact path = '/myProjects' component = {MyProjects}/>
        <Route exact path = '/ShowProject' component = {ShowProjectDetails}/>
        <Route exact path = '/addproject' component = {AddProjects}/>
        <Route exact path = '/showProjectsPosted' component = {ProjectsPosted}/>
        <Route exact path = '/bid/:pid' component={Bid}/>
    </Switch>
)

export default Main;