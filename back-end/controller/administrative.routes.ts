/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Administrative:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: administrative's full name.
 *           email:
 *             type: string
 *             description: administrative's email address.
 *           password:
 *             type: string
 *             description: administrative's password.
 *           privileges:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Privilege'
 *       UserShortView:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: administrative's full name.
 */
import express, { NextFunction, Request, Response } from 'express';
import { Administrative } from '../model/administrative';
import AdministrativeService from '../service/administrative.service';

const administrativeRouter = express.Router();

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Administrative]
 *     responses:
 *       200:
 *         description: List of all admins.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrative'
 */
administrativeRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await AdministrativeService.getAllAdministratives());
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /admins/short:
 *   get:
 *     summary: Get all admins in short view
 *     tags: [Administrative]
 *     responses:
 *       200:
 *         description: List of all admins in short view.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdministrativeShortView'
 */
administrativeRouter.get("/short", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AdministrativeService.getAllShortAdministratives();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get an admin by ID
 *     tags: [Administrative]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the admin to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrative'
 *       404:
 *         description: Administrative not found.
 */
administrativeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await AdministrativeService.getAdministrativeById(parseInt(req.params.id)));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Administrative]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Administrative'
 *     responses:
 *       201:
 *         description: Successfully created admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrative'
 */
administrativeRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin: Administrative = req.body;
        res.status(201).json(await AdministrativeService.createAdministrative(admin));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update an admin by ID
 *     tags: [Administrative]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the admin to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Administrative'
 *     responses:
 *       200:
 *         description: Successfully updated admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrative'
 *       404:
 *         description: Administrative not found.
 */
administrativeRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin: Administrative = req.body;
        res.status(200).json(await AdministrativeService.updateAdministrative(parseInt(req.params.id), admin));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete an admin by ID
 *     tags: [Administrative]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the admin to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted admin.
 *       404:
 *         description: Administrative not found.
 */
administrativeRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id);
        const operationStatus: string = await AdministrativeService.deleteAdministrativeById(id);
        res.status(200).json(operationStatus);
    } catch (error) {
        next(error);
    }
});

export { administrativeRouter };
