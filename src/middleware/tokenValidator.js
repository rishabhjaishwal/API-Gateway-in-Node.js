
function tokenValidator(req,res,next) {
    try {
        // put your middleware logic here

        next();
    } catch (error) {
        // call next callback with error when error occured
        // otherwise, call next with empty param after your operation
        next(error);
    }
}

module.exports = tokenValidator;