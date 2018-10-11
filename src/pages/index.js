import React, { Component } from 'react';
import Article from '../components/Article'
import axios from 'axios'

export default class Index extends Component {

    state = {
        loading: true,
        articles: []
    };

    async componentWillMount () {
        try {
            const {data} = await axios.get('http://localhost:8888/api/article/get.php');
            this.setState({loading: false, articles: data});
        } catch (err) {
            console.log(err)
        }
    }

    render () {
        const {loading, articles} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
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