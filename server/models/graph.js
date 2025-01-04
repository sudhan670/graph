import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
  name: String,
  input: String,
  output: String,
  idx: String
});

const agentSchema = new mongoose.Schema({
  name: String,
  tools: [toolSchema],
  images: [String],
  output: String,
  idx: String
});

const graphSchema = new mongoose.Schema({
  timestamp: Date,
  idx: String,
  query: String,
  agents: [agentSchema],
  response: String,
  total_tokens: Number,
  is_active: Boolean
});

export default mongoose.model('Graph', graphSchema);
