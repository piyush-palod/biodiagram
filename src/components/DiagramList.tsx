import React, { useEffect, useState } from 'react';
import { Plus, Search, FileText, Calendar, Users, Loader2, LogOut } from 'lucide-react';
import { supabase, Diagram } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface DiagramListProps {
  onSelectDiagram: (diagram: Diagram | null) => void;
}

export const DiagramList: React.FC<DiagramListProps> = ({ onSelectDiagram }) => {
  const { user, signOut } = useAuth();
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDiagrams();
  }, [user]);

  const loadDiagrams = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('diagrams')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setDiagrams(data || []);
    } catch (error) {
      console.error('Error loading diagrams:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewDiagram = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('diagrams')
        .insert({
          user_id: user.id,
          title: 'Untitled Diagram',
          description: '',
          canvas_data: [],
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setDiagrams([data, ...diagrams]);
        onSelectDiagram(data);
      }
    } catch (error) {
      console.error('Error creating diagram:', error);
    }
  };

  const filteredDiagrams = diagrams.filter(
    (diagram) =>
      diagram.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagram.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return 'Today';
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Diagram AI</h1>
              <p className="text-sm text-gray-500">My Diagrams</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search diagrams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={createNewDiagram}
            className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Diagram
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        ) : filteredDiagrams.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {searchTerm ? 'No diagrams found' : 'No diagrams yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Create your first biology diagram to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={createNewDiagram}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Your First Diagram
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDiagrams.map((diagram) => (
              <div
                key={diagram.id}
                onClick={() => onSelectDiagram(diagram)}
                className="bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded-t-lg flex items-center justify-center border-b border-gray-200">
                  <FileText className="w-12 h-12 text-green-400 group-hover:text-green-500 transition-colors" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1 truncate">{diagram.title}</h3>
                  {diagram.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{diagram.description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(diagram.updated_at)}
                    </div>
                    {diagram.is_public && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Public
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
