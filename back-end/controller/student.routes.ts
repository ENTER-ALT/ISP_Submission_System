/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Student:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: Student's full name.
 *           email:
 *             type: string
 *             description: Student's email address.
 *           password:
 *             type: string
 *             description: Student's password.
 *           nationality:
 *             type: string
 *             description: Student's nationality.
 *           studyYear:
 *             type: number
 *             description: Current study year of the student.
 *           passedCourses:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Course'
 *       UserShortView:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: Student's full name.
 */

import express, { NextFunction, Request, Response } from 'express';
import studentService from '../service/student.service';
import { StudentUpdateView } from '../types/studentDTO';

const studentRouter = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: List of all students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
studentRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await studentService.getAll());
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /students/short:
 *   get:
 *     summary: Get all students in short view
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: List of all students in short view.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentShortView'
 */
studentRouter.get("/short", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await studentService.getAllShort();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
studentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await studentService.getStudentById(parseInt(req.params.id)));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /students:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Successfully created student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
studentRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student: StudentUpdateView = req.body;
        res.status(201).json(await studentService.createStudent(student));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Successfully updated student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
studentRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student: StudentUpdateView = req.body;
        res.status(200).json(await studentService.updateStudent(parseInt(req.params.id), student));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted student.
 */
studentRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id);
        const operationStatus: string = await studentService.deleteStudentById(id);
        res.status(200).json(operationStatus);
    } catch (error) {
        next(error);
    }
});

export { studentRouter };
