import axios from "axios"

export default async function UserActivation({ params }: { params: { id: string } }) {

    await axios.get(`${process.env.API_ROUTE}/auth/activation/${params.id}`)

    return (
        <h1>{process.env.API_ROUTE}aa</h1>
    )
}