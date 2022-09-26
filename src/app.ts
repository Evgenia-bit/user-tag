import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors'
import swaggerUi from "swagger-ui-express"

import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";
import tagRoutes from "./routes/tag.router";
import userTagRoutes from "./routes/userTag.router";
import refreshRouter from "./routes/refresh.router";

import errorMiddleware from "./middleware/error.middleware";

import swaggerSpec from "./swagger/swagger";


dotenv.config({ path: ".env" });


const app = express();

app.set("port", process.env.PORT || 7000);

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(morgan('combined'))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(authRoutes)
app.use(userRoutes)
app.use(tagRoutes)
app.use(userTagRoutes)
app.use(refreshRouter)

app.use((req, res) => {
    res.status(404).json({message: 'Not found'})
})

app.use(errorMiddleware)

export default app;