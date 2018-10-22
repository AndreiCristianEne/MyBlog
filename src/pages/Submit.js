import React, {Component} from 'react';
import Editor from '../components/Editor';
import {convertToRaw} from 'draft-js'
import qs from 'qs';
import axios from 'axios';


export default class Submit extends Component {

    state = {
        title: {
            value: '',
            touched: false,
            valid: false
        },
        description: {
            value: '',
            touched: '',
            valid: false,
        }
    };

    async saveArticle() {
        const {title, description} = this.state;

        const editorState = this.editor.state.editorState;
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        try {
            await axios.post('http://localhost:8888/api/article/add.php', qs.stringify({
                AUTH_TOKEN: this.props.authToken,
                article_data: data,
                title: title.value,
                description: description.value,
            }));
        } catch (err) {
            console.log(err);
        }
    }

    handleChangeTitle(title) {
        this.setState({title: {value: title, touched: true, valid: title !== '' && title !== ' '}});
    }

    handleChangeDescription(description) {
        this.setState({
            description: {
                value: description,
                touched: true,
                valid: description !== '' && description !== ' '
            }
        });
    }

    render() {
        const {title, description} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-3 is-offset-1">
                        <div className="field">
                            <div className="control">
                                <div className="content">
                                    <h6>Welcome {}</h6>
                                    <p>
                                        <small><strong>You are about to submit a public article.</strong></small>
                                    </p>
                                    <p>
                                        <small>Please remember everyone will be able to see this article.</small>
                                        <br/>
                                        <small>In addition, users will be able to submit comments.</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-5 is-offset-1">
                        <div className="field">
                            <div className="control">
                                <input className={`input ${title.touched && !title.valid && 'is-danger'}`}
                                       placeholder="Article Title" value={title.value}
                                       onChange={e => this.handleChangeTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <textarea value={description.value}
                                          className={`textarea ${description.touched && !description.valid && 'is-danger'}`}
                                          onChange={e => this.handleChangeDescription(e.target.value)}
                                          placeholder="Short description"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <Editor ref={editor => this.editor = editor}/>
                        </div>
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <button className="button is-fullwidth" onClick={() => this.saveArticle()} disabled={!title.valid || !description.valid}>SUBMIT
                                </button>
                            </div>
                            <div className="control is-expanded">
                                <button className="button is-fullwidth" disabled={true}>PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}