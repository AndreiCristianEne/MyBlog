import React, {Component} from 'react';
import draftToHtml from 'draftjs-to-html';
import sanitizeHtml from 'sanitize-html';
import {Link} from 'react-router-dom'

export default class Article extends Component {

    getArticleData (data) {
        return sanitizeHtml(draftToHtml(data));
    }

    render () {
        const {article} = this.props;
        const {article_data, title, id} = article;

        return (
            <div className="box">
                <div className="content">
                    <h4><Link to={`/article/${id}`}>{title}</Link></h4>
                    <div dangerouslySetInnerHTML={{__html: this.getArticleData(JSON.parse(article_data))}}></div>
                </div>
            </div>
        )
    }

}