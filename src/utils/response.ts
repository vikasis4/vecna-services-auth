import { Response } from "express";
import statusMap from "./statusCodeMap";

const response = (res: Response) => {
  return function (
    status: number,
    message: string,
    data?: any,
    extraFields?: any
  ) {
    const payload = {
      status,
      message,
      data: data || {},
      ...(extraFields || {}),
    };
    res.status(statusMap[status]).json(payload);
  };
};

export default response;
