import React from 'react';
import { Button, Icon } from 'antd';
import './button.less'
export default class XMoveButton extends React.Component {
    constructor(props) {
        super(props);

    }

    topClick() {
        this.props.moveTop();
    }

    upClick() {
        this.props.moveUp();
    }

    downClick() {
        this.props.moveDown();
    }

    bottomClick() {
        this.props.moveBottom();
    }

    render() {
        return (
            <div className='button-group'>
                <Button type="primary" className='addBtn' onClick={() => this.topClick()}><Icon type="arrow-up" />置上</Button>
                <Button type="ghost" className='delBtn' onClick={() => this.upClick()}><Icon type="up" />上移</Button>
                <Button type="ghost" className='editBtn' onClick={() => this.downClick()}><Icon type="down" />下移</Button>
                <Button type="ghost" className='editBtn' onClick={() => this.bottomClick()}><Icon type="arrow-down" />置下</Button>
            </div>
        )
    }
}
