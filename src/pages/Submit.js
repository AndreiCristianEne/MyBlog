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
        }
    };

    async saveArticle() {
        const {title} = this.state;

        const editorState = this.editor.state.editorState;
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        try {
            await axios.post('http://localhost:8888/api/article/add.php', qs.stringify({
                AUTH_TOKEN: this.props.authToken,
                article_data: data,
                title: title.value
            }));
        } catch (err) {
            console.log(err);
        }
    }

    handleChangeTitle(title) {
        this.setState({title: {value: title, touched: true, valid: title !== '' && title !== ' '}});
    }

    render() {
        const {title} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="field">
                            <div className="control">
                                <input className={`input ${title.touched && !title.valid && 'is-danger'}`}
                                       placeholder="Article Title" value={title.value}
                                       onChange={e => this.handleChangeTitle(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-6 is-offset-3">
                        <Editor ref={editor => this.editor = editor}/>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-6 is-offset-3">
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <button className="button is-fullwidth" onClick={() => this.saveArticle()}>SUBMIT
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