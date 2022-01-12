import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const script = promisify(_script);

export const passHasher = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hashString = (await script(password, salt, 32)) as Buffer;
  return salt + '.' + hashString.toString('hex');
};

export const passRehasher = async (
  password: string,
  salt: string,
): Promise<string> => {
  const hashString = (await script(password, salt, 32)) as Buffer;
  return salt + '.' + hashString.toString('hex');
};
