/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: User's full name.
 *         email:
 *           type: string
 *           description: User's email address.
 *         password:
 *           type: string
 *           description: User's password.
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token.
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/SessionData'
 *     SessionData:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           description: User ID.
 *         email:
 *           type: string
 *           description: User email.
 *         role:
 *           type: string
 *           description: User role.
 *         privileges:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Privilege'
 *           description: User privileges.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { AuthenticationRequest } from '../types/userDTO';

const userRouter = express.Router();

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await userService.getUserByEmail(req.params.email));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using username/password. Returns an object with JWT token and session data when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: AuthenticationRequest = req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

export { userRouter };
