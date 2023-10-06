import cluster from "cluster";
import { cpus } from "os";

const numCpus = cpus().length;

if (cluster.isPrimary) {
  console.log(`primary process ${process.pid} is running`);

  for (let i = 0; i < numCpus; i++) {
    const worker = cluster.fork();
    worker.port = 5000 + i;
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker process ${worker.process.pid} died!`);
  });
} else {
  console.log(`Worker process ${process.pid} is running`);
}
