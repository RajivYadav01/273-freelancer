import React, {Component} from 'react';

class Navigation2 extends Component{
    render(){
        return(
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Home</a></li>
                        <li><a href="/myProjects">My Projects</a></li>
                        <li><a href="#">Projects Bid</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation2;