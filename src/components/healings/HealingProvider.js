import React, { useState, createContext } from "react"
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}healings`

export const HealingContext  = createContext()

export const HealingProvider = (props) => {
    const [healings, setHealings] = useState([])

    const getHealingById = async (healingId) => {
        const response = await request(`${resourceURL}/${healingId}`);
        const healing = await response.json();
        return healing
    };
    
    const createHealing = async (newHealing) => {
        const response = await request(`${resourceURL}`, "POST", newHealing)
        const healing = await response.json();
        return healing
    }

    return (
        <HealingContext.Provider value={{healings, getHealingById, createHealing}}>
            {props.children}
        </HealingContext.Provider>
    )


}