import React, {Component} from 'react';
import Editor from '../components/Editor';
import {convertToRaw} from 'draft-js'


export default class Submit extends Component {

    state = {
        title: ''
    };

    async saveArticle() {
        const editorState = this.editor.state.editorState;
        console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }

    render() {
        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="field">
                            <div className="control">
                                <input className="input" placeholder="Article Title"/>
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