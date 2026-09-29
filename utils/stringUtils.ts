export function generateRandomString(length: number): string {
  return Math.random().toString(36).substring(2, length + 2);
}
export function generateEmail() {
    return `user${Date.now()}@test.com`;
}

export function generaterandomNumber() {
    return Math.floor(Math.random() * 1000000);
}
