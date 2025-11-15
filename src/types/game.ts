/**
 * Enum representing the four possible outcomes of a d100 skill roll.
 * Values are ordered from worst (0) to best (3) for easy comparison.
 */
export enum SuccessLevel {
  CRITICAL_FAILURE = 0,  // Rolled doubles on a failed check
  MODERATE_FAILURE = 1,  // Failed the check (roll > skill)
  MODERATE_SUCCESS = 2,  // Passed the check (roll ≤ skill)
  CRITICAL_SUCCESS = 3,  // Rolled doubles (or multiples of 10 if alt rule enabled) on a successful check
}

/**
 * Interface containing all calculated probabilities for an opposed roll.
 * All values are percentages (0-100).
 */
export interface Probabilities {
  winA: number;              // Overall win percentage for Skill A
  winB: number;              // Overall win percentage for Skill B
  tie: number;               // Tie/miss percentage (both fail or identical outcomes)
  winACritSuccess: number;   // Percentage of A's wins achieved via critical success
  winBCritSuccess: number;   // Percentage of B's wins achieved via critical success
  lossACritFailure: number;  // Percentage of A's losses due to their own critical failure
  lossBCritFailure: number;  // Percentage of B's losses due to their own critical failure
}
