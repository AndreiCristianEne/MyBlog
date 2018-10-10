import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

export default class Login extends Component {

    state = {
        password: {
            value: '',
            touched: false,
            valid: false,
        },
        email: {
            value: '',
            touched: false,
            valid: false,
        }
    };

    handlePasswordChange(password) {
        this.setState({password: {value: password, touched: true, valid: password.length >= 6}});
    }

    handleEmailChange(email) {
        const validateEmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({email: {value: email, touched: true, valid: validateEmailRegEx.test(email)}})
    }

    async login() {
        const {password, email} = this.state;

        try {
            const {data} = await axios.post('http://localhost:8888/api/user/login.php', qs.stringify({
                email: email.value,
                password: password.value
            }));
            await this.checkLogin(data);
        } catch (err) {
            console.log(err);
        }
    }

    async checkLogin(token) {
        try {
            const {data} = await axios.post('http://localhost:8888/index.php', qs.stringify({AUTH_TOKEN: token}));
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {password, email} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="box">
                            <div className="field">
                                <div className="control">
                                    <div className="content">
                                        <h4>Login</h4>
                                        <p>Please login in order to continue using our blog!</p>
                                        <p>If you do not have an account, head over to the <Link
                                            to="signup">signup</Link> page.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input placeholder="Email"
                                           className={`input ${email.touched && !email.valid && 'is-danger'}`}
                                           value={email.value} onChange={e => this.handleEmailChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input placeholder="Password"
                                           className={`input ${password.touched && !password.valid && 'is-danger'}`}
                                           value={password.value}
                                           onChange={e => this.handlePasswordChange(e.target.value)}
                                           type="password"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button" disabled={!password.valid || !email.valid}
                                            onClick={() => this.login()}>Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}