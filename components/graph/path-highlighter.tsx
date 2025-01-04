"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

interface PathHighlighterProps {
  onHighlightPath: () => void;
}

export function PathHighlighter({ onHighlightPath }: PathHighlighterProps) {
  return (
    <div className="absolute bottom-4 left-4 z-10">
      <Button onClick={onHighlightPath} variant="secondary">
        <Activity className="h-4 w-4 mr-2" />
        Highlight Path
      </Button>
    </div>
  );
}