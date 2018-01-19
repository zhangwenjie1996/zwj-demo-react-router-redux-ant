import $ from 'jquery';
export default class Ajax {
    static ajax(async, url, param, type) {
        return $.ajax({
            async: async || false,
            url: url,
            data: param || {},
            type: type || 'GET'
        });
    }
}
