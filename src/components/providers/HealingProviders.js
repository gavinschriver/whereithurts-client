import React from 'react'
import { HealingProvider } from '../healings/HealingProvider'


const HealingProviders = (props) => {
    return (
        <HealingProvider>
            {props.children}
        </HealingProvider>
    )
}

export default HealingProviders