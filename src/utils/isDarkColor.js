function isDarkColor(color) {
  // Convert the color to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate brightness (standard formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is dark
  return brightness < 128;
}

export default isDarkColor;