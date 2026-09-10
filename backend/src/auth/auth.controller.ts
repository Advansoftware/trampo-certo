import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './better-auth';

const nodeAuthHandler = toNodeHandler(auth);

@Controller('api/auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return nodeAuthHandler(req, res);
  }
}
