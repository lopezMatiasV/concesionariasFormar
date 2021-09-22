module.exports = function(req,res,next){
    if(req.cookies.concesionarias){
        req.session.user = req.cookies.concesionarias;
        next()
    }else{
        next()
    }
}