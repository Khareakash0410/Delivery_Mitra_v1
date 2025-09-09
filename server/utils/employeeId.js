import { v4 as uuidv4 } from 'uuid';

export const generateUniqueEmpId = () => {
  return `EMP${uuidv4().split('-')[0].toUpperCase()}`; // e.g. EMPA1B2C3D4
};