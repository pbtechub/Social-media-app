import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) => {

    const [mode, setMode] = useState(JSON.parse(localStorage.getItem('changeMode' || false)))

    const toggleMode = () => {
        setMode(!mode)
    }

    useEffect(() => {
        localStorage.setItem('changeMode', JSON.stringify(mode));
      }, [mode])

    return (
        <DarkModeContext.Provider value={{mode, toggleMode}}>
            {children}
        </DarkModeContext.Provider>
    )

}