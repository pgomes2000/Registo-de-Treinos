
import { GoogleGenAI } from "@google/genai";
import { Workout } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeWorkoutProgress = async (workouts: Workout[]): Promise<string> => {
  if (workouts.length === 0) return "Comece a registar os seus treinos para receber uma análise personalizada!";

  const summary = workouts.slice(-10).map(w => 
    `${w.date}: ${w.exercise} - ${w.sets}x${w.reps} (${w.value}${w.unit})`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise o seguinte histórico de treinos e dê dicas curtas e motivadoras (em Português) para melhorar a performance. Fale sobre progressão de carga ou volume se aplicável:
      
      ${summary}`,
      config: {
        systemInstruction: "És um personal trainer experiente e motivador. As tuas respostas devem ser curtas, diretas e profissionais.",
        temperature: 0.7,
      }
    });

    return response.text || "Não foi possível gerar uma análise neste momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao contactar o Treinador IA.";
  }
};

export const suggestNextWorkout = async (workouts: Workout[]): Promise<string> => {
    const history = workouts.slice(-5).map(w => w.exercise).join(', ');
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Com base nos últimos exercícios realizados (${history}), sugere um exercício complementar para o próximo treino para garantir um desenvolvimento equilibrado do corpo. Justifica brevemente.`,
        config: {
          systemInstruction: "És um personal trainer focado em hipertrofia e saúde geral.",
          temperature: 0.7,
        }
      });
  
      return response.text || "Tente variar os seus exercícios hoje!";
    } catch (error) {
      return "Foque-se nos grandes grupos musculares hoje.";
    }
};
