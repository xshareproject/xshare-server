import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../common/constants/response.status";
import userService from "./user.service";
import encryptionService from "../../service/encryption/encryption.service";

class UserMiddleware {
  validateRequiredCreateUserBodyFields(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    if (
      body &&
      body.firstName &&
      body.lastName &&
      body.email &&
      body.password &&
      body.phoneNumber
    ) {
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Missing required fields.`,
      });
    }
  }

  async validateUserDoesNotExsitWithEmail(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    const user = await userService.getUserByEmail(body.email);

    if (!user) {
      next();
    } else {
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Email already in use.`,
      });
    }
  }

  async validateUserDoesNotExsitWithPhoneNumber(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    const user = await userService.getUserByPhoneNumber(body.phoneNumber);

    if (!user) {
      next();
    } else {
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Phone Number already in use.`,
      });
    }
  }

  validateUserRequestUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const query = request.query;

    if (query && query.id) {
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Missing required user id.`,
      });
    }
  }

  validateInitialRegisterRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    if (body && body.encryptedCrendentialsAndPublicKeyNonce) {
      console.log(body.encryptedCrendentialsAndPublicKeyNonce);
      const decryptedMessage: string =
        encryptionService.decryptMessageWithServerPrivateKey(
          body.encryptedCrendentialsAndPublicKeyNonce
        );
      console.log(decryptedMessage);
      const decryptedBody: any = JSON.parse(decryptedMessage);

      request.body = decryptedBody;
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Missing required field.`,
      });
    }
  }
}

export default new UserMiddleware();
