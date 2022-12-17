import { CustomApiErrorMessages } from "@constants/errors";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ResponseError {
  message: string;
  statusCode: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | ResponseError>
) => {
  try {
    if (req.method !== "POST") {
      throw new Error(CustomApiErrorMessages.IncorrectMethod);
    }
    /* ######################################## */
    /* DATA */
    /* ######################################## */
    const {
      body: { artist, title },
    } = req;
    if (!artist && !title) {
      throw new Error(CustomApiErrorMessages.IncorrectInput);
    }

    res.status(200).json({ message: "" });
  } catch (err) {
    console.log({ err });
    res.status(400).send({
      message: "",
      statusCode: 400,
    });
  }
};

export default handler;
