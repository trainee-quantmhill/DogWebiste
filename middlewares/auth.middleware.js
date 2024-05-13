import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization; // fetch token in the form of (Bearer+token)
  
    // validation
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next('Authentication Failed'); // Use return to exit the function and prevent further execution
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET); // decrypt the token using process.env.JWT_SECRET and token will be compared
        req.user = { userId: payload.userId };  //save document id the user
        next();
    } catch (error) {
        return next('Authentication Failed');
    }
}

export default userAuth; // Export the middleware for use in other files
