const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./dboperations");
const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

mongoClient.connect(url, (err,client) => {
    assert.equal(err,null);
    console.log("Connected successfully to the server");

    const confusionDB = client.db(dbname);
    const dishCollection = confusionDB.collection("dishes");
    // dishCollection.insertOne({ "name": "Uthapizza", "descritpion": "Test"}, (err, result) => {
    //      assert.equal(err,null);
    //      console.log("After insertion:\n");
    //      console.log(result.ops);
         
    //      dishCollection.find({}).toArray((err,docs) => {
    //          assert.equal(err,null);
    //          console.log("Found:\n");
    //          console.log(docs);

    //          confusionDB.dropCollection("dishes", (err,result) => {
    //             assert.equal(err,null);
    //             console.log("Successfully dropped the collection dishes");

    //             client.close();
    //             console.log("Connection to the DB terminated");
    //          });

    //      });

    // });

    dboper.insertDocument(confusionDB,"dishes",{name: "Vadonut", description:"Test"},(result) => {
           console.log("Insert Document:\n", result.ops);
           
           dboper.findDocument(confusionDB,"dishes", (docs) => {
              console.log("Found Documents:\n",docs);
           });

           dboper.updateDocument(confusionDB,"dishes",{name:"Vadonut"},
            {description: "Updated Test document"},(result) => {
               console.log("Updated Document:\n",result.result);
            });

            dboper.findDocument(confusionDB,"dishes",(docs) => {
              console.log("Found Updated documents:\n",docs);
            });
            
            confusionDB.dropCollection("dishes", (err,result) => {
                      assert.equal(err,null);
                console.log("Successfully dropped collection: ",result);

                client.close();
            });

    });

});