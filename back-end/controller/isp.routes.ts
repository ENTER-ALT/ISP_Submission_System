/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       ISP:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           status:
 *             type: string
 *             description: The status of the ISP.
 *             enum:
 *               - SUBMITTED
 *               - NOTSUBMITTED
 *           totalCredits:
 *             type: number
 *             description: Total credits for the ISP.
 *           startYear:
 *             type: number
 *             description: The start year of the ISP.
 *           courses:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CourseShortView'
 *           student:
 *             $ref: '#/components/schemas/StudentShortView'
 *       ISPShort:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           status:
 *             type: string
 *             description: The status of the ISP.
 *             enum:
 *               - SUBMITTED
 *               - NOTSUBMITTED
 *           totalCredits:
 *             type: number
 *             description: Total credits for the ISP.
 *           startYear:
 *             type: number
 *             description: The start year of the ISP.
 *           student:
 *             $ref: '#/components/schemas/StudentShortView'
 *       UpdateISPView:
 *         type: object
 *         properties:
 *           status:
 *             type: string
 *             description: The status of the ISP.
 *             enum:
 *               - SUBMITTED
 *               - NOTSUBMITTED
 *           totalCredits:
 *             type: number
 *             description: Total credits for the ISP.
 *           startYear:
 *             type: number
 *             description: The start year of the ISP.
 *           studentId:
 *             type: number
 *             description: The ID of the student.
 *           courses:
 *             type: array
 *             items:
 *               type: number
 *               description: Course IDs to update in the ISP.
 *       UpdateByStudentISPView:
 *         type: object
 *         properties:
 *           status:
 *             type: string
 *             description: The status of the ISP.
 *             enum:
 *               - SUBMITTED
 *               - NOTSUBMITTED
 *           courses:
 *             type: array
 *             items:
 *               type: number
 *               description: Course IDs to update in the ISP.
 */

import express, { NextFunction, Request, Response } from 'express';
import ispService from '../service/isp.service';
import { UpdateByStudentISPView, UpdateISPView } from '../types/ispDTO';


const ispRouter = express.Router();

/**
 * @swagger
 * /isps:
 *   get:
 *     summary: Get all ISPs
 *     tags: [ISP]
 *     responses:
 *       200:
 *         description: All ISPs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ISP'
 */
ispRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await ispService.getAll());
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /isps/short:
 *   get:
 *     summary: Get all ISPs in short view
 *     tags: [ISP]
 *     responses:
 *       200:
 *         description: All ISPs in short view
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ISPShort'
 */
ispRouter.get("/short", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await ispService.getAllShort();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /isps/{id}:
 *   get:
 *     summary: Get an ISP by ID
 *     tags: [ISP]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ISP to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved ISP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ISP'
 */
ispRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isp = await ispService.getISPById(parseInt(req.params.id));
        res.status(200).json(isp);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /isps/for-student/{id}:
 *   get:
 *     summary: Get all ISPs for a student by student ID
 *     tags: [ISP]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student to retrieve ISPs for
 *     responses:
 *       200:
 *         description: Successfully retrieved ISPs for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ISPShort'
 */
ispRouter.get('/for-student/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isps = await ispService.getAllByStudentId(parseInt(req.params.id));
        res.status(200).json(isps);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /isps:
 *   post:
 *     summary: Create a new ISP
 *     tags: [ISP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateISPView'
 *     responses:
 *       201:
 *         description: Successfully created ISP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ISP'
 */
ispRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ispData: UpdateISPView = req.body;
        const isp = await ispService.createISP(ispData);
        res.status(201).json(isp);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /isps/{id}:
 *   put:
 *     summary: Update an ISP by ID
 *     tags: [ISP]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the isp to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateISPView'
 *     responses:
 *       200:
 *         description: Successfully updated ISP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ISP'
 */
ispRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ispData: UpdateISPView = req.body;
        const updatedIsp = await ispService.updateISP(parseInt(req.params.id), ispData);
        res.status(200).json(updatedIsp);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /isps/{id}:
 *   put:
 *     summary: Update an ISP by ID by Student
 *     tags: [ISP]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the isp to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateByStudentISPView'
 *     responses:
 *       200:
 *         description: Successfully updated ISP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ISP'
 */
ispRouter.put('/by-student/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ispData: UpdateByStudentISPView = req.body;
        const updatedIsp = await ispService.updateISPByStudent(parseInt(req.params.id), ispData);
        res.status(200).json(updatedIsp);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /isps/{id}:
 *   delete:
 *     summary: Delete an ISP by ID
 *     tags: [ISP]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ISP to delete
 *     responses:
 *       200:
 *         description: Successfully deleted ISP
 */
ispRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const operationStatus: string = await ispService.deleteISPById(parseInt(req.params.id));
        res.status(200).json(operationStatus);
    } catch (error) {
        next(error);
    }
});

export {
    ispRouter
};
