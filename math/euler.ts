
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

const countInversible = (phi: number): number => {
  if (isPrime(phi)) return phi - 1


  const primeFactors = Array
    .from(
      { length: phi - 2 }, 
      (_, i) => isPrime(i + 2) && phi % (i + 2) === 0
         ? i + 2
         : null
    )
    .filter((n) => n !== null) as number[]

  return new String(phi)
    .split("")
    .map(Number)
    .reduce((prev, curr, i) => 
      prev * (curr / primeFactors[i]), phi
    )
}
export { isPrime, countInversible };