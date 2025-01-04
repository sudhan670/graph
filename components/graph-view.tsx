"use client";

import React, { useState, useCallback } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { Card } from '@/components/ui/card';
import { GraphData, Node } from '@/lib/types';
import { convertDataToGraphElements } from '@/lib/graph-utils';
import { Controls } from './graph/controls';
import NodeDetails from './node-details';
import { useGraph } from '@/lib/hooks/use-graph';
import { graphStyles } from '@/lib/graph/styles';
import { graphLayout } from '@/lib/graph/layout';

cytoscape.use(cola);

interface GraphViewProps {
  initialData: GraphData;
}

export default function GraphView({ initialData }: GraphViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const updateGraph = useCallback((cy: cytoscape.Core, newData: GraphData) => {
    const { elements } = convertDataToGraphElements(newData);
    cy.elements().remove();
    cy.add(elements);
    cy.layout(graphLayout).run();
  }, []);

  const cyRef = useGraph(setSelectedNode, updateGraph);

  const handleSearch = () => {
    if (!cyRef.current || !searchTerm) return;

    const cy = cyRef.current;
    const searchRegex = new RegExp(searchTerm, 'i');
    
    cy.elements().removeClass('highlighted');
    cy.elements().style('opacity', 0.3);

    const matchedElements = cy.elements().filter((ele) => {
      const data = ele.data();
      return searchRegex.test(data.label);
    });

    matchedElements.addClass('highlighted');
    matchedElements.style('opacity', 1);
  };

  const handleZoom = (factor: number) => {
    if (!cyRef.current) return;
    cyRef.current.zoom({
      level: cyRef.current.zoom() * factor,
      renderedPosition: {
        x: cyRef.current.width() / 2,
        y: cyRef.current.height() / 2,
      },
    });
  };

  const { elements } = convertDataToGraphElements(initialData);

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <Controls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          onZoom={handleZoom}
        />
        <CytoscapeComponent
          elements={elements}
          style={{ width: '100%', height: '100%' }}
          cy={(cy) => {
            cyRef.current = cy;
            cy.layout(graphLayout).run();
          }}
          stylesheet={graphStyles}
        />
      </div>
      {selectedNode && (
        <Card className="w-96 p-4 m-4 overflow-auto">
          <NodeDetails node={selectedNode} onClose={() => setSelectedNode(null)} />
        </Card>
      )}
    </div>
  );
}