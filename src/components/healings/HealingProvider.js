import React, {useState} from "react"


export const HealingContext  = React.createContext()

export const HealingProvider = (props) => {
    const [healings, setHealing] = useState([])

    return (
        <HealingContext.Provider value={{healings}}>
            {props.children}
        </HealingContext.Provider>
    )


}