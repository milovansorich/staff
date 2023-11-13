const repository = require("@mongo/repository.js");

module.exports = {
    findProfessionalExperiences: async function (email) {
        const findQuery = { email: email };
        const result = await repository.find("professional_experiences", findQuery);
        return result;
    },
    insertProfessionalExperiences: async function (professionalExperiences) {
        const result = await repository.insertOne("professional_experiences", professionalExperiences);
        console.log(result);
        return result;
    },
    updateProfessionalExperiences: async function (professionalExperiences) {
        const findQuery = { email: professionalExperiences.email };
        const result = await repository.updateOne("professional_experiences", findQuery, professionalExperiences);
        console.log(result);
        return result;
    }         
};     