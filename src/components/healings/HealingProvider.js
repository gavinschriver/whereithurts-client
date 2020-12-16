import React, { useState, createContext } from "react"
import { request, BASE_URL } from "../../utils/request";

const resourceURL = `${BASE_URL}healings`

export const HealingContext  = createContext()

export const HealingProvider = (props) => {
    const [healingData, setHealingData] = useState({ healings: [] })
    
    const getHealingData = async () => {
        const response = await request(`${resourceURL}`)
        const healingData = await response.json()
        setHealingData(healingData)
    }

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

    const updateHealing = async (healingId, updatedHealing) => {
        return await request(`${resourceURL}/${healingId}`, "PUT", updatedHealing)
    }

    return (
        <HealingContext.Provider value={{healingData, getHealingData, getHealingById, createHealing, updateHealing}}>
            {props.children}
        </HealingContext.Provider>
    )


}