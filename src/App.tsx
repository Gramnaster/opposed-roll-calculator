import React, { useState, useMemo } from 'react';
import { SkillControl } from './components/SkillControl';
import { ProbabilityBar } from './components/ProbabilityBar';
import { BreakdownStats } from './components/BreakdownStats';
import { Rules } from './components/Rules';
import { calculateProbabilities } from './utils/calculations';

export const App = () => {
  const [skillA, setSkillA] = useState(50);
  const [skillB, setSkillB] = useState(50);
  const [modifierA, setModifierA] = useState('0');
  const [modifierB, setModifierB] = useState('0');
  const [altCritA, setAltCritA] = useState(false);
  const [altCritB, setAltCritB] = useState(false);

  const numModifierA = parseInt(modifierA, 10) || 0;
  const numModifierB = parseInt(modifierB, 10) || 0;

  const effectiveSkillA = Math.max(5, skillA + numModifierA);
  const effectiveSkillB = Math.max(5, skillB + numModifierB);

  const probabilities = useMemo(() => calculateProbabilities(effectiveSkillA, effectiveSkillB, altCritA, altCritB), [effectiveSkillA, effectiveSkillB, altCritA, altCritB]);

  return (
    <main className="bg-surface p-8 rounded-xl w-full max-w-[750px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-border mb-5">
      <h1 className="text-center mb-8 text-text font-bold uppercase tracking-wide">
        OPPOSED ROLL CALCULATOR
      </h1>

      <SkillControl
        label="Skill A"
        skillId="skillA"
        skillValue={skillA}
        modifier={modifierA}
        altCrit={altCritA}
        accentColor="var(--color-accent-a)"
        onSkillChange={setSkillA}
        onModifierChange={setModifierA}
        onAltCritToggle={() => setAltCritA(!altCritA)}
      />

      <SkillControl
        label="Skill B"
        skillId="skillB"
        skillValue={skillB}
        modifier={modifierB}
        altCrit={altCritB}
        accentColor="var(--color-accent-b)"
        onSkillChange={setSkillB}
        onModifierChange={setModifierB}
        onAltCritToggle={() => setAltCritB(!altCritB)}
      />

      <section className="mt-8" aria-live="polite">
        <h2 className="text-center font-normal mb-5 uppercase tracking-wide">
          Probability of Winning
        </h2>
        <ProbabilityBar probabilities={probabilities} />
        <BreakdownStats probabilities={probabilities} />
      </section>
      
      <Rules />
    </main>
  );
};
