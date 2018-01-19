import React from 'react';
import { Button, Icon, Modal } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import  XIntlProvider  from '../intlprovider/intlprovider';
import './button.less';
import $ from 'jquery';
import Request from '../../util/ajax';
import '../../../css/common.less';
export default class XOperateButton extends XIntlProvider {
    constructor(props) {
        super(props);

    }
    selClick = (e) => {
        this.props.callbackParentSel(e);
    }

    addClick = (e) => {
        this.props.callbackParentAdd(e);
    }

    editClick = (e) => {
        this.props.callbackParentEdit(e);
    }
    delClick = (e) => {
        this.props.callbackParentDel(e);
    }
    qrCodeClick = (e) => {
        this.props.callbackParentqrCode(e);
    }
    render() {
        console.log("button this.props.page",this.props.page)// post 
        return (
            <div className='button-group ' >
                <XAuthorize>
                    <Button style={{display:this.props.hideSel==undefined?"inline-block":"none"}} id={this.props.page + "_sel"} type="primary" className='selBtn' onClick={this.selClick} ><Icon type="eye-o" className="iconStyle"/><FormattedMessage id='view' /></Button>               
                    <Button style={{display:this.props.hideAdd==undefined?"inline-block":"none"}} id={this.props.page + "_add"} type="primary" className='addBtn' onClick={this.addClick} ><Icon type="plus"  className="iconStyle"/><FormattedMessage id='add' /></Button>
                    <Button style={{display:this.props.hideDel==undefined?"inline-block":"none"}} id={this.props.page + "_del"} type="primary" className='delBtn' onClick={this.delClick} ><Icon type="delete"  className="iconStyle"/><FormattedMessage id='delete' /></Button>
                    <Button style={{display:this.props.hideEdit==undefined?"inline-block":"none"}} id={this.props.page + "_edit"} type="primary" className='editBtn' onClick={this.editClick} ><Icon type="edit" className="iconStyle" /><FormattedMessage id='edit' /></Button>
                    <Button style={{display:this.props.hideQrcode==undefined?"none":"inline-block"}} id={this.props.page + "_qr"} type="primary" className='qrBtn' onClick={this.qrCodeClick} ><Icon type="qrcode" className="iconStyle" />二维码</Button>
                </XAuthorize>
            </div>
        )
    }
}

// import React from 'react';
// import { Button, Icon, Modal } from 'antd';
// import { XAuthorize } from '../index';
// import { FormattedMessage } from 'react-intl';
// import  XIntlProvider  from '../intlprovider/intlprovider';
// import './button.less';
// import $ from 'jquery';
// import Request from '../../util/ajax';
// import '../../../css/common.less';
// export default class XOperateButton extends XIntlProvider {
//     constructor(props) {
//         super(props);

//     }
//     selClick = (e) => {
//         this.props.callbackParentSel(e);
//     }

//     addClick = (e) => {
//         this.props.callbackParentAdd(e);
//     }

//     editClick = (e) => {
//         this.props.callbackParentEdit(e);
//     }
//     delClick = (e) => {
//         this.props.callbackParentDel(e);
//     }
//     qrCodeClick = (e) => {
//         this.props.callbackParentqrCode(e);
//     }
//     render() {
//         return (
//             <div className='button-group ' >
//                 <XAuthorize>
//                     <Button style={{display:this.props.hideSel==undefined?"inline-block":"none"}} id={this.props.page + "_sel"} type="primary" className='selBtn' onClick={this.selClick} ><Icon type="eye-o" className="iconStyle"/><FormattedMessage id='view' /></Button>               
//                     <Button style={{display:this.props.hideAdd==undefined?"inline-block":"none"}} id={this.props.page + "_add"} type="primary" className='addBtn' onClick={this.addClick} ><Icon type="plus"  className="iconStyle"/><FormattedMessage id='add' /></Button>
//                     <Button style={{display:this.props.hideDel==undefined?"inline-block":"none"}} id={this.props.page + "_del"} type="primary" className='delBtn' onClick={this.delClick} ><Icon type="delete"  className="iconStyle"/><FormattedMessage id='delete' /></Button>
//                     <Button style={{display:this.props.hideEdit==undefined?"inline-block":"none"}} id={this.props.page + "_edit"} type="primary" className='editBtn' onClick={this.editClick} ><Icon type="edit" className="iconStyle" /><FormattedMessage id='edit' /></Button>
//                     <Button style={{display:this.props.hideQrcode==undefined?"none":"inline-block"}} id={this.props.page + "_qr"} type="primary" className='qrBtn' onClick={this.qrCodeClick} ><Icon type="qrcode" className="iconStyle" />二维码</Button>
//                 </XAuthorize>
//             </div>
//         )
//     }
// }
