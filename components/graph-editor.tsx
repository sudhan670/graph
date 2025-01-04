"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socket';

interface GraphEditorProps {
  node: any;
  onClose: () => void;
}

export function GraphEditor({ node, onClose }: GraphEditorProps) {
  const [name, setName] = useState(node.name);
  const [output, setOutput] = useState(node.output);

  const handleSave = () => {
    socket.emit('editNode', {
      nodeId: node.idx,
      updates: { name, output }
    });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Node</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Output</label>
            <Input value={output} onChange={(e) => setOutput(e.target.value)} />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}