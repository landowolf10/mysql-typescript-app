export interface Users
{
    id?: number;
    nombre: string;
    correo: string
    pass: string;
}

export interface Login
{
    correo: string
    pass: string;
}