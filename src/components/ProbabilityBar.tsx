import React from 'react';
import { Probabilities } from '../types/game';

interface ProbabilityBarProps {
  probabilities: Probabilities;
}

export const ProbabilityBar: React.FC<ProbabilityBarProps> = ({ probabilities }) => {
  const getWidthClass = (width: number) => width < 8 ? 'text-[0px]' : 'text-sm';
  
  return (
    <>
      <div 
        className="flex h-10 rounded-lg overflow-hidden bg-bg mb-4" 
        role="progressbar" 
        aria-label={`Skill A wins ${probabilities.winA.toFixed(1)}%, Skill B wins ${probabilities.winB.toFixed(1)}%, Tie / Miss ${probabilities.tie.toFixed(1)}%`} 
        aria-valuemin={0} 
        aria-valuemax={100}
      >
        <div 
          className={`bg-accent-a flex items-center justify-center text-white font-bold ${getWidthClass(probabilities.winA)} [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300 whitespace-nowrap overflow-hidden`}
          style={{ width: `${probabilities.winA}%` }}
        >
          {`${probabilities.winA.toFixed(1)}%`}
        </div>
        <div 
          className={`bg-accent-b flex items-center justify-center text-white font-bold ${getWidthClass(probabilities.winB)} [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300 whitespace-nowrap overflow-hidden`}
          style={{ width: `${probabilities.winB}%` }}
        >
          {`${probabilities.winB.toFixed(1)}%`}
        </div>
        <div 
          className={`bg-tie flex items-center justify-center text-white font-bold ${getWidthClass(probabilities.tie)} [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300 whitespace-nowrap overflow-hidden`}
          style={{ width: `${probabilities.tie}%` }}
        >
          {`${probabilities.tie.toFixed(1)}%`}
        </div>
      </div>
      <div className="flex justify-center gap-5 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-accent-a rounded-sm"></div>
          <span>Skill A Wins: {probabilities.winA.toFixed(2)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-accent-b rounded-sm"></div>
          <span>Skill B Wins: {probabilities.winB.toFixed(2)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-tie rounded-sm"></div>
          <span>Tie / Miss: {probabilities.tie.toFixed(2)}%</span>
        </div>
      </div>
    </>
  );
};
