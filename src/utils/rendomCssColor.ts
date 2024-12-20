export const getRandomCssColor = (): string => {
    const randomValue = () => Math.floor(Math.random() * 256); // Generate a random number between 0 and 255
    const r = randomValue();
    const g = randomValue();
    const b = randomValue();

    return `rgb(${r}, ${g}, ${b})`; // Return CSS color in "rgb(r, g, b)" format
};