import React from 'react';

interface SkillControlProps {
  label: string;
  skillId: string;
  skillValue: number;
  modifier: string;
  altCrit: boolean;
  accentColor: string;
  onSkillChange: (value: number) => void;
  onModifierChange: (value: string) => void;
  onAltCritToggle: () => void;
}

export const SkillControl: React.FC<SkillControlProps> = ({
  label,
  skillId,
  skillValue,
  modifier,
  altCrit,
  accentColor,
  onSkillChange,
  onModifierChange,
  onAltCritToggle,
}) => {
  const numModifier = parseInt(modifier, 10) || 0;
  const effectiveSkill = Math.max(5, skillValue + numModifier);

  const isAccentA = accentColor.includes('accent-a');

  return (
    <section aria-labelledby={`${skillId}-label`}>
      <div className="mb-6">
        <label htmlFor={skillId} className="flex justify-between mb-2.5 font-bold text-lg items-baseline">
          <span id={`${skillId}-label`}>{label}</span>
          <span className="text-sm font-normal">
            {skillValue}% {numModifier >= 0 ? '+' : '-'} {Math.abs(numModifier)} = 
            <strong className={`${isAccentA ? 'text-accent-a' : 'text-accent-b'} text-lg`}> {effectiveSkill}%</strong>
          </span>
        </label>
        <div className="flex items-center gap-4">
          <input
            id={skillId}
            type="range"
            min="1"
            max="100"
            value={skillValue}
            onChange={(e) => onSkillChange(Number(e.target.value))}
            className="flex-1"
          />
          <input 
            type="number"
            min="1"
            max="100"
            value={skillValue}
            onChange={(e) => onSkillChange(Number(e.target.value))}
            className="w-[70px] p-2 bg-bg border border-border text-text rounded-md text-base text-center font-bold font-mono"
            aria-label={`${label} value`}
          />
          <input 
            type="number"
            value={modifier}
            onChange={(e) => {
              const val = e.target.value;
              if (/^-?\d*$/.test(val)) {
                onModifierChange(val);
              }
            }}
            className="w-[70px] p-2 bg-bg border border-border text-text rounded-md text-base text-center font-bold font-mono"
            aria-label={`${label} modifier`}
          />
          <button 
            onClick={onAltCritToggle}
            className={`w-[70px] p-2 border rounded-md text-base text-center font-bold cursor-pointer transition-all duration-200 font-mono ${
              altCrit 
                ? `${isAccentA ? 'bg-accent-a border-accent-a' : 'bg-accent-b border-accent-b'} text-text`
                : 'bg-bg border-border text-text'
            }`}
            aria-pressed={altCrit}
            title="Toggle alternative critical success rule"
          >
            Crit++
          </button>
        </div>
      </div>
    </section>
  );
};
