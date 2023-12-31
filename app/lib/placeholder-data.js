// Starter data
export const profiles = [
  {
    id: "5f10e9e6b090019855d87e10679faaa574abbd1c1d6e698085fd0192f9b28ed5",
    name: "John Doe",
    username: "johndoe93",
    email: "johndoe93@gmail.com",
    password: "12345",
    description: "Me llamo john doe!"
  },
  {
    id: "5710e9e6b090019855d87e10679faaa574abbd1c1d6e698085fd0192f9b28ed5",
    name: "el leon de la economia",
    username: "Javier Milei",
    email: "eljavo@gmail.com",
    password: "VLLC23",
    description: "PRESIDENTE DE LA NACIÓN - ARGENTINA"
  }
];

export const tweets = [
  {
    id: "",
    body: "hola mundo",
    profile_id: profiles[0].id
  }
];

export const replies = [
  {
    id: "bc2ed75edca209f05e95d0aa6ec0b1627e55dffcd55f38316f5dc07a2ef69d36",
    body: "hola john!",
    profile_id: profiles[1].id,
    tweet_id: tweets[0].id
  }
];
