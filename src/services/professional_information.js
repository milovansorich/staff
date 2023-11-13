const repository = require("@mongo/repository.js");

module.exports = {
    findProfessionalInformation: async function (email) {
        const findQuery = { email: email };
        const result = await repository.find("professional_information", findQuery);
        return result;
    },
    insertProfessionalInformation: async function (professionalInformation) {
        const result = await repository.insertOne("professional_information", professionalInformation);
        return result;
    },
    updateProfessionalInformation: async function (professionalInformation) {
        const findQuery = { email: professionalInformation.email };
        const result = await repository.updateOne("professional_information", findQuery, professionalInformation);
        console.log(result);
        return result;
    }       
};     