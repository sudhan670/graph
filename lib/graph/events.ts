"use client";

import cytoscape from 'cytoscape';
import { Node } from '@/lib/types';

export function setupGraphEvents(
  cy: cytoscape.Core,
  onNodeSelect: (node: Node | null) => void
) {
  cy.on('tap', 'node', (evt) => {
    const node = evt.target.data();
    onNodeSelect(node);
  });

  cy.on('tap', (evt) => {
    if (evt.target === cy) {
      onNodeSelect(null);
    }
  });
}

export function highlightPath(cy: cytoscape.Core, sourceId: string, targetId: string) {
  const path = cy.elements().dijkstra(`#${sourceId}`);
  const pathToTarget = path.pathTo(cy.$(`#${targetId}`));
  
  cy.elements().removeClass('highlighted');
  pathToTarget.addClass('highlighted');
}