import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'

//routes
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/index';
import Submit from './pages/Submit';
import Article from './pages/Article';
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'

import protectedPage from './components/Protected';

const SubmitPage = protectedPage(Submit, true);
const ArticlePage = protectedPage(Article, false);

export const isLoggedIn = () => {
    let token = window.localStorage.getItem('AUTH_TOKEN')
    return token !== null
}

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
                <Route path="/article/:id" component={ArticlePage}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/change-password" component={ChangePassword}/>
                <Route path="/" exact component={Home}/>

            </div>
        );
    }
}

export default App;
