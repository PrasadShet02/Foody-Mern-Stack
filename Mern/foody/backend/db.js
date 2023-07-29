const mongoose = require("mongoose");

//Modify the Mongodb URL (Use mongodb atlas) 
//Keep foodydb between /? in the URL
const mongoUri = "mongodb+srv://  modify here  /foodydb?retryWrites=true&w=majority"

const dbConnect = async () => {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true });
    console.log("Connected to database successfully");
    let fetched_data = await mongoose.connection.db.collection("food-items");
    global.food_items_data = await fetched_data.find({}).toArray();
    fetched_data = await mongoose.connection.db.collection("food-category");
    global.food_category_data = await fetched_data.find({}).toArray();
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
