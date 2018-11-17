import React, {Component} from 'react';
import Article from '../components/Article';
import Menu from '../components/Menu';
import axios from 'axios';

export default class Index extends Component {

    state = {
        loading: true,
        articles: []
    };

    async componentWillMount() {
        try {
            const {data} = await axios.get('http://localhost:8888/api/article/get.php');
            this.setState({loading: false, articles: data});
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {loading, articles} = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column">
                        <Menu/>
                    </div>
                    <div className="column">
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