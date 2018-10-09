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
            value: '',
            touched: '',
            valid: false,
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
            await axios.post('http://localhost:8888/api/user/signup.php',qs.stringify({
                email: email.value,
                password: password.value,
                avatar: avatar.value,
                username: username.value
            }));
        } catch (err) {
            console.log(err);
        }
    }

    handleEmailChange (email) {

    }

    handlePasswordChange (password) {

    }

    handleUsernameChange (username) {

    }

    handleAvatarUpload (avatar) {

    }

    render() {
        const {email, password, avatar, username} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="box">
                            <div className="field">
                                <div className="control">
                                    <input placeholder="Email" value={email.value} className={`input ${email.touched && !email.valid && 'is-danger'}`}/>
                                </div>
                            </div>
                        <div className="field">
                            <div className="control">
                                <button className="button" onClick={() => this.signUp()}>Sign Up</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}