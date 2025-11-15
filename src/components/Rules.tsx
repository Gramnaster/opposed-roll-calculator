import React from 'react';

export const Rules: React.FC = () => {
  return (
    <section className="mt-10 text-sm leading-relaxed opacity-80">
      <h3 className="font-normal border-b border-border pb-2 mb-4 uppercase tracking-wider">
        Calculation Rules
      </h3>
      <ul className="pl-5 m-0 list-disc">
        <li className="mb-2">
          <strong>Success Levels (highest to lowest):</strong> Critical Success, Moderate Success, Moderate Failure, Critical Failure.
        </li>
        <li className="mb-2">
          <strong>Moderate Success/Failure:</strong> Roll is equal to or under / over effective skill value.
        </li>
        <li className="mb-2">
          <strong>Critical Success/Failure:</strong> Roll is a double (11, 22, .. 99) and is a success/failure.
        </li>
        <li className="mb-2">
          <strong>Crit:</strong> When active, rolls ending in 0 (10, 20, .. 100) also count as a Critical Success if the roll succeeds.
        </li>
        <li className="mb-2">
          <strong>Winner:</strong> The combatant with the higher success level wins.
        </li>
        <li className="mb-2">
          <strong>Miss Condition:</strong> If both combatants fail their roll, it is a "Miss" and no one wins.
        </li>
        <li className="mb-2">
          <strong>Tie-Breaker:</strong> If success levels are equal, the higher roll wins.
        </li>
      </ul>
    </section>
  );
};
