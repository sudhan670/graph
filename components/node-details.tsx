"use client";

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Node, Agent, Tool } from '@/lib/types'; // Adjust import if needed
import { ScrollArea } from './ui/scroll-area';

interface NodeDetailsProps {
  node: Node;
  onClose: () => void;
}

export default function NodeDetails({ node, onClose }: NodeDetailsProps) {
  const data = node.data;

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{node.label}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {node.type === 'agent' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Output</h4>
              <p className="text-sm text-muted-foreground">{(data as Agent).output}</p>
            </div>
            {(data as Agent).images && (data as Agent).images.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Images</h4>
                <div className="grid grid-cols-2 gap-2">
                  {(data as Agent).images.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Image ${i + 1}`}
                      className="rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
            <div>
              <h4 className="font-medium mb-2">Tools</h4>
              <div className="space-y-2">
                {(data as Agent).tools?.map((tool) => (
                  <div key={tool.idx} className="p-2 bg-secondary rounded-md">
                    <p className="font-medium text-sm">{tool.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Input: {tool.input}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Output: {tool.output}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {node.type === 'tool' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Input</h4>
              <p className="text-sm text-muted-foreground">{(data as Tool).input}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Output</h4>
              <p className="text-sm text-muted-foreground">{(data as Tool).output}</p>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
