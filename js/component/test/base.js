import React from 'react';
export default class Base extends React.Component{
    constructor(){
        super();
        this.state={
            top:{},
            bottom:{}
        }
    }

    render(){
        return(
            <div>
                <div style={{color:"red"}}>{this.state.top}</div>
                <div>{this.state.bottom}</div>
            </div>
        );
    }
}