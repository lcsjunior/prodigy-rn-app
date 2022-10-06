import { coalesce } from './array-helpers';

const isBlank = (str) =>
  str === null || str === undefined || str.trim().length === 0;

const getInitials = (name, { maxInitials }) => {
  return name
    .split(/\s/)
    .map((part) => part.substring(0, 1).toUpperCase())
    .filter((v) => !!v)
    .slice(0, maxInitials)
    .join('')
    .toUpperCase();
};

const getUserInitiais = (...args) => {
  const name = coalesce(args);
  return getInitials(name, {
    maxInitials: 2,
  });
};

export { isBlank, getInitials, getUserInitiais };
