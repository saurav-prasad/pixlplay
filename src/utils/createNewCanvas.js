import { faker } from "@faker-js/faker";
import { canvasRoute } from "../axios/axios";
import getAuthToken from './getAuthToken'

const randomStringFunctions = [
    faker.animal.cat,
    faker.animal.bird,
    faker.animal.cetacean,
    faker.animal.cow,
    faker.animal.crocodilia,
    faker.animal.dog,
    faker.book.series,
    faker.book.title,
    faker.food.dish,
    faker.food.fruit,
    faker.food.spice,
    faker.food.vegetable,
    faker.location.city,
    faker.location.continent,
    faker.location.country,
    faker.music.artist,
    faker.music.songName,
    faker.vehicle.bicycle,
    faker.vehicle.manufacturer,
    faker.vehicle.model,
    faker.vehicle.type,
    faker.vehicle.vehicle,
    faker.commerce.department,
];

const createNewCanvas = async (userId) => {
    const randomCanvasName =
        randomStringFunctions[
            Math.floor(Math.random() * randomStringFunctions.length)
        ]();

    try {
        const result = await canvasRoute.post(
            "/createcanvas",
            {
                name: randomCanvasName,
                userId: userId,
            },
            {
                headers: {
                    "auth-token": getAuthToken(),
                },
            }
        );
        const { canvas: _, ...rest } = result.data.data;
        return rest;
    } catch (error) {
        throw error;
    }
};

export default createNewCanvas;
