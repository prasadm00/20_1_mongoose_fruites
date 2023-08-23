const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true })


// add validation to the schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    rating: {
        type: Number,
        min: [1, 'Too few reting'],
        max: 10
    },
    review: String
})

// 2 param one is name of the collection or name of table (we write it in sigular mongoose converts into plural automatically to create collection) and second will be the schema of the collection

const Fruit = mongoose.model("Fruit", fruitSchema);


// construct new document or record 

const fruit = new Fruit({
    name: "Apple",
    rating: 10,
    review: "Peach is so yummy."
})

// save the fruit into db
// fruit.save();

const raspberries = new Fruit({
    name: "Raspberries",
    score: 7,
    review: "Good test."
})

// raspberries.save();
const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model("People", PersonSchema);

const person = new Person({
    name: "John",
    age: 20,// Person,
    // favouriteFruit: pineapple
})

// person.save()


Person.updateOne({ name: 'John' }, { favouriteFruit: raspberries }).then((result) => {
    console.log("Successfully updated");
    // mongoose.connection.close()
}).catch((err) => {
    console.log('Error', err);
});


/*
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit."
})
const orange = new Fruit({
    name: "Orange",
    rating: 4,
    review: "Too sour for me."
})
const banana = new Fruit({
    name: "Banana",
    rating: 3,
    review: "Weired texture."
})




Fruit.insertMany([kiwi, orange, banana]).then(data => {
    console.log("Successfully saved", data);
}).catch(
    error => {
        console.log("Error", error)
    }
)
*/

async function getFruits() {
    try {
        const allFruits = await Fruit.find();
        for (let i = 0; i < allFruits.length; i++) {
            console.log(allFruits[i].name);
        }
        // console.log("🚀 ~ file: index.js:70 ~ allFruits:", allFruits)
    } catch (error) {
        console.log(error);
    }
}
getFruits();
// mongoose.connection.close()


/*
Fruit.updateOne({ _id: '64e5f727ef9f53594e0e6d85' }, { name: 'Peach' }).then((result) => {
    console.log("Successfully updated");
    // mongoose.connection.close()
}).catch((err) => {
    console.log('Error', err);
});

Fruit.deleteOne({ name: 'Peach' }).then((result) => {
    console.log("One Successfully Deleted", result);
    // mongoose.connection.close()
}).catch((err) => {
    console.log('Error', err);
});

Person.deleteMany({ name: 'John' }).then((result) => {
    console.log("Many Successfully Deleted");
    mongoose.connection.close()
}).catch((err) => {
    console.log('Error', err);
});
*/