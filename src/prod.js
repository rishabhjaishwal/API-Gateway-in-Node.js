const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
    console.log(`⚡ Master ${process.pid} is running⚡`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs -1; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
const app =require("./dev");
module.exports=app;
}