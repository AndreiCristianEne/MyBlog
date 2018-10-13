import React, {Component} from 'react';
import sanitizeHtml from 'sanitize-html';
import draftToHtml from "draftjs-to-html";
import axios from 'axios';

export default class Article extends Component {

    state = {
        loading: true,
        article: null
    };

    getArticleData(data) {
        return sanitizeHtml(draftToHtml(data));
    }

    async componentWillMount() {
        const {id} = this.props.match.params;
        try {
            const {data} = await axios.get(`http://localhost:8888/api/article/get_one.php?id=${id}`);
            this.setState({article: data, loading: false})
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {loading, article} = this.state;
        const {isLoggedIn} = this.props;

        return (
            <div className="section">
                {loading && <p>loading</p>}
                {
                    !loading &&
                    <div className="columns">
                        <div className="column is-6">
                            <div className="content">
                                <h2>{article.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{__html: this.getArticleData(JSON.parse(article.article_data))}}/>
                            </div>
                        </div>
                        <div className="column is-4 is-offset-2">
                            <div className="content">
                                <h5>{article.title}</h5>
                                <p>By: author_name</p>
                            </div>
                            <hr/>
                            <div className="field">
                                <span><small>Comment below</small></span>
                                <div className="control">
                                    <textarea className={`textarea ${!isLoggedIn && 'is-small'}`} disabled={!isLoggedIn}>
                                        {!isLoggedIn ? 'You need to be logged in to be able to leave comments.' : ''}
                            </textarea>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </div>
        )
    }

}