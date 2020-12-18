import React from "react"
import BasicPage from "../layouts/BasicPage"
import Alert from "../ui/Alert"

const UnauthorizedPage = (props) => {
    return (
        <BasicPage>
            <div className="basicwrapper">
                <main className="unauthorizedpage">
                    <div className="unauthorizedpage__alert">
                        <Alert>
                            Sorry, you don't have permission to access this page.
                        </Alert>
                    </div>
                </main>
            </div>
        </BasicPage>
    )
}

export default UnauthorizedPage