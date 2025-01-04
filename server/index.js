import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Graph from './models/graph.js'; // Include `.js` for local module files
import dotenv from 'dotenv'; // Import dotenv for environment variables
dotenv.config(); // Load environment variables
import process

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

const MONGO = process.env.MONGODB_URL;
mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

// REST API endpoints
app.get('/api/graphs', async (req, res) => {
  try {
    const graphs = await Graph.find();
    res.json(graphs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/graphs', async (req, res) => {
  try {
    const graph = new Graph(req.body);
    await graph.save();
    io.emit('graphUpdate', graph);
    res.status(201).json(graph);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('editNode', async (data) => {
    try {
      const graph = await Graph.findOne({ 'agents.idx': data.nodeId });
      if (graph) {
        const agent = graph.agents.find(a => a.idx === data.nodeId);
        if (agent) {
          Object.assign(agent, data.updates);
          await graph.save();
          io.emit('graphUpdate', graph);
        }
      }
    } catch (error) {
      console.error('Error updating node:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
