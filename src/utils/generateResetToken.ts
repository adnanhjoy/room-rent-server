import * as crypto from 'crypto';

export const generateResetToken = (): string => {
  return crypto.randomBytes(30).toString('hex');
};
