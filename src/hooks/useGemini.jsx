import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const useGemini = (userPrompt) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAIResponse = async () => {
      setLoading(true);
      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
        });

        const generationConfig = {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: 'text/plain',
        };

        const chatSession = model.startChat({
          generationConfig,
          history: [],
        });

        // Improved prompt for movie recommendations
        const hardcodedPrompt = "Act as a movie recommendation AI based on previous prompt. Provide a list of less than 10 TMDB movie IDs separated by comma and nothing else.";
        const fullPrompt = `"${userPrompt}" ${hardcodedPrompt}`;

        const response = await chatSession.sendMessage(fullPrompt);
        const data=response.response.text();
        const res=data
        .split(',') 
        .map(str => parseInt(str.trim(), 10)); 
        setResult(res);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (userPrompt) {
      fetchAIResponse();
    }
  }, [userPrompt]);

  return { result, error, loading };
};

export default useGemini;
