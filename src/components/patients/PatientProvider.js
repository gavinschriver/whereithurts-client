import React, { createContext, useState } from 'react'
import { request, BASE_URL } from '../../utils/request';

const resourceURL = `${BASE_URL}patients`

export const PatientContext = createContext()

export const PatientProvider = props => {
    const getPatientById = async (patientId) => {
        const response = await request(`${resourceURL}/${patientId}`)
        const patient = await response.json()
        return patient
    }

    return (
        <PatientContext.Provider value={{ getPatientById }}>
            {props.children}
        </PatientContext.Provider>
    )

}

