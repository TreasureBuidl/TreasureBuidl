import { createContext, useState } from 'react'

const TreasureModalContext = createContext({
  isShowing: false,
  toggle: () => {},
})

export const TreasureModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false)

  const toggle = () => {
    setIsShowing(!isShowing)
  }

  return (
    <TreasureModalContext.Provider value={{ isShowing, toggle }}>
      {children}
    </TreasureModalContext.Provider>
  )
}

export { TreasureModalContext }
