export const graphStyles = [
  {
    selector: 'node',
    style: {
      width: 40,
      height: 40,
      'background-color': 'hsl(var(--primary))',
      'border-width': 2,
      'border-color': 'hsl(var(--primary))',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '10px',
      color: '#ffffff',
      label: 'data(label)',
    }
  },
  {
    selector: 'node[type="tool"]',
    style: {
      'background-color': 'hsl(var(--secondary))',
      'border-color': 'hsl(var(--secondary))',
      color: 'hsl(var(--primary))',
      shape: 'rectangle',
    }
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'line-color': 'hsl(var(--muted-foreground))',
      'target-arrow-color': 'hsl(var(--muted-foreground))',
      width: 1,
    }
  },
  {
    selector: '.highlighted',
    style: {
      'background-color': 'hsl(var(--accent))',
      'line-color': 'hsl(var(--accent))',
      'target-arrow-color': 'hsl(var(--accent))',
      'transition-property': 'background-color, line-color, target-arrow-color',
      'transition-duration': '0.2s',
    }
  }
];