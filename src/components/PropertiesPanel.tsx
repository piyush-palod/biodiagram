import React from 'react';
import { Layers, Trash2 } from 'lucide-react';
import { CanvasObject } from '../types';

interface PropertiesPanelProps {
  selectedObject: CanvasObject | null;
  onUpdateObject: (id: string, updates: Partial<CanvasObject>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedObject,
  onUpdateObject
}) => {
  if (!selectedObject) {
    return (
      <div className="p-6 text-center text-gray-500">
        <Layers className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-sm">Select an object to edit its properties</p>
      </div>
    );
  }

  const handleUpdate = (field: keyof CanvasObject, value: any) => {
    onUpdateObject(selectedObject.id, { [field]: value });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Object Name
        </label>
        <input
          type="text"
          value={selectedObject.name}
          onChange={(e) => handleUpdate('name', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Label
        </label>
        <input
          type="text"
          value={selectedObject.label || ''}
          onChange={(e) => handleUpdate('label', e.target.value)}
          placeholder="Enter label text..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
        />
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedObject.showLabel || false}
            onChange={(e) => handleUpdate('showLabel', e.target.checked)}
            className="rounded text-green-500 focus:ring-green-500"
          />
          Show label
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={selectedObject.color}
            onChange={(e) => handleUpdate('color', e.target.value)}
            className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={selectedObject.color}
            onChange={(e) => handleUpdate('color', e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0', '#FBC02D'].map(color => (
            <button
              key={color}
              onClick={() => handleUpdate('color', color)}
              className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Position
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">X</label>
            <input
              type="number"
              value={Math.round(selectedObject.x)}
              onChange={(e) => handleUpdate('x', parseFloat(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Y</label>
            <input
              type="number"
              value={Math.round(selectedObject.y)}
              onChange={(e) => handleUpdate('y', parseFloat(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Size
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Width</label>
            <input
              type="number"
              value={Math.round(selectedObject.width)}
              onChange={(e) => handleUpdate('width', parseFloat(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Height</label>
            <input
              type="number"
              value={Math.round(selectedObject.height)}
              onChange={(e) => handleUpdate('height', parseFloat(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Rotation: {selectedObject.rotation}°
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={selectedObject.rotation}
          onChange={(e) => handleUpdate('rotation', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Opacity: {Math.round(selectedObject.opacity * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={selectedObject.opacity}
          onChange={(e) => handleUpdate('opacity', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this object?')) {
              onUpdateObject(selectedObject.id, {});
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Delete Object
        </button>
      </div>
    </div>
  );
};
