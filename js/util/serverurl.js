export default class ServerUrl {
    constructor() {
        this.sysytem = {
            test: 'http://localhost:8080/web/',
            device: 'http://localhost:8090/webapp/',
        }
    }

    //根据key数组获取url字符串
    url(key, url) {
        if ([...arguments].length == 1) {//url作为默认字段
            url = [...arguments][0];
        }

        if (url.match('^https?://'))//如果是完整url直接返回
            return url;
        else {
            if (key == url)
                return this.sysytem.device + url;
            else
                return this.sysytem[key] + url;
        }
    }
}