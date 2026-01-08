
import React, { useState } from 'react';
import { Workout } from '../types';
import { saveWorkout } from '../services/storageService';
import { Plus, Dumbbell, Hash, Ruler, FileText, Calendar } from 'lucide-react';

interface WorkoutFormProps {
  onWorkoutAdded: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onWorkoutAdded }) => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState<number>(3);
  const [reps, setReps] = useState<number>(10);
  const [value, setValue] = useState<number>(0);
  const [unit, setUnit] = useState('Kg');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise) return;

    const newWorkout: Workout = {
      id: crypto.randomUUID(),
      date,
      exercise,
      sets,
      reps,
      value,
      unit,
      notes
    };

    saveWorkout(newWorkout);
    onWorkoutAdded();
    
    // Reset fields but keep unit and date
    setExercise('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
        <Plus className="text-blue-600" size={24} />
        Registar Treino
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <Calendar size={14} /> Data
          </label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <Dumbbell size={14} /> Exercício
          </label>
          <input 
            type="text" 
            placeholder="Ex: Supino, Corrida, Agachamento..."
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
              <Hash size={14} /> Séries
            </label>
            <input 
              type="number" 
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
              <Hash size={14} /> Repetições
            </label>
            <input 
              type="number" 
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
              <Ruler size={14} /> Medida
            </label>
            <input 
              type="number" 
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Unidade</label>
            <select 
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="Kg">Kg</option>
              <option value="Km">Km</option>
              <option value="Min">Min</option>
              <option value="Lb">Lb</option>
              <option value="M">M</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
          <FileText size={14} /> Notas
        </label>
        <textarea 
          placeholder="Alguma observação importante?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[80px]"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]"
      >
        Guardar Exercício
      </button>
    </form>
  );
};

export default WorkoutForm;
