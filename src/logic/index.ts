import dayjs from 'dayjs'

export const isDark = useDark({
  initialValue: 'dark',
  storageKey: 'color-scheme',
})

export function toggleDark() {
  isDark.value = !isDark.value
}

export function formatDate(d: string | Date) {
  const date = dayjs(d)
  if (date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}
