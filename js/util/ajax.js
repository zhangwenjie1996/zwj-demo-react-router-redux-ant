import $ from 'jquery';
import ArrayFind from './arrayfind';
import DataEncryption from './dataencryption';
export default class Request {

    static sysytem = {
        //     test: 'http://192.168.30.156:8095/',
        //     default: 'http://192.168.30.200:8940/',
        //     zeus: 'http://192.168.30.200:8940/',
        //     device: 'http://192.168.30.200:8091/',
        //     activiti: 'http://192.168.30.200:8095/',
        //     rbac: "http://192.168.30.200:1112/",
        //     process: "http://192.168.30.200:8095/",
        //     purchase: "http://192.168.30.200:8661/",
        //  inventory: 'http://192.168.30.200:8992/',
        //    // activitiClient: 'http://192.168.30.200:8092/',

        //     project: "http://192.168.30.155:1113/",
        //     alteration: "http://192.168.30.157:1116/",
        //     hr: "http://192.168.30.200:1117/",
        //     file: "http://192.168.30.200:1115/",
        //     evaluation: "http://192.168.30.157:1119/",
        //     person: "http://192.168.30.200:1117/",
        //     scoretest:"http://192.168.30.218:8888/"
        default: "http://192.168.30.200:9005/",
        project: 'task/',
        inventory: 'inventory/',
        hr: "pms/",
        zeus: 'rbac/',
        rbac: "pms/",
        evaluation: "examine/",
        activiti: "pms/",
        alteration: "alteration/",
        purchase: "purchase/",
    }


    //根据key数组获取url字符串   
    static url(key, url) {
        if ([...arguments].length == 1) {//url作为默认字段
            url = [...arguments][0];
        }

        if (url.match('^https?://'))//如果是完整url直接返回
            return url;
        else {
            if (key == url)
                return this.sysytem.default + url;
            else
                return this.sysytem.default + this.sysytem[key] + url;
        }
    }

    static token() {
        return 'token';
    }

    static connect(key, options) {
        //处理参数
        if ([...arguments].length > 0) {//url作为默认字段
            key = ArrayFind.find([...arguments], item => { return "string" == typeof (arguments[0]) });
            if (!key)
                key = 'default';
            options = ArrayFind.find([...arguments], item => { return item instanceof Object && !(item instanceof Function) });
        }

        //console.log(options);

        if (!options) {
            console.log('ajax请求参数不正确，请传递正常的请求参数！');
            return;
        }

        if (!options.url) {
            console.log('ajax没有传递需要的请求url！');
            return;
        }
        //DataEncryption.token(options.data, options.type)
        if (!options.type)
            options.type = 'GET';
        let headers = { "token": sessionStorage.getItem("token") }
        options.headers = headers;
        options.url = Request.url(key, options.url);
        let callback = options.success;
        options.success = (result) => {
            if (result.data == "token_error") {
                //  top.location.href = "/webapp/login.html";
                return;
            }
            callback(result);
        }
        //开始请求
        $.ajax(options);
    }
}