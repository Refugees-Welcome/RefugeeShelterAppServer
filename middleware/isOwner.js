const { isAuthenticated } = require("../middleware/jwt.middleware"); 

const checkUser = (req, res ,next) =>{
    console.log(req.payload)
    if(req.payload._id === req.author._id)
    
    next();
}
module.exports = checkUser;