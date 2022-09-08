export { Option, Some, None } from "./Option";
export { Result, Ok, Err } from "./Result";

import { Result, Ok, Err } from "./Result";

function div(x: number, y: number): Result<number, string> {
    if (y == 0) {
        return Err("division by 0");
    } else {
        return Ok(x / y);
    }
}

const x = div(2, 0);

x.match({
    Ok(x) {
        console.log(x);
    },
    Err(err) {
        console.log(err);
    }
});

const y = div(8, 2);

const y2 = y.bind(y => div(y, 2));
// y2 :: Result<number, string>

if (y2.Ok()) {
    // y2 :: Ok<number>
    console.log(y2.value);
}
