const repository = require("@mongo/repository.js");

module.exports = {
    findJobPostingAssigned: async function (user) {
        const findQuery = { assigned: user };
        const result = await repository.find("job_postings", findQuery);
        return result;
    },
    findJobPostingByState: async function (state) {
        const findQuery = { state: state };
        const result = await repository.find("job_postings", findQuery);
        return result;
    },
    findJobPosting: async function (code) {
        const findQuery = { code: code };
        const result = await repository.find("job_postings", findQuery);
        return result;
    },
    insertJobPosting: async function (jobPosting) {
        const result = await repository.insertOne("job_postings", jobPosting);
        console.log(result);
        return result;
    },
    updateJobPosting: async function (jobPosting) {
        const findQuery = { code: jobPosting.code };
        const result = await repository.updateOne("job_postings", findQuery, jobPosting);
        console.log(result);
        return result;
    },
    deleteJobPosting: async function (code) {
        const findQuery = { code: code };
        const result = await repository.deleteOne("job_postings", findQuery);
        console.log(result);
        return result;
    },         
};     