
import React from 'react';
import { Workout } from '../types';
import { Trash2, Calendar, Edit3 } from 'lucide-react';
import { deleteWorkout } from '../services/storageService';

interface WorkoutHistoryProps {
  workouts: Workout[];
  onWorkoutDeleted: () => void;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts, onWorkoutDeleted }) => {
  const sorted = [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = (id: string) => {
    if (window.confirm('Tem a certeza que deseja eliminar este registo?')) {
      deleteWorkout(id);
      onWorkoutDeleted();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Histórico de Treinos</h2>
      {sorted.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400">
          Ainda não há treinos registados. Comece agora!
        </div>
      ) : (
        <div className="grid gap-4">
          {sorted.map((w) => (
            <div key={w.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center group transition-all hover:border-blue-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">
                  <Calendar size={12} />
                  {new Date(w.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{w.exercise}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                    {w.sets} Séries
                  </span>
                  <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                    {w.reps} Reps
                  </span>
                  <span className="px-2 py-1 bg-blue-50 rounded text-xs font-bold text-blue-700">
                    {w.value} {w.unit}
                  </span>
                </div>
                {w.notes && (
                  <p className="text-sm text-slate-500 mt-3 italic border-l-2 border-slate-200 pl-3">
                    {w.notes}
                  </p>
                )}
              </div>
              <button 
                onClick={() => handleDelete(w.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
