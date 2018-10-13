import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs';

export default (BaseComponent, restricted) => {
    return class extends Component {

        state = {
            loading: true,
            loggedIn: false,
            authToken: null
        };

        async componentWillMount() {
            const token = localStorage.getItem('AUTH_TOKEN');
            try {
                await axios.post('http://localhost:8888/index.php', qs.stringify({AUTH_TOKEN: token}));
                this.setState({loading: false, loggedIn: true, authToken: token});
            } catch (err) {
                console.log(err);
                this.setState({loading: false, loggedIn: false});
            }
        }

        render() {
            const {loading, loggedIn, authToken} = this.state;
            const props = this.props;

            return (
                loading
                    ? <h1>Loading</h1>
                    : loggedIn
                    ? <BaseComponent {...props} authToken={authToken} isLoggedIn={true}/>
                    : restricted
                        ? <Redirect to="/login"/>
                        : <BaseComponent {...props} isLoggedIn={false}/>
            );

        }
    }
}