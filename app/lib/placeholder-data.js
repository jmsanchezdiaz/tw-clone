const { uuid } = require("uuidv4");
// Starter data

const profiles = [
  {
    id: uuid(),
    name: "John Doe",
    username: "johndoe93",
    email: "johndoe93@gmail.com",
    password: "12345",
    description: "Me llamo john doe!"
  },
  {
    id: uuid(),
    name: "el leon de la economia",
    username: "Javier Milei",
    email: "eljavo@gmail.com",
    password: "VLLC23",
    description: "PRESIDENTE DE LA NACIÓN - ARGENTINA"
  }
];

const tweets = [
  {
    id: uuid(),
    body: "hola mundo",
    profile_id: profiles[0].id
  }
];

const replies = [
  {
    id: uuid(),
    body: "hola john!",
    profile_id: profiles[1].id,
    tweet_id: tweets[0].id
  }
];

module.exports = {
  profiles,
  tweets,
  replies
};
