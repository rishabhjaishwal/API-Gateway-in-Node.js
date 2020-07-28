const Servers = [process.env.SERVER1,process.env.SERVER2];
const mapping = {
    [process.env.SERVER1]:"http://localhost:4000",
    [process.env.SERVER2]: "http://localhost:8500",
    "authServer": "http://localhost:8600"
}
module.exports =  {Servers, mapping};