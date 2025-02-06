/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Privilege:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the privilege.
 *         name:
 *           type: string
 *           description: Name of the privilege.
 *         description:
 *           type: string
 *           description: Description of the privilege.
 *       required:
 *         - name
 *         - description
 *     PrivilegeType:
 *       type: string
 *       enum:
 *         - CREATE_ISP
 *         - UPDATE_ISP
 *         - DELETE_ISP
 *         - CREATE_STUDENT
 *         - UPDATE_STUDENT
 *         - DELETE_STUDENT
 *         - CREATE_COURSE
 *         - UPDATE_COURSE
 *         - DELETE_COURSE
 *         - CREATE_ADMINISTRATIVE
 *         - UPDATE_ADMINISTRATIVE
 *         - DELETE_ADMINISTRATIVE
 */

import express, { NextFunction, Request, Response } from 'express';
import privilegeService from '../service/privilege.service';

const privilegeRouter = express.Router();

/**
 * @swagger
 * /privileges:
 *   get:
 *     summary: Get all privileges
 *     tags: [Privilege]
 *     responses:
 *       200:
 *         description: List of all privileges.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Privilege'
 */
privilegeRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await privilegeService.getAllPrivileges());
    } catch (error) {
        next(error);
    }
});

export { privilegeRouter };
