import React, { useState, useEffect } from 'react';
import { Settings, MessageSquare, X, ArrowLeft, Save, Loader2 } from 'lucide-react';
import { BiologyLibrary } from './components/BiologyLibrary';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { AIAssistant } from './components/AIAssistant';
import { TopToolbar } from './components/TopToolbar';
import { Auth } from './components/Auth';
import { DiagramList } from './components/DiagramList';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CanvasObject } from './types';
import { exportToPNG, exportToSVG, exportToPDF, exportToJSON } from './utils/exportUtils';
import { supabase, Diagram } from './lib/supabase';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [currentDiagram, setCurrentDiagram] = useState<Diagram | null>(null);
  const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null);
  const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>([]);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState<'properties' | 'ai'>('properties');
  const [saving, setSaving] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentDiagram) {
      setCanvasObjects(currentDiagram.canvas_data || []);
    }
  }, [currentDiagram]);

  useEffect(() => {
    if (currentDiagram && canvasObjects.length >= 0) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      const timeout = setTimeout(() => {
        saveDiagram();
      }, 2000);
      setAutoSaveTimeout(timeout);
    }
  }, [canvasObjects]);

  const saveDiagram = async () => {
    if (!currentDiagram || !user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('diagrams')
        .update({
          canvas_data: canvasObjects,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentDiagram.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving diagram:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddObject = (object: CanvasObject) => {
    setCanvasObjects(prev => [...prev, object]);
  };

  const handleUpdateObject = (id: string, updates: Partial<CanvasObject>) => {
    setCanvasObjects(prev =>
      prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj)
    );
    if (selectedObject?.id === id) {
      setSelectedObject(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleDeleteObject = (id: string) => {
    setCanvasObjects(prev => prev.filter(obj => obj.id !== id));
    if (selectedObject?.id === id) {
      setSelectedObject(null);
    }
  };

  const handleExport = (format: 'png' | 'svg' | 'pdf' | 'json') => {
    switch (format) {
      case 'png':
        exportToPNG(canvasObjects);
        break;
      case 'svg':
        exportToSVG(canvasObjects);
        break;
      case 'pdf':
        exportToPDF(canvasObjects);
        break;
      case 'json':
        exportToJSON(canvasObjects);
        break;
    }
  };

  const handleBackToDiagrams = () => {
    setCurrentDiagram(null);
    setCanvasObjects([]);
    setSelectedObject(null);
  };

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (!currentDiagram) {
    return <DiagramList onSelectDiagram={setCurrentDiagram} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="h-[60px] bg-white border-b border-gray-200 flex items-center px-4 gap-4">
        <button
          onClick={handleBackToDiagrams}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex-1 flex items-center gap-3">
          <input
            type="text"
            value={currentDiagram.title}
            onChange={async (e) => {
              const newTitle = e.target.value;
              setCurrentDiagram({ ...currentDiagram, title: newTitle });
              await supabase
                .from('diagrams')
                .update({ title: newTitle })
                .eq('id', currentDiagram.id);
            }}
            className="text-lg font-semibold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
          />
          {saving && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </div>
          )}
          {!saving && (
            <div className="text-sm text-gray-400">Saved</div>
          )}
        </div>

        <button
          onClick={saveDiagram}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Now
        </button>
      </div>

      <TopToolbar
        zoom={zoom}
        setZoom={setZoom}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        snapToGrid={snapToGrid}
        setSnapToGrid={setSnapToGrid}
        onExport={handleExport}
      />

      <div className="flex-1 flex gap-2 p-2 overflow-hidden">
        <BiologyLibrary
          collapsed={leftSidebarCollapsed}
          onToggleCollapse={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          onAddObject={handleAddObject}
        />

        <Canvas
          objects={canvasObjects}
          selectedObject={selectedObject}
          onSelectObject={setSelectedObject}
          onUpdateObject={handleUpdateObject}
          onDeleteObject={handleDeleteObject}
          zoom={zoom}
          showGrid={showGrid}
          snapToGrid={snapToGrid}
        />

        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col transition-all duration-300 ${
          rightSidebarCollapsed ? 'w-[60px]' : 'w-[320px]'
        }`}>
          {rightSidebarCollapsed ? (
            <div className="flex flex-col items-center py-4 gap-4">
              <button
                onClick={() => {
                  setRightSidebarCollapsed(false);
                  setActiveRightTab('properties');
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  setRightSidebarCollapsed(false);
                  setActiveRightTab('ai');
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveRightTab('properties')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeRightTab === 'properties'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Properties
                </button>
                <button
                  onClick={() => setActiveRightTab('ai')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeRightTab === 'ai'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  AI Assistant
                </button>
                <button
                  onClick={() => setRightSidebarCollapsed(true)}
                  className="px-3 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                {activeRightTab === 'properties' ? (
                  <PropertiesPanel
                    selectedObject={selectedObject}
                    onUpdateObject={handleUpdateObject}
                  />
                ) : (
                  <AIAssistant
                    canvasObjects={canvasObjects}
                    onAddObject={handleAddObject}
                    onUpdateObject={handleUpdateObject}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
