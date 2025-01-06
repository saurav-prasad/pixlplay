import { canvasRoute } from "../axios/axios";
import getAuthToken from "./getAuthToken";

const updateCanvas = async (id, lines) => {
    try {
        const result = await canvasRoute.post(
            `/updatecanvas/${id}`,
            {
                canvas: lines,
            },
            { headers: { "auth-token": getAuthToken() } }
        );
        return result.data
    } catch (error) {
        throw error
    }
}
export default updateCanvas