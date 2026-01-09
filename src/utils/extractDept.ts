export function extractDeptFromEmail(email: string): string | null {
  const match = email.match(/^2023([A-Z]{2,4})\d+@svce\.ac\.in$/i);
  return match ? match[1]!.toUpperCase() : null;
}
