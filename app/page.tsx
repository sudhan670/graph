import GraphView from '@/components/graph-view';

// Sample data for demonstration
const sampleData = {
  timestamp: "2024-02-02T22:25:03.132985",
  idx: "msg_1",
  query: "What security vulnerabilities exist in the system?",
  agents: [
    {
      name: "Security Scanner",
      tools: [
        {
          name: "Vulnerability Scanner",
          input: "Scan system for vulnerabilities",
          output: "Found 3 critical vulnerabilities in the network configuration",
          idx: "tool_1"
        },
        {
          name: "Port Scanner",
          input: "Scan open ports",
          output: "Detected unusual open ports: 4444, 5555",
          idx: "tool_2"
        }
      ],
      images: [],
      output: "System analysis complete. Multiple security issues detected.",
      idx: "agent_1"
    },
    {
      name: "Threat Analyzer",
      tools: [
        {
          name: "Pattern Matcher",
          input: "Analyze threat patterns",
          output: "Identified potential malware signature",
          idx: "tool_3"
        }
      ],
      images: [],
      output: "Threat analysis reveals potential security breach attempts",
      idx: "agent_2"
    }
  ],
  response: "Security scan complete. Multiple vulnerabilities detected.",
  total_tokens: 1909,
  is_active: true
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <GraphView initialData={sampleData} />
    </main>
  );
}