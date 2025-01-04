import cytoscape from 'cytoscape';

export const graphLayout = {
  name: 'cola',
  animate: true,
  refresh: 1,
  maxSimulationTime: 4000,
  ungrabifyWhileSimulating: false,
  fit: true,
  padding: 30,
  randomize: false,
  componentSpacing: 100,
  nodeSpacing: 100,
  edgeLength: 200,
  avoidOverlap: true
} as cytoscape.LayoutOptions;