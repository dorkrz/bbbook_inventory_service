var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/book_inventory_store';

var collectionPromise = MongoClient.
    connect(url).
    then(function (db) {
        return db.collection('books_krzos');
    });

module.exports = {
    findAll: function () {
        return collectionPromise.then(function (collection) {
            return collection.find({}).toArray();
        });
    },
    stockUp: function (isbn, count) {
        return collectionPromise.then(function (collection) {
            return collection.updateOne({isbn: isbn}, {
                isbn: isbn,
                count: count
            }, {upsert: true});
        });
    },
    getCount: function (isbn) {
        return collectionPromise.then(function (collection) {
            return collection.
                find({"isbn": isbn}).
                limit(1).
                next().
                then(function (result) {
                    if (result!==null) {
                        res.format({
                            html: function(){
                                res.send('<div class="copiesLeft">'+result+'</div>')
                            },
                            json: function(){
                                res.status(200).json({count: result})
                            }
                        })

                    }
                    return null;
                });
        });
    }
};