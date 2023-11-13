const repository = require("@mongo/repository.js");

module.exports = {
    findUser: async function (email) {
        const findQuery = { email: email };
        const result = await repository.find("users", findQuery);
        return result;
    },
    authenticate: async function(email, password, role) {
        const findQuery = { email: email, password: password, type: role };
        const result = await repository.find("users", findQuery);
        return result.length>0;
    },
    insertUser: async function (user) {
        const result = await repository.insertOne("users", user);
        console.log(result);
        return result;
    },
    updateUser: async function (user) {
        const findQuery = { email: user.email };
        const result = await repository.updateOne("users", findQuery, user);
        console.log(result);
        return result;
    }     
};     