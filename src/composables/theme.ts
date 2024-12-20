export const preferredDark = usePreferredDark()
export const isDark = useDark({
  initialValue: 'dark',
  storageKey: 'adibarra.com/theme',
})
export const toggleTheme = useToggle(isDark)
