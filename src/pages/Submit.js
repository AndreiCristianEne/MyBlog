import React, {Component} from 'react';
import Editor from '../components/Editor';
import {convertToRaw} from 'draft-js'


export default class Submit extends Component {

    state = {
        title: {
            value: '',
            touched: false,
            valid: false
        }
    };

    async saveArticle() {
        const editorState = this.editor.state.editorState;
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        console.log(data);
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