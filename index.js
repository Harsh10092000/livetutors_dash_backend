import express from 'express';
import cors from 'cors';
import authSession from "./routes/session.js"
import authTutor from "./routes/tutorRequest.js"
import authBecameTutor from "./routes/becameTutor.js"
// import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend URL
    methods: ["GET", "POST"]
  }
});

// var corsOptions = {
//     origin: '*',  
// };
// app.use(cors(corsOptions));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
// app.use(cors({
//   origin: 'http://dashboard.example.com',
//   credentials: true,
// }));
app.use(express.static("./public"));


app.use("/api/session", authSession);
app.use("/api/tutor", authTutor);
app.use("/api/becameTutor", authBecameTutor);

app.set("socketio", io);


app.get('/test-notification', (req, res) => {
  const io = req.app.get('socketio');
  console.log("Emitting new_job_notification...");
  if (io) {
    io.emit('new_job_notification', {
      title: 'Test Notification',
      message: 'This is a test notification!',
      link: '/tutor-jobs/test'
    });
  }
  res.json({ success: true, message: 'Test notification sent!' });
});

// app.listen(8010, () => {
//   console.log("App is running ");
// }); 

server.listen(8010, () => {
  console.log("App is running ");
});