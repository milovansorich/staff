const repository = require("@mongo/repository.js");

module.exports = {
    findProfessionalRoles: async function () {
        const result = await repository.find("professional_roles", {});
        return result;
    },
    insertProfessionalRole: async function (professionalInformation) {
        const result = await repository.insertOne("professional_roles", professionalInformation);
        console.log(result);
        return result;
    }     
};     