import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { courseRouter } from './controller/course.routes';
import { expressjwt } from 'express-jwt';
import { studentRouter } from './controller/student.routes';
import { ispRouter } from './controller/isp.routes';
import { privilegeRouter } from './controller/privilege.routes';
import { userRouter } from './controller/user.routes';
import { administrativeRouter } from './controller/administrative.routes';
import helmet from 'helmet';


const app = express();
app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            // Allow connections to own server and the external API
            connectSrc: ["'self'", 'https://api.ucll.be'],
        },
    })
);

dotenv.config();

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/status'],
    })
);

//Mappings
app.use("/courses", courseRouter);
app.use("/students", studentRouter);
app.use("/isps", ispRouter);
app.use("/privileges", privilegeRouter);
app.use("/users", userRouter);
app.use("/admins", administrativeRouter);


//Swagger
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

module.exports = app;
