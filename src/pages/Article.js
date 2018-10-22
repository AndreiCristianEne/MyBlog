import React, {Component} from 'react';
import sanitizeHtml from 'sanitize-html';
import draftToHtml from "draftjs-to-html";
import axios from 'axios';
import qs from 'qs';

export default class Article extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            article: null,
            comment: {
                touched: false,
                value: props.isLoggedIn ? '' : 'You cannot comment if you are not logged in'
            }
        };
    }


    getArticleData(data) {
        return sanitizeHtml(draftToHtml(data));
    }

    async submitComment() {
        const {comment, article} = this.state;
        const {value} = comment;

        const data = qs.stringify({
            COMMENT_DATA: value,
            AUTH_TOKEN: this.props.authToken,
            ARTICLE_ID: article.id
        });
        try {
            await axios.post('http://localhost:8888/api/article/comment.php', data);
        } catch (err) {
            console.log(err);
        }
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
        const {loading, article, comment} = this.state;
        const {isLoggedIn} = this.props;

        return (
            <div className="section">
                {loading && <p>loading</p>}
                {
                    !loading &&
                    <div className="columns">
                        <div className="column is-5 is-offset-1">
                            <div className="content">
                                <h2>{article.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{__html: this.getArticleData(JSON.parse(article.article_data))}}/>
                            </div>
                        </div>
                        <div className="column is-4 is-offset-1">
                            <div className="media">
                                <div className="media-left">
                                    <div className="image is-64x64">
                                        <img src={`http://localhost:8888/api/public/images/${article.avatar_path}`}/>
                                    </div>
                                </div>
                                <div className="media-content">
                                    <span><strong>{article.title}</strong></span>
                                    <br/>
                                    <span className="tag is-light">{article.username}</span>
                                </div>
                            </div>
                            <br/>
                            <hr/>
                            <div className="field">
                                <span><small>Comment below</small></span>
                                <div className="control">
                                    <textarea className={`textarea ${!isLoggedIn && 'is-small'}`} disabled={!isLoggedIn}
                                              value={comment.value} onChange={e => this.setState({
                                        comment: {
                                            touched: true,
                                            value: e.target.value
                                        }
                                    })}>
                                    </textarea>
                                </div>
                            </div>
                            {
                                isLoggedIn && <div className="field">
                                    <div className="control">
                                        <a className={`${!comment.touched ? 'disabled-link' : null}`}
                                           onClick={() => this.submitComment()}>Submit comment</a>
                                    </div>
                                </div>
                            }
                            {
                                article.comments.length > 0 && <hr/>
                            }
                            {
                                article.comments.map((comment, key) => {
                                    return (
                                        <div key={key} className="field">
                                            <span><small>{comment.username}</small></span>
                                            <div className="control">
                                                <div className="content">
                                                    <p>
                                                        {comment.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }

}