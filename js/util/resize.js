import $ from 'jquery';
export default class Resize {
    setSideHight() {
        var winH = $(window).height(),
            headH = $(".north").outerHeight();
        var curH = winH - headH;
        return curH;
    }

    setIframeHight() {
        var winH = $(window).height(),
            headH = $(".north").outerHeight(),
            tabH = $(".ant-tabs-bar").outerHeight() ;
        var curH = winH - headH - tabH-30;
        return curH;
    };

    setIframeWidth() {
        var winW = $(window).width(),
            sideW = $(".side").outerWidth() ;
        var curW = winW - sideW ;
        return curW;
    }

    // $(window).resize(function(){
    //     setSideHight(element);
    //     setIframeWidth(element);
    //     setIframeHight(element);});

}