
// ∀n ∈ N*, 𝜑(n) le nombre d'élements de Zn*. 
// C'est donc le nombre d'élements inversibles de Zn*.

const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const limit = Math.sqrt(n);

  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

export { isPrime };