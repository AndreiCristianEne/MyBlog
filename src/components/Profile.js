import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class Signup extends Component {

    state = {
        email: {
            value: '',
            touched: '',
            valid: false,
        },
        avatar: {
            value: null
        },
        username: {
            value: '',
            touched: '',
            valid: false,
        }
    };

    async componentWillMount() {
        try {
            const {data} = await axios.post('http://localhost:8888/api/user/get_user.php', qs.stringify({
                AUTH_TOKEN: window.localStorage.getItem("AUTH_TOKEN")
            }));
            this.setState({
                email: {value: data.email, touched: '', valid: true},
                avatar: {value: data.avatar_path},
                username: {value: data.username, touched: '', valid: true}
            })
        } catch (err) {
            console.log(err);
        }
    }

    async updateProfileData() {
        const {email, username} = this.state;

        try {
            await axios.post('http://localhost:8888/api/user/update.php', qs.stringify({
                email: email.value,
                username: username.value,
                AUTH_TOKEN: window.localStorage.getItem("AUTH_TOKEN")
            })).then(response => {
                if (response.status === 200) {
                    window.location.href = '/';
                }
            });
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


    render() {
        const {email, avatar, username} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="box">
                            <div className="field">
                                <div className="controk">
                                    <div className="content">
                                        <h4>Profile</h4>
                                        <p>Here you can update your profile data if desired. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <div className="image is-96x96">
                                        <img src={`http://localhost:8888/api/public/images/${avatar.value}`}/>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    Name:
                                    <input placeholder="Name"
                                           className={`input ${username.touched && !username.valid && 'is-danger'}`}
                                           onChange={e => this.handleUsernameChange(e.target.value)}
                                           value={username.value}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    Email:
                                    <input placeholder="Email" value={email.value}
                                           className={`input ${email.touched && !email.valid && 'is-danger'}`}
                                           onChange={e => this.handleEmailChange(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control buttons">
                                    <button className="button" onClick={() => this.props.history.push('/')}>
                                        Cancel
                                    </button>
                                    <button className="button" onClick={() => this.updateProfileData()}
                                            disabled={!email.valid || !username.valid}>Update
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