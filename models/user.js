const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstName: {type: String, required: [true, "cannot be empty"] },
        lastName: {type: String, required: [true, "cannot be empty"] },
        email: {type: String, required: [true, "cannot be empty"], unique: true },
        password: {type: String, required: [true, "cannot be empty"] },
    }
)

// replace plaintext password with bcrypt hashed password before saving to the db
// pre middleware

userSchema.pre('save', function(next)
{
    let user = this;
    if (!user.isModified('password'))
    {
        return next();
    }
    else
    {
        bcrypt.hash(user.password, 10)
        .then(hash => 
            {
                user.password = hash;
                next();
            })
        .catch(err => next(err))
    }
})

module.exports = mongoose.model('User', userSchema);