import { Request, Response } from 'express';

declare module 'express' {
  interface Request {
    user?: User;
  }
}