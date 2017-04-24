function validTest(pass) {
    let valid = new RegExp('^[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}$');

    if (valid.test(pass)) {
        return 'pass';
    } else {
        return 'fail';
    }
};


module.exports = {
    credit: validTest,
};

