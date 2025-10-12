import React, { useRef, useState, useEffect } from 'react';
import { CanvasObject, ComponentItem } from '../types';

interface CanvasProps {
  objects: CanvasObject[];
  selectedObject: CanvasObject | null;
  onSelectObject: (object: CanvasObject | null) => void;
  onUpdateObject: (id: string, updates: Partial<CanvasObject>) => void;
  onDeleteObject: (id: string) => void;
  zoom: number;
  showGrid: boolean;
  snapToGrid: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
  objects,
  selectedObject,
  onSelectObject,
  onUpdateObject,
  onDeleteObject,
  zoom,
  showGrid,
  snapToGrid
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [draggedObject, setDraggedObject] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const gridSize = 20;

  const snapToGridValue = (value: number) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    try {
      const item: ComponentItem = JSON.parse(e.dataTransfer.getData('application/json'));
      const rect = canvasRef.current.getBoundingClientRect();
      const x = snapToGridValue((e.clientX - rect.left - panOffset.x) / (zoom / 100));
      const y = snapToGridValue((e.clientY - rect.top - panOffset.y) / (zoom / 100));

      const newObject: CanvasObject = {
        id: `obj-${Date.now()}`,
        type: 'component',
        name: item.name,
        x,
        y,
        width: item.defaultWidth,
        height: item.defaultHeight,
        rotation: 0,
        opacity: 1,
        color: '#4CAF50',
        svg: item.svg,
        category: item.category,
        showLabel: true
      };

      onUpdateObject(newObject.id, newObject);
    } catch (error) {
      console.error('Error dropping object:', error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, objectId?: string, handle?: string) => {
    if (handle && objectId) {
      const obj = objects.find(o => o.id === objectId);
      if (obj) {
        setResizeHandle(handle);
        setResizeStart({
          x: e.clientX,
          y: e.clientY,
          width: obj.width,
          height: obj.height
        });
      }
      return;
    }

    if (objectId) {
      const obj = objects.find(o => o.id === objectId);
      if (obj) {
        onSelectObject(obj);
        setDraggedObject(objectId);
        setDragOffset({
          x: e.clientX - obj.x * (zoom / 100) - panOffset.x,
          y: e.clientY - obj.y * (zoom / 100) - panOffset.y
        });
      }
    } else {
      onSelectObject(null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (resizeHandle && selectedObject) {
      const dx = e.clientX - resizeStart.x;
      const dy = e.clientY - resizeStart.y;
      const scale = zoom / 100;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;

      if (resizeHandle.includes('e')) newWidth = resizeStart.width + dx / scale;
      if (resizeHandle.includes('w')) newWidth = resizeStart.width - dx / scale;
      if (resizeHandle.includes('s')) newHeight = resizeStart.height + dy / scale;
      if (resizeHandle.includes('n')) newHeight = resizeStart.height - dy / scale;

      onUpdateObject(selectedObject.id, {
        width: Math.max(20, newWidth),
        height: Math.max(20, newHeight)
      });
    } else if (draggedObject) {
      const obj = objects.find(o => o.id === draggedObject);
      if (obj && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = snapToGridValue((e.clientX - rect.left - dragOffset.x) / (zoom / 100));
        const y = snapToGridValue((e.clientY - rect.top - dragOffset.y) / (zoom / 100));
        onUpdateObject(draggedObject, { x, y });
      }
    } else if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedObject(null);
    setResizeHandle(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedObject && (e.key === 'Delete' || e.key === 'Backspace')) {
      onDeleteObject(selectedObject.id);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject]);

  return (
    <div
      ref={canvasRef}
      className="flex-1 bg-gray-100 rounded-lg shadow-sm border border-gray-200 overflow-hidden relative cursor-move"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onMouseDown={(e) => e.target === canvasRef.current && handleMouseDown(e)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: '0 0'
        }}
      >
        {showGrid && (
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{
              width: '200%',
              height: '200%',
              left: '-50%',
              top: '-50%'
            }}
          >
            <defs>
              <pattern
                id="grid"
                width={gridSize * (zoom / 100)}
                height={gridSize * (zoom / 100)}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={`M ${gridSize * (zoom / 100)} 0 L 0 0 0 ${gridSize * (zoom / 100)}`}
                  fill="none"
                  stroke="#E0E0E0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        )}

        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: '0 0',
            position: 'relative'
          }}
        >
          {objects.map((obj) => (
            <div
              key={obj.id}
              className={`absolute cursor-move ${
                selectedObject?.id === obj.id ? 'ring-2 ring-green-500' : ''
              }`}
              style={{
                left: obj.x,
                top: obj.y,
                width: obj.width,
                height: obj.height,
                transform: `rotate(${obj.rotation}deg)`,
                opacity: obj.opacity
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e, obj.id);
              }}
            >
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: obj.svg || '' }}
              />

              {obj.showLabel && obj.label && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm">
                  {obj.label}
                </div>
              )}

              {selectedObject?.id === obj.id && (
                <>
                  <div
                    className="absolute -top-1 -left-1 w-3 h-3 bg-white border-2 border-green-500 rounded-full cursor-nw-resize"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, obj.id, 'nw');
                    }}
                  />
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-green-500 rounded-full cursor-ne-resize"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, obj.id, 'ne');
                    }}
                  />
                  <div
                    className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border-2 border-green-500 rounded-full cursor-sw-resize"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, obj.id, 'sw');
                    }}
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border-2 border-green-500 rounded-full cursor-se-resize"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, obj.id, 'se');
                    }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded shadow-sm border border-gray-200 text-xs text-gray-600">
        Zoom: {zoom}% | Objects: {objects.length}
      </div>
    </div>
  );
};
