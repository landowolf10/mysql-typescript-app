import { query, Request, Response } from "express";
import { connect } from "../config/database";
import { Notes } from "../interface/note.interface";

export async function getNotes(req: Request, res: Response): Promise<Response>
{
    const conn = await connect();
    const userID = req.params.userID;

    const notesQuery = await conn.query('CALL spMostrarNotas(?);', userID);
    const notesList = JSON.parse(JSON.stringify(notesQuery))[0];

    return res.json(notesList[0]);
}

export async function createNote(req: Request, res: Response)
{
    const conn = await connect();
    const newNote: Notes = req.body;
    
    console.log('Body: ', newNote);

    const createQuery = await conn.query('CALL spCrearNota(?, ?, ?)', [newNote.id_usuario, newNote.titulo, newNote.contenido]);

    console.log('New note: ', newNote);
    console.log('Query result: ', createQuery);

    return res.json({
        message: 'Note created',
        data: newNote
    });
}

export async function updateNote(req: Request, res: Response)
{
    const conn = await connect();
    const updatedNote: Notes = req.body;
    const noteID = updatedNote.id;
    
    const updateQuery = await conn.query('CALL spActualizarNota(?, ?, ?)', [updatedNote.id, updatedNote.titulo,
        updatedNote.contenido]);
    const affectedRows = JSON.parse(JSON.stringify(updateQuery))[0].affectedRows;

    console.log(affectedRows);
    
    if(affectedRows > 0)
        return res.json({
            message: 'Note updated',
            data: updatedNote
        });
    else
        return res.json({
            message: 'No note with id ' + noteID + ' where found'
        });
}

export async function deleteNote(req: Request, res: Response)
{
    const conn = await connect();
    const id = req.params.noteID;
    
    const deleteQuery = await conn.query('CALL spEliminarNota(?)', id);
    const affectedRows = JSON.parse(JSON.stringify(deleteQuery))[0].affectedRows;

    console.log(affectedRows);

    if(affectedRows > 0)
        return res.json({
            message: 'Note deleted'
        });
    else
        return res.json({
            message: 'No note with id ' + id + ' where found'
        });
}