import React from 'react';
import { Menu, Undo, Redo, ZoomIn, ZoomOut, Grid3x3, Download, Share2, Ruler, Move } from 'lucide-react';

interface TopToolbarProps {
  zoom: number;
  setZoom: (zoom: number) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  onExport: (format: 'png' | 'svg' | 'pdf' | 'json') => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  zoom,
  setZoom,
  showGrid,
  setShowGrid,
  snapToGrid,
  setSnapToGrid,
  onExport
}) => {
  const zoomLevels = [25, 50, 75, 100, 125, 150, 200, 300, 400];

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex < zoomLevels.length - 1) {
      setZoom(zoomLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex > 0) {
      setZoom(zoomLevels[currentIndex - 1]);
    }
  };

  return (
    <div className="h-[60px] bg-white border-b border-gray-200 flex items-center px-4 gap-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">DA</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Diagram AI</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
            File
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
            Edit
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-4">
        <button
          onClick={handleZoomOut}
          disabled={zoom === 25}
          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <input
          type="range"
          min="0"
          max={zoomLevels.length - 1}
          value={zoomLevels.indexOf(zoom)}
          onChange={(e) => setZoom(zoomLevels[parseInt(e.target.value)])}
          className="w-32"
        />

        <button
          onClick={handleZoomIn}
          disabled={zoom === 400}
          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
          {zoom}%
        </span>

        <div className="w-px h-6 bg-gray-300" />

        <button
          onClick={() => setSnapToGrid(!snapToGrid)}
          className={`p-2 rounded transition-colors ${
            snapToGrid ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Snap to Grid"
        >
          <Move className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 rounded transition-colors ${
            showGrid ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Show Grid"
        >
          <Grid3x3 className="w-4 h-4" />
        </button>

        <select className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:border-gray-400 transition-colors">
          <option>A4 (210×297mm)</option>
          <option>Letter (8.5×11")</option>
          <option>Custom</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button
              onClick={() => onExport('png')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export as PNG
            </button>
            <button
              onClick={() => onExport('svg')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export as SVG
            </button>
            <button
              onClick={() => onExport('pdf')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export as PDF
            </button>
            <button
              onClick={() => onExport('json')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200"
            >
              Save as JSON
            </button>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};
