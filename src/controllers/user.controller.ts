import { Request, Response } from "express";
import { connect } from "../config/database";
import { Users, Login } from "../interface/user.interface";

export async function gestUsers(req: Request, res: Response): Promise<Response>
{
    const conn = await connect();
    const users = await conn.query('SELECT * FROM usuarios');

    return res.json(users[0]);
}

export async function createUser(req: Request, res: Response)
{
    const conn = await connect();
    const newUser: Users = req.body;

    await conn.query('CALL spInsertarUsuario(?, ?, ?)', [newUser.nombre, newUser.correo, newUser.pass]);

    return res.json({
        message: 'User created',
        data: newUser
    });
}

export async function login(req: Request, res: Response)
{
    const conn = await connect();
    const login: Login = req.body;

    if(res.statusCode == 200)
    {
        const logedUser = await conn.query('CALL login(?, ?)', [login.correo, login.pass]);
        const loginData = JSON.parse(JSON.stringify(logedUser))[0][0][0];

        console.log('Login: ', login);
        console.log(loginData);

        if(loginData != null)
            return res.json({
                message: 'User loged in successfully',
                user_data: loginData
            });
        else
            return res.json({
                error: 'Usuario y/o contraseña inválidos.'
            });
    }
    else
        return res.json({
            error: 'Something went wrong'
        });
}