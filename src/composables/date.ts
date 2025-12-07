import dayjs from 'dayjs'

export function formatDate(d: string | Date) {
  const date = dayjs(d)
  if (date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}

export function getYear(a: Date | string | number) {
  return new Date(a).getFullYear()
}

export function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}

export function parseYear(d: any) {
  if (!d) return Number.NEGATIVE_INFINITY
  const s = String(d).trim()
  const match = s.match(/(\d{4})/)
  if (!match) return Number.NEGATIVE_INFINITY
  return Number(match[1])
}
