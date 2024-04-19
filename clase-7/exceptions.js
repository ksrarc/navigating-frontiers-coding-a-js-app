const msg = {
    beginTry: 'begin try',
    afterTry: 'after try',
    beginCatch: 'begin catch',
    afterCatch: 'after catch',
    beginFinally: 'begin finally',
    afterFinally: 'after finally',

    innerFnBegin: 'inner fn begin',
    inenrFnError: 'inner fn error',
    innerFnEnd: 'inner fn end',
    innerFnSuccess: 'inner fn success',

    middleFnBegin: 'middle fn begin',
    middleCallBegin: 'middle call begin',
    middleCallEnd: 'middle call end',
    middleCallError: 'middle call error',
    middleError: 'middle error',
    middleEnd: 'middle end',
    middleSuccess: 'middle success',
}

/// --------- BEGIN NO EXCEPTIONS CODE ----

// error is null
function innerfn(param) {
    console.info(msg.innerFnBegin);
    if (param < 10) {
        console.info(msg.innerFnError);
        console.info(msg.innerFnEnd);
        return {
            cause: 'invalid input',
        }
    }
    console.info(msg.innerFnSuccess);
    console.info(msg.innerFnEnd);
    return param * 2;
}

function middlefn(param) {
    console.info(msg.middleFnBegin);
    console.info(msg.middleCallBegin);
    const result = innerfn(param);
    console.info(msg.middleCallEnd);
    if (result.cause) {
        console.info(msg.middleError);
        console.info(msg.middleEnd);
        return {
            error: 'something failed: ' + result.cause,
        }
    }
    console.info(msg.middleSuccess);
        console.info(msg.middleEnd);
    return {
        result,
    }
}

global.normal = function(param) {
    const result = middlefn(param);
    if (result.error) {
        console.info(result.error);
    } else {
        console.info(result.result);
    }
}

/// --------- END NO EXCEPTIONS CODE ----

/// --------- BEGIN EXCEPTIONS CODE ----
function innerfn_e(param) {
    try {
        console.info(msg.innerFnBegin);
        if (param < 10) {
            console.info(msg.innerFnError);
            throw 'invalid input';
        }
        console.info(msg.innerFnSuccess);
        return param * 2;
    } finally {
        console.info(msg.innerFnEnd);
    }
}

function middlefn_e(param) {
    try {
        console.info(msg.middleFnBegin);
        console.info(msg.middleCallBegin);
        const result = innerfn_e(param);
        console.info(msg.middleCallEnd);
        return  {
            result,
        };
    } catch(error) {
        console.info(msg.middleCallEnd);
        console.info(msg.middleCallError);
        throw {
            error: 'something failed: ' + error,
        }
    } finally {
        console.info(msg.middleEnd);
    }
}

function middlefn_e2(param) {
    try {
        console.info(msg.middleFnBegin);
        console.info(msg.middleCallBegin);
        const result = innerfn_e(param);
        console.info(msg.middleCallEnd);
        return  {
            result,
        };
    } catch (err) {
            console.info(msg.middleCallEnd);
            console.info(msg.middleCallError);
            throw err;
    } finally {
        console.info(msg.middleEnd);
    }
}

const exceptionBase = function(func) {
    return (param) => {
        try {
            console.info(msg.beginTry);
            const result = func(param);
            console.info(result.result);
            console.info(msg.afterTry);
        } catch (error){
            console.info(msg.beginCatch);
            console.info(error.error || error);
            console.info(msg.afterCatch);
        } finally {
            console.info(msg.beginFinally);
            console.info('finally');
            console.info(msg.afterFinally);   
        }
    }
}

global.exceptions1 = exceptionBase(middlefn_e);

global.exceptions2 = exceptionBase(middlefn_e2);

/// --------- END EXCEPTIONS CODE ----