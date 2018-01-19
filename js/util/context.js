import React from 'react';

import en_US from 'antd/lib/locale-provider/en_US';//antdesign本模块组件的英文内建文案
import zh_CN from 'antd/lib/locale-provider/zh_CN';//antdesign本模块组件的中文内建文案
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from '../locale/zh';//额外增加的自定义英文文案
import enUS from '../locale/en';//额外增加的自定义中文文案
import { addLocaleData } from 'react-intl';
addLocaleData([...en, ...zh]);

export default class Context extends React.Component {
    constructor() {
        super();
        this.requestSystemLang();
    }

    lang = {
        antd: zh_CN,
        cust: zhCN
    };

    requestSystemLang() {
        switch (navigator.language.split('-')[0]) {
            case 'en':
                this.lang.antd = en_US;
                this.lang.cust = enUS;
                break;
            case 'zh':
                this.lang.antd = zh_CN;
                this.lang.cust = zhCN;
                break;
            default:
                this.lang.antd = zh_CN;
                this.lang.cust = zhCN;
                break;
        }
    }
}