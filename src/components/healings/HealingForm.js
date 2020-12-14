import React from 'react'
import BasicPage from '../layouts/BasicPage'
import FormPageLayout from '../layouts/FormPageLayout'

const HealingForm = (props) => {
    return (
        <BasicPage>
            <FormPageLayout>
                <div className="healingform">
                    <h1>My Dude. We gonna heal you right up</h1>
                </div>
            </FormPageLayout>
        </BasicPage>
    )
}

export default HealingForm
