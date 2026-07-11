const userModal = require('../modals/user.modal');

module.exports.createUser = async(
    {firstname, lastname, email, password}
) => {
    
    if (!firstname || !email || !password) {
        console.log(firstname,lastname,email,password);
        throw new Error('All fields are required');
    }

    const User = userModal.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return User;

};