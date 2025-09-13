import express from 'express';
import {
    create,
    getAll,
    getOne,
    update,
    remove} from '../controllers/test.controller.js';
    import {verifyUser} from '../middlewares/auth.middleware.js';
const router = express.Router();
router.use(verifyUser);


router.post("/", create);       
router.get("/", getAll);          
router.get("/:id", getOne);        
router.put("/:id", update);        
router.delete("/:id", remove);    


export default router;