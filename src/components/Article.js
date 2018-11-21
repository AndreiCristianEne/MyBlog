import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {convertToRaw} from "draft-js";
import axios from "axios";
import qs from "qs";

export default class Article extends Component {
    state = {
        isAuthor: false
    };

    async componentWillMount() {
        try {
            const {data} = await axios.post('http://localhost:8888/api/user/is_author.php', qs.stringify({
                AUTH_TOKEN: window.localStorage.getItem("AUTH_TOKEN"),
                id: this.props.article.id
            }))
            this.setState({isAuthor: data});
        } catch (err) {
            console.log(err)
        }
    }

    async deleteArticle(id) {
        try {
            await axios.post('http://localhost:8888/api/article/delete.php', qs.stringify({
                AUTH_TOKEN: window.localStorage.getItem("AUTH_TOKEN"),
                id: id
            })).then(response => {
                if (response.status === 200) {
                    window.location.href = '/';
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const {article, isAdmin} = this.props;
        const {isAuthor} = this.state;
        const {article_data, title, id, username} = article;

        return (
            <div className="column">
                {isAdmin || isAuthor ?
                <span className="icon delete-icon" title="Delete Article" onClick={() => {
                    this.deleteArticle(id)
                }}><i className="fas fa-times"></i></span> : null}
                <div className="box article-thumbnail">
                    <div className="content">
                        <h6><Link to={`/article/${id}`}>{title}</Link></h6>
                        <p><span className="tag is-light">{username}</span></p>
                        {article_data && <p>
                            <small>{article_data}</small>
                        </p>}
                    </div>
                </div>
            </div>
        )
    }

}