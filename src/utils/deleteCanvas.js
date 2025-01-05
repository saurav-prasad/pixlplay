import { canvasRoute } from "../axios/axios";
import getAuthToken from "./getAuthToken";

const deleteCanvas = async (id) => {
    try {
        const deletedCanvas = await canvasRoute.post(
            `/deletecanvas/${id}`,
            {},
            { headers: { "auth-token": getAuthToken() } }
        );
        return deletedCanvas.data.data
    } catch (error) {
        throw error
    }
}

export default deleteCanvas