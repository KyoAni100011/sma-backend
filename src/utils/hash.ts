import argon2 from 'argon2';

async function hashPassword(password: string) {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}

async function verifyPassword(hashedPassword: string, password: string) {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
}

export {hashPassword, verifyPassword}
