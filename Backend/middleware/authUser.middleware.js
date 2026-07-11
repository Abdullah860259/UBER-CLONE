const jwt = require('jsonwebtoken');
const userModal = require('../modals/user.modal');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send('unauthorized');
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModal.findById(decoded._id);

        req.user = user;
        
        return next();
    } catch (error) {
        return res.status(401).send('unauthorized');
    }
}