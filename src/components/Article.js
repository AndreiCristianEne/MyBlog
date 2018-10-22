import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class Article extends Component {
    render () {
        const {article} = this.props;
        const {article_data, title, id, username} = article;

        return (
            <div className="box article-thumbnail">
                <div className="content">
                    <h6><Link to={`/article/${id}`}>{title}</Link></h6>
                    <p><span className="tag is-light">{username}</span></p>
                    {article_data &&  <p><small>{article_data}</small></p>}
                </div>
            </div>
        )
    }

}