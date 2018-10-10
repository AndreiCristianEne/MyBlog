import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs';

export default (BaseComponent) => {
    return class extends Component {

        state = {
            loading: true,
            loggedIn: false
        };

        async componentWillMount() {
            try {
                await axios.post('http://localhost:8888/index.php', qs.stringify({AUTH_TOKEN: localStorage.getItem('AUTH_TOKEN')}));
                this.setState({loading: false, loggedIn: true});
            } catch (err) {
                console.log(err);
                this.setState({loading: false, loggedIn: false});
            }
        }

        render() {
            const {loading, loggedIn} = this.state;
            const props = this.props;

            return (
                loading
                    ? <h1>Loading</h1>
                    : loggedIn
                    ? <BaseComponent {...props}/>
                    : <Redirect to="/login"/>
            );

        }
    }
}