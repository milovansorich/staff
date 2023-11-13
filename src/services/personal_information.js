const repository = require("@mongo/repository.js");

module.exports = {
    findPersonalInformation: async function (email) {
        const findQuery = { email: email };
        const result = await repository.find("personal_information", findQuery);
        return result;
    },
    insertPersonalInformation: async function (personalInformation) {
        const result = await repository.insertOne("personal_information", personalInformation);
        console.log(result);
        return result;
    },
    updatePersonalInformation: async function (personalInformation) {
        const findQuery = { email: personalInformation.email };
        const result = await repository.updateOne("personal_information", findQuery, personalInformation);
        console.log(result);
        return result;
    }         
};     