import React from 'react';
export default class Base extends React.Component{
    constructor(){
        super();
        this.state={
            treeData: [],
            message:"hello world"
        }
    }
}