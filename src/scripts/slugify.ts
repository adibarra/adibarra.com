const rAccents = /[\u0300-\u036F]/g
// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001F]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

export function slugify(str: string): string {
  return str.normalize('NFKD')
  // remove accents
    .replace(rAccents, '')
  // remove control characters
    .replace(rControl, '')
  // replace special characters
    .replace(rSpecial, '-')
  // remove duplicate separators
    .replace(/-{2,}/g, '-')
  // remove prefixed and trailing separators
    .replace(/^-+|-+$/g, '')
  // doesn't start with a number
    .replace(/^(\d)/, '_$1')
  // lowercase
    .toLowerCase()
}
