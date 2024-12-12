import { ColorSequence, COLORS } from '../types/colorMemory';

// Keep a consistent sequence for the entire game session
let masterSequence: ColorSequence[] = [];

export function resetMasterSequence(): void {
  masterSequence = [];
}

export function extendSequence(currentLength: number): ColorSequence[] {
  // If we're starting fresh, initialize the sequence
  if (masterSequence.length === 0) {
    const firstColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    masterSequence.push({
      color: firstColor.value,
      id: 0
    });
    return [...masterSequence];
  }

  // Add one new color to the existing sequence
  const usedColors = new Set(masterSequence.map(seq => seq.color));
  const availableColors = COLORS.filter(color => !usedColors.has(color.value));
  
  if (availableColors.length === 0) {
    // If we've used all colors, reset the available colors pool
    const lastUsedColor = masterSequence[masterSequence.length - 1].color;
    const newAvailableColors = COLORS.filter(color => color.value !== lastUsedColor);
    const nextColor = newAvailableColors[Math.floor(Math.random() * newAvailableColors.length)];
    
    masterSequence.push({
      color: nextColor.value,
      id: masterSequence.length
    });
  } else {
    // Add a new unused color
    const nextColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    masterSequence.push({
      color: nextColor.value,
      id: masterSequence.length
    });
  }

  return [...masterSequence];
}