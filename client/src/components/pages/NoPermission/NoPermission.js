import { Alert } from "react-bootstrap"

const NoPermission = () => {
    return (
        <Alert variant="danger">
            <Alert.Heading>No permission</Alert.Heading>
            <p>You have to log in first.</p>
        </Alert>
    )
}

export  default  NoPermission;