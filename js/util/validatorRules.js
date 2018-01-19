export default class XValidator {
    //验证手机号(字段上验证不为空)
    static checkCellphone = (rule, value, callback, msg1, msg2) => {
        if (value == "") {
            callback(); //不需要重复显示错误信息 
            return;
        }
        if (isNaN(value)) {
            callback(msg1);
            return;
        }
        if (!(/^1[34578]\d{9}$/.test(value))) {
            callback(msg2);
        } else {
            callback();
        }
    }
    //验证手机号(字段可以为空)
    static checkCellphone2 = (rule, value, callback, msg1, msg2) => {
        if (value == undefined || value == "" || (/^1[34578]\d{9}$/.test(value))) {
            callback();
        } else if (isNaN(value)) {
            callback(msg1);
        } else {
            callback(msg2);
        }
    }
    //验证电话(字段可以为空)
    static checkPhone(rule, value, callback, msg1, msg2) {// 02989678652
        if (value == undefined || value == "" || (/^0\d{2,3}-?\d{7,8}$/.test(value))) {
            callback();
        } else if (isNaN(value)) {
            callback(msg1);
        } else {
            callback(msg2);
        }
    }
    //验证电话或者手机(字段可以不为空)
    //msg1 不是数字
    //msg2 格式错误
    static checkPhoneAndCell(rule, value, callback, msg1, msg2) {// 02989678652
        if (value == "") {
            callback();  //不重复提示不为空
            return;
        }
        if (isNaN(value)) {
            callback(msg1);
            return;
        }
        if (/^1[34578]\d{9}$/.test(value) || /^0\d{2,3}-?\d{7,8}$/.test(value)) {
            callback();
        } else {
            callback(msg2);
        }
    }
    //验证身份证(字段可以为空)
    static checkIdentitycard(rule, value, callback, msg1, msg2) {
        if (value == undefined || value == "" || (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
            callback();
        } else if (isNaN(value)) {
            callback(msg1);
        } else {
            callback(msg2);
        }
    }
    //验证身份证(字段不为空)
    static checkIdentitycard2(rule, value, callback, msg1, msg2) {
        if (value == "") {
            callback(); //不需要重复显示错误信息 
            return;
        }
        if (isNaN(value)) {
            callback(msg1);
            return;
        }
        if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
            callback(msg2);
        } else {
            callback();
        }
    }
    //验证银行卡号
    static checkBackNumber(rules, value, callBack, msg1, msg2) {
        let flag = false;
        console.log(value)//6228510900156408
        if (value == undefined || value == "") {
            callBack();
            return;
        }
        if (isNaN(value)) {
            callBack(msg1);
            return;
        }
        let bankno = value;
        var lastNum = bankno.substr(bankno.length - 1, 1);
        var first15Num = bankno.substr(0, bankno.length - 1);
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array();
        var arrJiShu2 = new Array();
        var arrOuShu = new Array();
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {
                if (parseInt(newArr[j]) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j]) * 2);
                else
                    arrJiShu2.push(parseInt(newArr[j]) * 2);
            }
            else
                arrOuShu.push(newArr[j]);
        }
        var jishu_child1 = new Array();
        var jishu_child2 = new Array();
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }
        var sumJiShu = 0;
        var sumOuShu = 0;
        var sumJiShuChild1 = 0;
        var sumJiShuChild2 = 0;
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }
        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }
        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;
        if (lastNum == luhm) {
            callBack();
        } else {
            callBack(msg2);
        }
    }
    //验证是不是数字(字段可以不为空)
    static checkNumber(rules, value, callBack, msg1) {
        if (value == "") {
            callBack();
            return
        }
        //大于0的正整数
        if (isNaN(value) || !/^[0-9]*[1-9][0-9]*$/.test(value)) {
            callBack(msg1);
        } else {
            callBack();
        }
    }
    //验证是不是数字(字段可以不为空)
    static checkNumber(rules, value, callBack, msg1) {
        if (value == "") {
            callBack();
            return
        }
        //大于0的正整数
        if (isNaN(value) || !/^[0-9]*[1-9][0-9]*$/.test(value)) {
            callBack(msg1);
        } else {
            callBack();
        }
    }

    //验证是不是时间(字段可以不为空)
    static checkTime(rules, value, callBack, msg1) {
        if (value == "") {
            callBack();
            return
        }
        //大于0的正整数
        console.log(value);
        if (!/^([01]\d|2[01234]):([0-5]\d|59)$/.test(value+"")) {
            console.log("哈哈",value+"");
            callBack(msg1);
        } else {
            callBack();
        }
    }

    //验证是不是数字(字段不可以为空)
    static checkNumber2(rules, value, callBack, msg1) {
        if (value == "" || value == null) {
            callBack();
            return
        }
        //大于0的正整数
        if (isNaN(value) || !/^[0-9]*[1-9][0-9]*$/.test(value)) {
            callBack(msg1);
        } else {
            callBack();
        }
    }
}