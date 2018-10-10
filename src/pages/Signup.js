import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class Signup extends Component {

    state = {
        password: {
            value: '',
            touched: '',
            valid: false,
        },
        email: {
            value: '',
            touched: '',
            valid: false,
        },
        avatar: {
            value: 'empty'
        },
        username: {
            value: '',
            touched: '',
            valid: false,
        }
    };

    async signUp() {
        const {email, password, avatar, username} = this.state;

        try {
            await axios.post('http://localhost:8888/api/user/signup.php', qs.stringify({
                email: email.value,
                password: password.value,
                avatar: avatar.value,
                username: username.value
            }));
        } catch (err) {
            console.log(err);
        }
    }

    handleEmailChange(email) {
        const validateEmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({email: {value: email, touched: true, valid: validateEmailRegEx.test(email)}});
    }

    handlePasswordChange(password) {
        this.setState({password: {value: password, touched: true, valid: password.length > 6}});
    }

    handleUsernameChange(username) {
        this.setState({username: {value: username, touched: true, valid: username.length > 4}});
    }

    handleAvatarUpload(avatar) {

    }

    render() {
        const {email, password, avatar, username} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="box">
                            <div className="field">
                                <div className="controk">
                                    <div className="content">
                                        <h4>Signup</h4>
                                        <p>Please fill-in the fields below in order to register.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input placeholder="Name"
                                           className={`input ${username.touched && !username.valid && 'is-danger'}`}
                                           onChange={e => this.handleUsernameChange(e.target.value)}
                                           value={username.value}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input placeholder="Email" value={email.value}
                                           className={`input ${email.touched && !email.valid && 'is-danger'}`}
                                           onChange={e => this.handleEmailChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input placeholder="Password" value={password.value}
                                           className={`input ${password.touched && !password.valid && 'is-danger'}`}
                                           type="password"
                                           onChange={e => this.handlePasswordChange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button" onClick={() => this.signUp()}
                                            disabled={!email.valid || !password.valid || !username.valid}>Sign Up
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