const jwtToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	if(token){
		jwtToken.verify(token,'secret@graphql123', (err, info) => {
			if(err){
        req.isAuth = false;
        next();			
      }else {
        req.isAuth = true;
				const data=jwtToken.decode(token);
				req.user = data;
				next();
			}
		});
	} else {
    req.isAuth = false;
    next();
	}
};