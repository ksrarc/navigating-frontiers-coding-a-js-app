const fnMsgs = {
    begins: 'fn begins',
    beforeNotifyErrorPrepare: 'fn before notify error prepare',
    beforeNotifyError: 'fn before notify error',
    error: 'fn error!',
    afterNotifyErrorPrepare: 'fn after notify error',
    afterNotifyError: 'fn after notify error prepare',
    beforeNotifySuccessPrepare: 'fn before notify success prepare',
    beforeNotifySuccess: 'fn before notify success',
    success: 'fs success',
    afterNotifySuccessPrepare: 'fn after notify success',
    afterNotifySuccess: 'fn after notify success prepare',
    ends: 'fn ends',
};

const exampleMsgs = {
    begins: 'example begins',
    beforeCall:'example before call',
    fnResult: 'example in result',
    fnResultError: 'example in result error',
    fnResultSuccess: 'example in result success',
    fnResultPrint: 'example in result printed!',
    afterCall:'example after call',
    ends: 'example ends',
};

//------- BEGIN Traditional Sync Code with Callbacks
function syncfn(timeoutOrOther, callback) {
    console.info(fnMsgs.begins);
    const timeout = Math.trunc(parseInt(timeoutOrOther));
    if (isNaN(timeout)) {
        console.info(fnMsgs.beforeNotifyErrorPrepare);
        console.info(fnMsgs.beforeNotifyError);
        callback(`${fnMsgs.error}: ${timeoutOrOther}`);
        console.info(fnMsgs.afterNotifyError);
        console.info(fnMsgs.afterNotifyErrorPrepare);
    } else {
        console.info(fnMsgs.beforeNotifySuccessPrepare);
        console.info(fnMsgs.beforeNotifySuccess);
        callback(undefined, `${fnMsgs.success}: ${timeout}`);
        console.info(fnMsgs.afterNotifySuccess);
        console.info(fnMsgs.afterNotifySuccessPrepare);
    }
    console.info(fnMsgs.ends);
}

const baseExample = function(value, processFn) {
    console.info(exampleMsgs.begins);
    console.info(exampleMsgs.beforeCall);
    processFn(value, (err, result) => {
        console.info(exampleMsgs.fnResult);
        if (err) {
            console.info(exampleMsgs.fnResultError);
            console.warn(`${exampleMsgs.fnResultPrint}: ${err}`);
        } else {
            console.info(exampleMsgs.fnResultSuccess);
            console.warn(`${exampleMsgs.fnResultPrint}: ${result}`);
        }
    });
    console.info(exampleMsgs.afterCall);
    console.info(exampleMsgs.ends);
}

global.syncExample = function asyncode0(value) {
    return baseExample(value, syncfn);
}
//------- END Traditional Sync Code with Callbacks

//------- BEGIN Traditional Async Code with Callbacks

/**
 * @param {*} timeoutOrOther 
 * @param {*} callback function(error, result)
 */
function asyncfn(timeoutOrOther, callback) {
    console.info(fnMsgs.begins);
    const timeout = Math.trunc(parseInt(timeoutOrOther));
    if (isNaN(timeout)) {
        console.info(fnMsgs.beforeNotifyErrorPrepare);
        setTimeout(() => {
            console.info(fnMsgs.beforeNotifyError);
            callback(`${fnMsgs.error}: ${timeoutOrOther}`);
            console.info(fnMsgs.afterNotifyError);
        }, 500);
        console.info(fnMsgs.afterNotifyErrorPrepare);
    } else {
        console.info(fnMsgs.beforeNotifySuccessPrepare);
        setTimeout(() => {
            console.info(fnMsgs.beforeNotifySuccess);
            callback(`${fnMsgs.success}: ${timeout}`);
            console.info(fnMsgs.afterNotifySuccess);
        }, timeout);
        console.info(fnMsgs.afterNotifySuccessPrepare);
    }
    console.info(fnMsgs.ends);
}

global.callbackExample = function asyncode1(value) {
    return baseExample(value, asyncfn);
}

//------- BEGIN Traditional Async Code with Callbacks

//------- BEGIN promise Code with Promises

function promisefn(timeoutOrOther) {
    console.info(fnMsgs.begins);
    const promise = new Promise((accept, reject) => {
        const timeout = Math.trunc(parseInt(timeoutOrOther));
        if (isNaN(timeout)) {
            console.info(fnMsgs.beforeNotifyErrorPrepare);
            setTimeout(() => {
                console.info(fnMsgs.beforeNotifyError);
                reject(`${fnMsgs.error}: ${timeoutOrOther}`);
                console.info(fnMsgs.afterNotifyError);
            }, 500);
            console.info(fnMsgs.afterNotifyErrorPrepare);
        } else {
            console.info(fnMsgs.beforeNotifySuccessPrepare);
            setTimeout(() => {
                console.info(fnMsgs.beforeNotifySuccess);
                accept(`${fnMsgs.success}: ${timeout}`);
                console.info(fnMsgs.afterNotifySuccess);
            }, timeout);
            console.info(fnMsgs.afterNotifySuccessPrepare);
        }
    });
    console.info(fnMsgs.ends);
    return promise;
}

global.promiseExample = function (value) {
    console.info(exampleMsgs.begins);
    console.info(exampleMsgs.beforeCall);
    promisefn(value).then(
        // first param is success
        (result) => {
            console.info(exampleMsgs.fnResult);
            console.info(exampleMsgs.fnResultSuccess);
            console.warn(`${exampleMsgs.fnResultPrint}: ${result}`);
        },
        // second param is error
        (err) => {
            console.info(exampleMsgs.fnResult);
            console.info(exampleMsgs.fnResultError);
            console.warn(`${exampleMsgs.fnResultPrint}: ${err}`);
        }
    );
    console.info(exampleMsgs.afterCall);
    console.info(exampleMsgs.ends);
}

//------- BEGIN promise Code with Promises

//------- BEGIN async/await Code with Promises

global.awaitExample = async function (value) {
    console.info(exampleMsgs.begins);
    console.info(exampleMsgs.beforeCall);
    try {
        const result = await promisefn(value);
        console.info(exampleMsgs.afterCall);
        console.info(exampleMsgs.fnResult);
        console.info(exampleMsgs.fnResultSuccess);
        console.warn(`${exampleMsgs.fnResultPrint}: ${result}`);
    } catch (err) {
        console.info(exampleMsgs.afterCall);
        console.info(exampleMsgs.fnResult);
        console.info(exampleMsgs.fnResultError);
        console.warn(`${exampleMsgs.fnResultPrint}: ${err}`);    
    }
    console.info(exampleMsgs.ends);
}

//------- BEGIN async/await Code with Promises