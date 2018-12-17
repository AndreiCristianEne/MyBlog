import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';
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
        },
        isCaptchaValid: false,
        isErrorShown: false,
        isFormValid: false
    };

    handlePasswordChange(password) {
        this.setState({password: {value: password, touched: true, valid: password.length >= 6}});
    }

    handleEmailChange(email) {
        const validateEmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({email: {value: email, touched: true, valid: validateEmailRegEx.test(email)}})
    }

    // Show message in console when reCaptcha plugin is loaded
    onCaptchaLoad = () => {
        console.log('Captcha loaded')
    }

    // Update state after reCaptcha validates visitor
    onCaptchaVerify = (response) => {
        this.setState({
            isCaptchaValid: true
        })
    }

    async login() {
        const {password, email} = this.state;

        if (!process.env.REACT_APP_API_URL) {
            throw new Error('REACT_APP_API_URL missing')
        }

        if (this.state.isCaptchaValid) {
            this.setState({
                isErrorShown: false,
                isFormValid: true
            })
        }

        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/user/login.php`, qs.stringify({
                email: email.value,
                password: password.value
            })).then(response => {
                if (response.status === 200 && !response.data.requestChangePassword) {
                    window.location.href = '/';
                } else {
                    window.location.href = '/change-password';
                }
                localStorage.setItem('AUTH_TOKEN', response.data.token);
            });
        } catch (err) {
            console.log(err);
            this.setState({
                isErrorShown: true
            })
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
                                    <div className="content">
                                        <p><Link
                                            to="forgot-password">Forgot Password?</Link></p>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                            {/* !! */}
                            {/* Make sure to use your 'sitekey' for Google reCaptcha API! */}
                            {/* !! */}
                            <Recaptcha
                                sitekey="6Le9cYIUAAAAAAFcFAzHW2zsyHDyxbleuaZ0_bQR"
                            />
                            </div>

                            <div className="field">
                            {this.state.isErrorShown && (
                                <p>Please, make sure to fill all fields.</p>
                            )}
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