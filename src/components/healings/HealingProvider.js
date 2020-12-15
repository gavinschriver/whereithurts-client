import React, {useState} from "react"


export const HealingContext  = React.createContext()

export const HealingProvider = (props) => {
    const [healings, setHealings] = useState([])

    return (
        <HealingContext.Provider value={{healings}}>
            {props.children}
        </HealingContext.Provider>
    )


}