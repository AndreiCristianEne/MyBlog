import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {isLoggedIn} from '../App'

export default class Menu extends Component {
    render() {

        return (
            <aside className="menu">
                <p className="menu-label">Home</p>
                <ul className="menu-list">
                    <li><a className="is-active">Articles</a></li>
                </ul>
                {!isLoggedIn() ? (
                    <div>
                        <p className="menu-label">User</p>
                        <ul className="menu-list">
                            <li><a><Link to={"/signup"}>Signup</Link></a></li>
                            <li><a><Link to={"/login"}>Log in</Link></a></li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <p className="menu-label">Profile</p>
                        <ul className="menu-list">
                            <li><a><Link to={"/profile"}>Edit Profile</Link></a></li>
                            <li>
                                <a><Link to={"/change-password"}>Change Password</Link></a>
                            </li>
                        </ul>
                    </div>
                )}
            </aside>

        )
    }

}