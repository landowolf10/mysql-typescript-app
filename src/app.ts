import express, { Application } from 'express';
import morgan from 'morgan';

//Routes
import IndexRoutes from './routes/index.routes';
import UserRoutes from './routes/user.routes';
import LoginRoutes from './routes/login.routes';
import  NoteRoutes from "./routes/notes.routes";

export class App
{
    private app: Application;


    constructor(private port?: number | string)
    {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() 
    {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares()
    {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes()
    {
        this.app.use(IndexRoutes);
        this.app.use('/users', UserRoutes);
        this.app.use('/users/login', LoginRoutes);
        this.app.use('/notes', NoteRoutes);
    }

    async listen()
    {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}