import { canvasRoute } from "../axios/axios";
import getAuthToken from "./getAuthToken";

const editCanvasName = async (id, newName) => {
    try {
        const updatedName = await canvasRoute.post(
            `/updatecanvasname/${id}`,
            { name: newName },
            { headers: { "auth-token": getAuthToken() } }
        );
        return updatedName.data.data
    } catch (error) {
        throw error
    }
}

export default editCanvasName