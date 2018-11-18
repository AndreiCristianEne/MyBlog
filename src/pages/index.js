import React, {Component} from 'react';
import Article from '../components/Article';
import Menu from '../components/Menu';
import axios from 'axios';
import qs from "qs";
import {Redirect} from "react-router-dom";

export default class Index extends Component {

    state = {
        loading: true,
        articles: [],
        shouldChangePassword: false
    };

    async componentWillMount() {
        try {
            const {data} = await axios.get('http://localhost:8888/api/article/get.php');
            this.setState({loading: false, articles: data});
        } catch (err) {
            console.log(err)
        }
        try {
            if (window.localStorage.getItem("AUTH_TOKEN")) {
                await axios.post('http://localhost:8888/api/user/is_password_resetted.php', qs.stringify({
                    AUTH_TOKEN: window.localStorage.getItem("AUTH_TOKEN")
                })).then(response => {
                    if (response.status === 200 && !response.data) {
                        this.setState({shouldChangePassword: true});
                    }

                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {loading, articles, shouldChangePassword} = this.state;

        return (
            shouldChangePassword ? <Redirect to="/change-password"/> :
            <div className="section">
                <div className="columns">
                    <div className="column">
                        <Menu/>
                    </div>
                    <div className="column">
                        {loading && <h1>Loading</h1>}
                        {
                            !loading &&
                            articles.map((article, key) => {
                                return <Article key={key} article={article}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}