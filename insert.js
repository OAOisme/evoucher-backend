const mongoose = require('mongoose');
const User = require('./schemas/user');

const user = new User({
    name: 'test',
    password: 'test',
    branch: 'test',
    role: 'admin'

});

mongoose.connect('mongodb+srv://motunrayo:mabel1975@voucher.zbmxmgv.mongodb.net/test', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB')

        user.save()
    })
    .catch(err => console.error('Could not connect to MongoDB', err))




