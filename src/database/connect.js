const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = () => {
  mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
      console.log("DB CONECTION SUCEFFULY");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connect;
