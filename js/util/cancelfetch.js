export default class MakeCancelablePromise {
    //服务地址
    static nodeserver =" http://192.168.30.218:8099/" ;//本地服务器
    // 设备手册
    static makeCancelable(promise) {
        console.log('promise', promise)
        let hasCanceled_ = false;
        const wrappedPromise = new Promise((resolve, reject) => {
              promise.then((val) =>
                    hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)
                );
                promise.catch((error) =>
                    hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
                );

        });
        return {
            promise: wrappedPromise,
            cancel() {
                hasCanceled_ = true;
            },
        };
    }
   
}
