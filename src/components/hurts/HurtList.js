import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import BasicPage from "../layouts/BasicPage"
import ListPage from "../layouts/ListPage"
import Button from "../ui/Button"
import { HurtContext } from "./HurtProvider"

const HurtList = () => {
    const current_user_id = parseInt(localStorage.getItem("patient_id"))
    const { hurts, getHurtsByPatientId } = useContext(HurtContext)

    const history = useHistory()
    
    useEffect(() => {
        getHurtsByPatientId(current_user_id)
    }, [])

    return (
        <BasicPage>
            <div className="basicwrapper">
                <ListPage resource="Hurt Locker" onClick={(e) => { e.preventDefault(); history.push(`hurts/new`)}}>
                    <div className="hurtlist">
                        {
                            hurts.map((h) => {
                                return (
                                    <div className={h.is_active ? "listitem" : "listitem--inactive" } key={h.id}>
                                        <Button onClick={() => history.push(`hurts/${h.id}`)}>
                                            <div className="col">
                                                <h3>Name: {h.name}</h3>
                                                <h3>Bodypart: {h.bodypart.name}</h3>
                                            </div>
                                            <div className="col align-text-right">
                                                <h3>Last update: {h.last_update}</h3>
                                                <h3>Healings: {h.healing_count}</h3>
                                            </div>
                                        </Button>

                                    </div>
                                )
                            })
                        }
                    </div>
                </ListPage>
            </div>
        </BasicPage>
    )
}

export default HurtList