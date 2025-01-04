import { Agent, Edge, GraphData, GraphElements, Node, Tool } from './types';

export function convertDataToGraphElements(data: GraphData): { elements: any[] } {
  const elements = [];

  // Add agent nodes
  data.agents.forEach((agent) => {
    elements.push({
      data: {
        id: agent.idx,
        label: agent.name,
        type: 'agent',
        ...agent,
      }
    });

    // Add tool nodes and edges
    agent.tools.forEach((tool) => {
      elements.push({
        data: {
          id: tool.idx,
          label: tool.name,
          type: 'tool',
          ...tool,
        }
      });

      elements.push({
        data: {
          id: `${agent.idx}-${tool.idx}`,
          source: agent.idx,
          target: tool.idx,
          label: 'uses'
        }
      });
    });
  });

  return { elements };
}

export function getNodeStyle(node: any) {
  const baseStyle = {
    width: 40,
    height: 40,
    'background-color': '#ffffff',
    'border-width': 2,
    'border-color': '#000000',
    'text-valign': 'center',
    'text-halign': 'center',
    'font-size': '10px',
    label: node.label,
  };

  if (node.type === 'agent') {
    return {
      ...baseStyle,
      'background-color': 'hsl(var(--primary))',
      'border-color': 'hsl(var(--primary))',
      color: '#ffffff',
      shape: 'ellipse',
    };
  }

  return {
    ...baseStyle,
    'background-color': 'hsl(var(--secondary))',
    'border-color': 'hsl(var(--secondary))',
    color: 'hsl(var(--primary))',
    shape: 'rectangle',
  };
}

export function getEdgeStyle() {
  return {
    'curve-style': 'bezier',
    'target-arrow-shape': 'triangle',
    'line-color': 'hsl(var(--muted-foreground))',
    'target-arrow-color': 'hsl(var(--muted-foreground))',
    width: 1,
  };
}