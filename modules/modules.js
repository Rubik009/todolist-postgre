const User = require('./user.modules');
const todo = require('./todo.modules');

User.hasMany(todo, {foreignKey: 'person_id'});

const modules = {
    User,
    todo,
};

//User.sync({force: true}).then(result =>console.log(result));

//todo.sync({force: true}).then(result => console.log(result));

module.exports = modules;

