import $ from 'jquery';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import base64 from 'crypto-js/enc-base64';
export default class DataEncryption {
    static getParameter(data) {
        let arrayKey = [];
        if (typeof (data) == "object") {
            for (let key in data) {
                arrayKey.push(key);
            }
            let dataString = [];
            arrayKey.sort().map(item => {
                if (data[item] != undefined)
                    dataString.push(item + "=" + data[item]);
            })
            return encodeURIComponent(dataString.join("&"), "utf-8").replace("(", "%28").replace(")", "%29");
        } else if (typeof (data) == "string") {
            return encodeURIComponent(data, "utf-8").replace("(", "%28").replace(")", "%29");
        } else {
            return "";
        }

    }
    static token(data, type) {
        console.log(data)
        let sortData = this.getParameter(data);
        let key = sessionStorage.getItem("accountpass");
        let accountId = sessionStorage.getItem("accountid");
        let validatorData = type + "&" + encodeURIComponent("/") + sortData;
        console.log(validatorData, key)
        if (key == null) {
            return;
        }
        if (typeof (data) == "string") {
            return base64.stringify(HmacSHA1(validatorData, key)) + "_" + accountId + "_false";
        }
        return base64.stringify(HmacSHA1(validatorData, key)) + "_" + accountId + "_true";
    }
}