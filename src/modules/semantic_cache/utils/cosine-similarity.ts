export function cosineSimilarity(a: Float32Array, b: Float32Array) {
  // Calculates how similar two vectors are by calculating the angle between 
  // them in a multidimensional space
  // Formula: https://towardsdatascience.com/wp-content/uploads/2020/09/1LfW66-WsYkFqWc4XYJbEJg.png
  let dot = 0; // Product calculation
  let na = 0; // Vector A magnitude
  let nb = 0; // Vector B magnitude

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const result = dot / (Math.sqrt(na) * Math.sqrt(nb));
  if (na === 0 || nb === 0) return 0;
  return result;
}
