"use client";

import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GraphData, Node } from '@/lib/types';
import { socket } from '@/lib/socket';

export function useGraph(
  onNodeSelect: (node: Node | null) => void,
  updateGraph: (cy: cytoscape.Core, newData: GraphData) => void
) {
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cyRef.current;

    cy.on('tap', 'node', (evt) => {
      const node = evt.target.data();
      onNodeSelect(node);
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        onNodeSelect(null);
      }
    });

    socket.on('graphUpdate', (newData: GraphData) => {
      updateGraph(cy, newData);
    });

    return () => {
      socket.off('graphUpdate');
    };
  }, [onNodeSelect, updateGraph]);

  return cyRef;
}