const mongoose = require('mongoose');
const User = require('./schemas/user');

const user = new User({
    name: 'test',
    password: 'test',
    branch: 'test',
    role: 'admin'

});

mongoose.connect('MONGO URI', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB')

        user.save()
    })
    .catch(err => console.error('Could not connect to MongoDB', err))




