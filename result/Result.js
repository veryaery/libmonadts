"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.Err = exports.Ok = void 0;
const Option_1 = require("./Option");
var OkDistinctor;
(function (OkDistinctor) {
    OkDistinctor[OkDistinctor["_"] = 0] = "_";
})(OkDistinctor || (OkDistinctor = {}));
var ErrDistinctor;
(function (ErrDistinctor) {
    ErrDistinctor[ErrDistinctor["_"] = 0] = "_";
})(ErrDistinctor || (ErrDistinctor = {}));
const result_impl_constructor = class Result {
    match(block) {
        if ("_" in block) {
            if (block.Ok !== undefined && this.Ok()) {
                return block.Ok(this.value);
            }
            else if (block.Err !== undefined && this.Err()) {
                return block.Err(this.value);
            }
            else {
                return block._();
            }
        }
        else {
            if (this.Ok()) {
                return block.Ok(this.value);
            }
            else {
                return block.Err(this.value);
            }
        }
    }
    bind(f) {
        if (this.Ok()) {
            return f(this.value);
        }
        else {
            return this;
        }
    }
    bind_err(f) {
        if (this.Err()) {
            return f(this.value);
        }
        else {
            return this;
        }
    }
    ok() {
        if (this.Ok()) {
            return (0, Option_1.Some)(this.value);
        }
        else {
            return Option_1.None;
        }
    }
    err() {
        if (this.Err()) {
            return (0, Option_1.Some)(this.value);
        }
        else {
            return Option_1.None;
        }
    }
};
const ok_impl_constructor = class Ok extends result_impl_constructor {
    Ok() {
        return true;
    }
    Err() {
        return false;
    }
};
const err_impl_constructor = class Err extends result_impl_constructor {
    Ok() {
        return false;
    }
    Err() {
        return true;
    }
};
const ok_impl = new ok_impl_constructor();
const err_impl = new err_impl_constructor();
function Ok(value) {
    const ok = Object.create(ok_impl);
    ok.value = value;
    return ok;
}
exports.Ok = Ok;
function Err(value) {
    const err = Object.create(err_impl);
    err.value = value;
    return err;
}
exports.Err = Err;
exports.Result = (function (f) {
    try {
        return Ok(f());
    }
    catch (err) {
        return Err(err);
    }
});
exports.Result.try = function (f) {
    return (0, exports.Result)(f);
};
exports.Result.from_promise = async function (promise) {
    return promise.then(Ok).catch(Err);
};
