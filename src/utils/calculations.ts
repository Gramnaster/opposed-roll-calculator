import { SuccessLevel, Probabilities } from '../types/game';

/**
 * Determines the success level of a d100 skill roll.
 * 
 * Success determination:
 * - Roll ≤ skill value = success
 * - Roll > skill value = failure
 * 
 * Critical success conditions:
 * - Standard: doubles (11, 22, 33...99) on a successful roll
 * - Alternative (if enabled): also includes multiples of 10 (10, 20...100) on successful rolls
 * 
 * Critical failure:
 * - Doubles (11, 22, 33...99) on a failed roll
 * 
 * @param skill - The skill value (1-100)
 * @param roll - The die roll result (1-100)
 * @param useAltCrit - Whether to use alternative critical rules (multiples of 10)
 * @returns The success level enum value
 */
export const getOutcome = (skill: number, roll: number, useAltCrit: boolean): SuccessLevel => {
  const isSuccess = roll <= skill;
  // Doubles: 11, 22, 33, 44, 55, 66, 77, 88, 99
  const isDouble = roll > 0 && roll < 100 && roll % 11 === 0;
  // Multiples of 10: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  const isMultipleOfTen = roll > 0 && roll % 10 === 0;

  const isCritSuccessCondition = isDouble || (useAltCrit && isMultipleOfTen);

  if (isSuccess && isCritSuccessCondition) return SuccessLevel.CRITICAL_SUCCESS;
  if (isSuccess && !isCritSuccessCondition) return SuccessLevel.MODERATE_SUCCESS;
  if (!isSuccess && isDouble) return SuccessLevel.CRITICAL_FAILURE;
  return SuccessLevel.MODERATE_FAILURE;
};

/**
 * Calculates win probabilities for opposed d100 skill rolls using exhaustive enumeration.
 * 
 * Winner determination rules:
 * 1. Both fail their roll → Tie (miss)
 * 2. Higher success level wins (Critical > Moderate > Failure)
 * 3. If same success level → higher roll wins
 * 4. If identical rolls and success levels → Tie
 * 
 * Mathematical approach:
 * - Enumerates all 10,000 possible outcomes (100 × 100)
 * - Counts favorable outcomes for each combatant
 * - Converts counts to percentages: (count / 10000) × 100
 * 
 * @param skillA - Skill A's effective skill value (1-100)
 * @param skillB - Skill B's effective skill value (1-100)
 * @param altCritA - Whether Skill A uses alternative critical rules
 * @param altCritB - Whether Skill B uses alternative critical rules
 * @returns Object containing all probability percentages
 */
export const calculateProbabilities = (skillA: number, skillB: number, altCritA: boolean, altCritB: boolean): Probabilities => {
  let winsA = 0;
  let winsB = 0;
  let ties = 0;
  
  // Track wins specifically by critical success or opponent's critical failure
  let winACritSuccess = 0;
  let winBCritSuccess = 0;
  let lossACritFailure = 0; 
  let lossBCritFailure = 0; 

  // Total possible outcomes: 100 rolls for A × 100 rolls for B = 10,000
  const totalOutcomes = 100 * 100;

  for (let rollA = 1; rollA <= 100; rollA++) {
    for (let rollB = 1; rollB <= 100; rollB++) {
      const outcomeA = getOutcome(skillA, rollA, altCritA);
      const outcomeB = getOutcome(skillB, rollB, altCritB);

      let winner: 'A' | 'B' | 'TIE' | null = null;
      
      // Both failed their rolls → nobody wins (miss/tie)
      if (outcomeA < SuccessLevel.MODERATE_SUCCESS && outcomeB < SuccessLevel.MODERATE_SUCCESS) {
          winner = 'TIE';
      // Compare success levels (higher enum value = better outcome)
      } else if (outcomeA > outcomeB) {
        winner = 'A';
      } else if (outcomeB > outcomeA) {
        winner = 'B';
      // Same success level → higher roll wins (tiebreaker)
      } else {
        if (rollA > rollB) {
          winner = 'A';
        } else if (rollB > rollA) {
          winner = 'B';
        } else {
          winner = 'TIE';
        }
      }

      // Tally the outcome and track special cases
      if (winner === 'A') {
        winsA++;
        // Track if A won with a critical success
        if (outcomeA === SuccessLevel.CRITICAL_SUCCESS) {
          winACritSuccess++;
        }
        // Track if B lost due to critical failure
        if (outcomeB === SuccessLevel.CRITICAL_FAILURE) {
          lossBCritFailure++;
        }
      } else if (winner === 'B') {
        winsB++;
        // Track if B won with a critical success
        if (outcomeB === SuccessLevel.CRITICAL_SUCCESS) {
          winBCritSuccess++;
        }
        // Track if A lost due to critical failure
        if (outcomeA === SuccessLevel.CRITICAL_FAILURE) {
          lossACritFailure++;
        }
      } else { // winner === 'TIE'
        ties++;
      }
    }
  }

  // Convert counts to percentages
  // Formula: (favorable_outcomes / total_outcomes) × 100
  return {
    winA: (winsA / totalOutcomes) * 100,
    winB: (winsB / totalOutcomes) * 100,
    tie: (ties / totalOutcomes) * 100,
    winACritSuccess: (winACritSuccess / totalOutcomes) * 100,
    winBCritSuccess: (winBCritSuccess / totalOutcomes) * 100,
    lossACritFailure: (lossACritFailure / totalOutcomes) * 100,
    lossBCritFailure: (lossBCritFailure / totalOutcomes) * 100,
  };
};
