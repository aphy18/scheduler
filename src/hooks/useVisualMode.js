import { useState } from 'react';

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    
    const transition = (newMode, error) => {

        
        if (error) {
          const newHistory = [...history];
          newHistory.pop();
          
          setHistory(prevHistory => [...newHistory, newMode]);
          setMode(newMode);
        } else {
          setHistory(prevHistory => [...prevHistory, newMode]);
          setMode(newMode);
        }
      };

      const back = () => {
        if (history.length > 1) {
          setMode(history[history.length - 2]);
          setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
        }
      };
      
      
    
    return { mode, transition, back };
}

  