
import React from 'react';
import { Workout } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Activity, Award } from 'lucide-react';

interface DashboardProps {
  workouts: Workout[];
}

const Dashboard: React.FC<DashboardProps> = ({ workouts }) => {
  const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Aggregate data for chart
  const data = sortedWorkouts.slice(-15).map(w => ({
    name: new Date(w.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }),
    val: w.value,
    exercise: w.exercise
  }));

  const totalSessions = new Set(workouts.map(w => w.date)).size;
  const totalVolume = workouts.reduce((acc, curr) => acc + (curr.value * curr.sets * curr.reps), 0);
  const mostFrequentExercise = workouts.length > 0 
    ? Object.entries(workouts.reduce((acc: any, curr) => {
        acc[curr.exercise] = (acc[curr.exercise] || 0) + 1;
        return acc;
      }, {})).sort((a: any, b: any) => b[1] - a[1])[0][0]
    : 'Nenhum';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <Activity size={24} />
          </div>
          <span className="text-slate-500 text-sm font-medium">Sessões Totais</span>
          <span className="text-2xl font-bold text-slate-800">{totalSessions}</span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
            <TrendingUp size={24} />
          </div>
          <span className="text-slate-500 text-sm font-medium">Volume Total Estimado</span>
          <span className="text-2xl font-bold text-slate-800">{totalVolume.toLocaleString()}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
            <Award size={24} />
          </div>
          <span className="text-slate-500 text-sm font-medium">Mais Frequente</span>
          <span className="text-2xl font-bold text-slate-800 truncate w-full px-2">{mostFrequentExercise}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="text-blue-500" size={20} />
          Progresso Recente (Carga/Distância)
        </h3>
        <div className="h-[300px] w-full">
          {workouts.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any, name: any, props: any) => [value, props.payload.exercise]}
                />
                <Line 
                  type="monotone" 
                  dataKey="val" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 italic">
              Registe os seus treinos para ver o gráfico de progresso
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
