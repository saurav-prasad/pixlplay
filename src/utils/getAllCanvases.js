import { canvasRoute } from "../axios/axios";
import getAuthToken from "./getAuthToken";
import sortArray from "./sortArray";

const getAllCanvases = async () => {
    try {
        const response = await canvasRoute.get("/getallcanvases", {
            headers: {
                "auth-token": getAuthToken(),
            },
        });
        const sortedArr = sortArray(response.data.data);
        return sortedArr
    } catch (error) {
        throw error
    }
}
export default getAllCanvases