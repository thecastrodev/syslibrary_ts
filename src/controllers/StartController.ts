import { Request, Response } from "express";

export class StartController {
  async show(_: Request, response: Response) {
    return response.status(200).json({
      message: "Start Server",
    });
  }
}