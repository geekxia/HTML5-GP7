import React from 'react'

export default (props) => {
  const { theme, onTheme } = props
  const change = ev => {
    const key = ev.target.name
    const value = ev.target.value
    onTheme({ ...theme, [key]: value })
  }
  return (
    <footer>
      <span>前景色：</span>
      <input
        type='color'
        name='color'
        value={theme.color}
        onChange={ev=>change(ev)}
      />
      <span>背景色：</span>
      <input
        type="color"
        name='background'
        value={theme.background}
        onChange={ev=>change(ev)}
      />
    </footer>
  )
}
