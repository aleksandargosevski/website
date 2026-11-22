export const useShortcuts = () => {
  const enabled = useLocalStorage('keyboard-shortcuts-enabled', true)
  const isHelpOpen = useState('keyboard-shortcuts-help-open', () => false)

  const openHelp = () => {
    isHelpOpen.value = true
  }

  return { enabled, isHelpOpen, openHelp }
}
