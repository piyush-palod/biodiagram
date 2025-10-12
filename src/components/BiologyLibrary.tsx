import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { ComponentCategory, ComponentItem, CanvasObject } from '../types';
import { biologyComponents } from '../data/biologyComponents';

interface BiologyLibraryProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onAddObject: (object: CanvasObject) => void;
}

export const BiologyLibrary: React.FC<BiologyLibraryProps> = ({
  collapsed,
  onToggleCollapse,
  onAddObject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<ComponentCategory[]>(biologyComponents);

  const toggleCategory = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
      )
    );
  };

  const handleDragStart = (e: React.DragEvent, item: ComponentItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  if (collapsed) {
    return (
      <div className="w-[60px] bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center py-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[280px] bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800">Biology Components</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <Menu className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map(category => (
          <div key={category.id} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              {category.expanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {category.expanded && (
              <div className="grid grid-cols-3 gap-2 p-4 pt-0">
                {category.items.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="aspect-square border border-gray-200 rounded p-2 hover:border-green-500 hover:bg-green-50 transition-all cursor-move group"
                    title={item.name}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: item.svg }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
