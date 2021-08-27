

const newStackPrinter = () => {

    var depth = 0;
    return {
        down: () => depth += 1,
        up: () => depth = depth > 0 ? depth - 1 : 0,
        log: (s) => {
            console.log( ' '.repeat(depth) + s );
        }
    };
};


module.exports = { newStackPrinter };
