import React , {Component} from 'react';
import Axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import {Button, Tooltip, Input, Layout, Row, Col, Table, Image} from 'antd';
import './App.css';

const { Header, Footer, Content } = Layout;
const columns = [
    {
        title: 'Title',
        dataIndex: 'Title',
        key: 'Title'
    },
    {
        title: 'Poster',
        dataIndex: 'Poster',
        key: 'Poster',
        render: text => <Image width={200} src = {text} fallback="data:image/png;base64,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"
        > <Image />
);

export default App;></Image>,
    }
];



export default class App extends Component{
    constructor() {
        super();
        this.state = {
            resultCount : 0,
            hideResultCount: 'none',
            hideNoResult: 'none',
            searchInput: "Type Your Keyword Here",
            currentPage: 1,
            allPage: 1,
            content: [],
        }
    }



    updateResultCount = (numberOfResult, noResult, content = undefined) => {
        if (noResult) {
            this.setState({
                hideResultCount: 'none',
                hideNoResult: true
            });

        } else {
            this.setState({
                resultCount: numberOfResult,
                hideResultCount: true,
                hideNoResult: 'None',
                currentPage: 1,
                allPage: Math.ceil(numberOfResult/10),
                content: content
            });
        }

    }

    handleInput = (event) => {
        this.setState(
            {
                searchInput: event.target.value
            }
        )
    }

    extendContent = (Content) => {
        this.setState({
            content : this.state.content.concat(Content)
        })

    }

    removeContent = () => {
        this.setState( {
            content: []
        })
    }

    search = () => {
        const apiKey = "901c88b8";
        const keyWord = this.state.searchInput;
        var config = {
            method: 'get',
            url: 'http://www.omdbapi.com',
            params: {
                'apikey': apiKey,
                's': keyWord,
                'page': 1,
            },
            headers: { }
        };
        Axios(config)
            .then(async response => {
                let searchResult = response.data;
                let numberOfResult = searchResult['totalResults'];
                let numberOfPage = Math.ceil(numberOfResult / 10);
                let Content = searchResult['Search'];
                if (numberOfResult >= 0) {
                    this.updateResultCount(numberOfResult, false, Content);
                } else {
                    this.updateResultCount(0, true)
                    this.removeContent()
                }
                while (numberOfPage >= config.params.page) {
                    config.params.page ++
                    await Axios(config).then(
                        res => {
                            let sr = res.data;
                            let ct = sr['Search'];
                            this.extendContent(ct);
                        }
                    )
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render(){
        return(
            <Layout>
                <Header>
                    <Row>
                        <Col span = {4} className="IconTopic">OMDb API</Col>
                        <Col span = {16}>
                            <Input type="text" value={this.state.searchInput} onChange = {this.handleInput}/>
                        </Col>
                        <Col span = {4}>
                            <Tooltip title="search">
                                <Button type="primary" icon={<SearchOutlined />} onClick={this.search.bind(this)}>
                                    Search
                                </Button>
                            </Tooltip>
                        </Col>


                    </Row>

                </Header>

                <Content>
                    <Table columns={columns} dataSource={this.state.content} />
                </Content>

                <Footer>
                    <Row>
                        <Col span={8}>
                            API powered by OMDb API, author: Brian Fritz
                        </Col>
                        <Col span={12}>
                            <label  style={{display:this.state.hideResultCount}}>
                                Total Result: {this.state.resultCount}
                            </label>
                            <label  style={{display:this.state.hideNoResult}}>
                                No Result Found or Too Many Results
                            </label>
                        </Col>
                        <Col span={4}>
                            Written by XinRan
                        </Col>
                    </Row>

                </Footer>
            </Layout>
        )
    }

}

