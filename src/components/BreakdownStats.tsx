import React from 'react';
import { Probabilities } from '../types/game';

interface BreakdownStatsProps {
  probabilities: Probabilities;
}

export const BreakdownStats: React.FC<BreakdownStatsProps> = ({ probabilities }) => {
  return (
    <div className="flex justify-between gap-5 mt-8 flex-wrap">
      <div className="flex-1 min-w-[200px] bg-bg p-5 rounded-lg border border-border">
        <h4 className="m-0 mb-4 font-bold text-base text-accent-a border-b border-border pb-2.5">
          Skill A Breakdown
        </h4>
        <div className="flex justify-between text-sm mb-2.5 leading-snug">
          <span className="opacity-80 pr-2.5">Win by Crit Success</span>
          <strong>{probabilities.winACritSuccess.toFixed(2)}%</strong>
        </div>
        <div className="flex justify-between text-sm mb-2.5 leading-snug">
          <span className="opacity-80 pr-2.5">Lose by Crit Failure</span>
          <strong>{probabilities.lossACritFailure.toFixed(2)}%</strong>
        </div>
      </div>
      <div className="flex-1 min-w-[200px] bg-bg p-5 rounded-lg border border-border">
        <h4 className="m-0 mb-4 font-bold text-base text-accent-b border-b border-border pb-2.5">
          Skill B Breakdown
        </h4>
        <div className="flex justify-between text-sm mb-2.5 leading-snug">
          <span className="opacity-80 pr-2.5">Win by Crit Success</span>
          <strong>{probabilities.winBCritSuccess.toFixed(2)}%</strong>
        </div>
        <div className="flex justify-between text-sm mb-2.5 leading-snug">
          <span className="opacity-80 pr-2.5">Lose by Crit Failure</span>
          <strong>{probabilities.lossBCritFailure.toFixed(2)}%</strong>
        </div>
      </div>
    </div>
  );
};
