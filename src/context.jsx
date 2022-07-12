import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    return (
        <Context.Provider value={{
            storeItems: storeItems,
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}