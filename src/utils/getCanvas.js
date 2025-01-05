import { canvasRoute } from "../axios/axios"
import getAuthToken from "./getAuthToken"

const getCanvas = async (id) => {
    try {
        const result = await canvasRoute.get(`/getcanvas/${id}`, {
            headers: {
                "auth-token": getAuthToken()
            }
        })
        console.log(result)
        return result.data.data
    } catch (error) {
        throw error
    }
}
export default getCanvas