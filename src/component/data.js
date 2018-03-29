import React, { Component } from 'react';
import { render } from 'react-dom';
import Axios from 'axios';
import LoadingSpinner from './loader';
let baseurl='http://lanetteam.com:3004';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // will hold the results from our ajax call
            loading: false, // will be true when ajax request is running
        }
    }
    componentWillMount(){
        this.setState({ loading: true }, () => {
            Axios.get(baseurl+'/api/product/list')
                .then((result) =>{
                    console.log('Result',result.data.result)
                    this.setState({
                        loading: false,
                        data: result.data.result,
                    })
                });
        });
    }
    render() {
        const { data, loading } = this.state;
        return (
            <div>
                {loading ? <LoadingSpinner /> :
                        this.state.data.map((p,i)=>{
                            return(
                                <div>
                                    <p>{p.productName}</p>
                                    <p>{p.qty}</p>
                                    <p>{p.price}</p>
                                    <p>{p.description}</p>
                                </div>
                            )
                        })
                }
            </div>
        );
    }
}
export default Loading;