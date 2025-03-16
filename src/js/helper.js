import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (Status: ${res.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const decimalToMixedFraction = function (decimal) {
  if (Number.isInteger(decimal)) return `${decimal}`; // If it's a whole number, return it as is

  let wholeNumber = Math.floor(decimal); // Extract the whole number part
  let decimalPart = decimal - wholeNumber; // Get the fractional part

  let tolerance = 1.0e-6; // Precision tolerance
  let numerator = 1;
  let denominator = 1;

  while (Math.abs(numerator / denominator - decimalPart) > tolerance) {
    if (numerator / denominator < decimalPart) {
      numerator++;
    } else {
      denominator++;
      numerator = Math.round(decimalPart * denominator);
    }
  }

  // Simplify fraction using GCD
  let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  let commonDivisor = gcd(numerator, denominator);
  numerator /= commonDivisor;
  denominator /= commonDivisor;

  // Return mixed fraction format
  return wholeNumber > 0
    ? `${wholeNumber} ${numerator}/${denominator}`
    : `${numerator}/${denominator}`;
};
