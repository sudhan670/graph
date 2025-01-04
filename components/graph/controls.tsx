"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CiSearch } from 'react-icons/ci';
import { MdZoomInMap } from 'react-icons/md';
import {MdZoomOutMap} from 'react-icons/md';

interface ControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onZoom: (factor: number) => void;
}

export function Controls({ searchTerm, onSearchChange, onSearch, onZoom }: ControlsProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <Input
        placeholder="Search nodes..."
        value={searchTerm}
        onChange={(e : any) => onSearchChange(e.target.value)}
        className="w-64"
      />
      <Button variant="secondary" onClick={onSearch}>
        <CiSearch className="h-4 w-4" />
      </Button>
      <Button variant="secondary" onClick={() => onZoom(1.2)}>
        <MdZoomInMap className="h-4 w-4" />
      </Button>
      <Button variant="secondary" onClick={() => onZoom(0.8)}>
        <MdZoomOutMap className="h-4 w-4" />
      </Button>
    </div>
  );
}