import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'

//routes
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/index';
import Submit from './pages/Submit';

import protectedPage from './components/Protected';

const SubmitPage = protectedPage(Submit);

class App extends Component {
    async componentWillMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({loggedIn: true});
        }
    }

    render() {
        return (
            <div>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/submit" component={SubmitPage}/>
                <Route path="/" exact component={Home}/>
            </div>
        );
    }
}

export default App;
