"use client";

import React from 'react';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FiltersProps {
  onFilterChange: (type: string, value: string) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  return (
    <div className="absolute top-4 right-4 z-10 flex gap-4">
      <div className="flex flex-col gap-2">
        <Label>Agent Type</Label>
        <Select onValueChange={(value : any) => onFilterChange('agentType', value)}>
          <option value="">All</option>
          <option value="security">Security</option>
          <option value="analysis">Analysis</option>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Tool Type</Label>
        <Select onValueChange={(value : any) => onFilterChange('toolType', value)}>
          <option value="">All</option>
          <option value="scanner">Scanner</option>
          <option value="analyzer">Analyzer</option>
        </Select>
      </div>
      
    </div>
  );
}