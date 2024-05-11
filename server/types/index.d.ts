import { Request } from 'express';

// declare namespace Express {
//     export interface CustomRequest extends Request {
//       user?: UserType
//     }
//  }
 export interface CustomRequest extends Request {
   user?: UserType
 }

 export interface UserType {
   username: string,
   email: string,
   refreshToken: string,
   accessToken: string
}