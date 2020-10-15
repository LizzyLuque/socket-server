import {Router,Request,Response} from 'express';
import Server from '../classes/server';

const router = Router();

// Api REST para obtener mensajes 
router.get('/mensajes',(req:Request, res:Response)=>{
    res.json({
        ok:true,
        mensaje:'Todo está bien'
    });
});

// Api REST para enviar mensajes globales
router.post('/mensajes',(req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de=req.body.de;
    const server = Server.instance;

    const payload={
        de,
        cuerpo
    }

    server.io.emit('mensaje-nuevo', payload);    

    res.json({
        ok:true,
        cuerpo,
        de
    });
});

// Api REST para enviar mensajes privados
router.post('/mensajes/:id',(req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de=req.body.de;
    const id=req.params.id;
    const server = Server.instance;

    const payload={
        de,
        cuerpo
    }

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    });
});

export default router;