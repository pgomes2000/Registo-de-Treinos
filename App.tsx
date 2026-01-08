
import React, { useState, useEffect } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutHistory from './components/WorkoutHistory';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import { getWorkouts } from './services/storageService';
import { Workout } from './types';
import { LayoutDashboard, History, PlusCircle, Settings, Dumbbell } from 'lucide-react';

const App: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<'dash' | 'history' | 'add'>('dash');

  const refreshWorkouts = () => {
    setWorkouts(getWorkouts());
  };

  useEffect(() => {
    refreshWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-0 md:pt-4">
      {/* Desktop Navigation Side/Top */}
      <header className="max-w-5xl mx-auto w-full px-4 mb-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Dumbbell size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">FitTrack <span className="text-blue-600">AI</span></h1>
              <p className="text-xs text-slate-500 font-medium">O seu parceiro de treino inteligente</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center bg-white rounded-full p-1 border border-slate-200 shadow-sm">
             <button 
              onClick={() => setActiveTab('dash')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'dash' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               <LayoutDashboard size={18} /> Dashboard
             </button>
             <button 
              onClick={() => setActiveTab('add')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               <PlusCircle size={18} /> Novo Treino
             </button>
             <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               <History size={18} /> Histórico
             </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full px-4 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {activeTab === 'dash' && (
            <>
              <Dashboard workouts={workouts} />
              <AICoach workouts={workouts} />
            </>
          )}

          {activeTab === 'add' && (
            <div className="max-w-2xl mx-auto w-full">
              <WorkoutForm onWorkoutAdded={() => { refreshWorkouts(); setActiveTab('dash'); }} />
            </div>
          )}

          {activeTab === 'history' && (
            <WorkoutHistory workouts={workouts} onWorkoutDeleted={refreshWorkouts} />
          )}
        </div>

        {/* Desktop Sidebar with AI stuff if in History */}
        {activeTab === 'history' && workouts.length > 0 && (
           <aside className="hidden lg:block w-80">
              <AICoach workouts={workouts} />
           </aside>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center md:hidden z-50">
        <button 
          onClick={() => setActiveTab('dash')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dash' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <LayoutDashboard size={22} />
          <span className="text-[10px] font-bold">Resumo</span>
        </button>
        <button 
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center gap-1 bg-blue-600 text-white p-3 rounded-full -mt-10 shadow-lg shadow-blue-200 transform transition-transform active:scale-95`}
        >
          <PlusCircle size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <History size={22} />
          <span className="text-[10px] font-bold">Histórico</span>
        </button>
      </div>
    </div>
  );
};

export default App;
