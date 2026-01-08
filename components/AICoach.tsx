
import React, { useState, useEffect } from 'react';
import { Workout } from '../types';
import { analyzeWorkoutProgress, suggestNextWorkout } from '../services/geminiService';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';

interface AICoachProps {
  workouts: Workout[];
}

const AICoach: React.FC<AICoachProps> = ({ workouts }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const loadAIInfo = async () => {
    if (workouts.length === 0) return;
    setLoading(true);
    try {
      const [analysisResult, suggestionResult] = await Promise.all([
        analyzeWorkoutProgress(workouts),
        suggestNextWorkout(workouts)
      ]);
      setAnalysis(analysisResult);
      setSuggestion(suggestionResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAIInfo();
  }, [workouts.length]);

  if (workouts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BrainCircuit size={100} />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="text-yellow-300" size={20} />
              Treinador IA - Análise de Progresso
            </h3>
            <button 
              onClick={loadAIInfo} 
              disabled={loading}
              className="p-1 hover:bg-white/20 rounded transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
          
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse w-1/2"></div>
            </div>
          ) : (
            <p className="text-indigo-50 leading-relaxed text-sm">
              {analysis}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="text-slate-800 font-bold flex items-center gap-2 mb-2">
          <BrainCircuit className="text-indigo-500" size={18} />
          Sugestão para o Próximo Treino
        </h4>
        {loading ? (
           <div className="h-4 bg-slate-100 rounded animate-pulse w-full mt-2"></div>
        ) : (
           <p className="text-slate-600 text-sm">
            {suggestion}
           </p>
        )}
      </div>
    </div>
  );
};

export default AICoach;
