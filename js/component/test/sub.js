import React from 'react';
import Base from './base';
export default class XSub extends Base{
    constructor(){
        super();
        setTop();
        this.state.bottom=<div>hello world</div>;
    }  

    setTop(){
        this.state.top=<div>hello world</div>;
    }
}