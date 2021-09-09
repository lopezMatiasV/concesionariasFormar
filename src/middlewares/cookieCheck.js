module.exports = function(req,res,next){
    if(req.cookies.userConcesionarias){
        req.session.user = req.cookies.userConcesionarias;
        next()
    }else{
        next()
    }
}