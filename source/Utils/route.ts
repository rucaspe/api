/**
 * @description Инициализация маршрута
 */

import { Router, Request, Response, NextFunction } from "express";

/**
 * @description Проверка обязательных параметров
 */
const checkParams = (params: string[], body: { [key: string]: any }) => {
    const notTransmitted: string[] = [];

    if (Object.keys(body).length) {
        for (let param of params) {
            if (typeof body[param] === "undefined" || !String(body[param]).length) {
                notTransmitted.push(param);
            }
        }
    } else {
        throw new Error(`Не переданы обязательные параметры: ${params.join(", ")}`);
    }

    if (notTransmitted.length) {
        throw new Error(`Не переданы обязательные параметры: ${notTransmitted.join(", ")}`);
    }
}

export default (path: string, fn: (body: any) => any, params?: string[]) => {
    const router = Router();

    var response: apiResponse = {};
    var reqTime: number;

    const preRoute = (req: Request, res: Response, next: NextFunction) => {
        reqTime = Date.now();
        next();
    }

    const middleRoute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (typeof params !== "undefined" && params.length) {
                await checkParams(params, req.body);
            }

            response.data = await fn(req.body);

            next();
        } catch (err) {
            response.error = {
                message: err.message,
                stack: (process.env.ENVIRONMENT === "development") ? err.stack : undefined
            };

            next();
        }
    }

    const postRoute = (req: Request, res: Response) => {
        const time = Date.now() - reqTime;

        response.meta = { time };

        if (response.error) {
            res.status(400).json(response);
        } else {
            res.status(200).json(response);
        }
    }

    router.post(path, preRoute, middleRoute, postRoute);

    return router;
}