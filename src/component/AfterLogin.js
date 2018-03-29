import React from 'react';
import AllItem from '../component/product/allitem';
export default class AfterLogin extends React.Component{
    constructor(){
        super();
        this.state={}
    }
    render(){

        return(
            <div>

            <AllItem/>
            </div>
        )
    }
}
