import { Request, Response } from "express";

export const indexHandler = (req: Request, res: Response) => {
    // render the index template
    res.send("hello world!!!")
}