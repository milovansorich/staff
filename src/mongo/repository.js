const dbo = require("@mongo/connection.js");

module.exports = {
    find: async function (collectionName, findQuery) {
        await dbo.connectToServer(function (err) {
            if (err) console.error(err);
        });

        try{
            let db_connect = dbo.getDb();
            let collection = await db_connect.collection(collectionName);
    
            const found = collection.find(findQuery).toArray();
    
            return found;
        } finally {
            await dbo.close();
        }
    },
    insertOne: async function (collectionName, data) {
        await dbo.connectToServer(function (err) {
            if (err) console.error(err);
        });

        try{
            let db_connect = dbo.getDb();
            let collection = await db_connect.collection(collectionName);
    
            const result = await collection.insertOne(data)
    
            return result;
        } finally {
            await dbo.close();
        }
    },
    updateOne:  async function (collectionName, query, data) {
        await dbo.connectToServer(function (err) {
            if (err) console.error(err);
        });

        try{
            let db_connect = dbo.getDb();
            let collection = await db_connect.collection(collectionName);
            
            const update = { $set: data};
            const options = {};
            const result = await collection.updateOne(query, update, options);
    
            return result;
        } finally {
            await dbo.close();
        }
    },
    deleteOne: async function (collectionName, query) {
        await dbo.connectToServer(function (err) {
            if (err) console.error(err);
        });

        try{
            let db_connect = dbo.getDb();
            let collection = await db_connect.collection(collectionName);
    
            const result = await collection.deleteOne(query)
            console.log(result)    
            return result;
        } finally {
            await dbo.close();
        }
    },    
    
};     