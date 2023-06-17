import {Request, Response} from "express";
import Usuario from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
    const {begin = 0,limitUser = 5} = req.query;
    const users = await Usuario.findAll({where : {State : true}, limit:Number(limitUser) ,offset:Number(begin)})
    const [activeCount,deletedCount] = await Promise.all([
        await Usuario.count({where : {State : true}}),
        await Usuario.count({where : {State : false}})
    ])
    res.status(200).json({
        msg: "Getting all users",
        users,
        activeCount,
        deletedCount,
        begin,
        limitUser
    })


}


export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    // const user = await Usuario.findOne({where:{id}});
    const user = await Usuario.findByPk(id);
    console.log(user)
    if (!user) {
        return res.status(404).json({
            msg: "User does not exists in this database  "
        })
    }
    res.status(200).json({
        msg: "Getting one users",
        user
    })
}

export const createUser = async (req: Request, res: Response) => {
    const {body} = req;
    const user = await Usuario.create({UserName:body.username ,Email:body.email, updatedAt : new Date().toLocaleString()}) ;
    try {
        res.status(200).json({
            msg: "Creating User",
            user
        })
        await user.save();
    } catch (e) {
        return res.status(401).json({
            msg: "Something went wrong"
        })
        console.log(e)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await Usuario.findByPk(id);
    await user?.update({Email:req.body.email});
    res.status(200).json({
        msg: "Update User",
        user
    })
}

export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const user = await Usuario.update({State : false }, {where : {id}})
        return res.status(200).json({
            msg: "User deleted",
        })
    }catch (e){
        return res.status(403).json({
            msg: "Something went wrong",
            id
        })
    }
}
export const deleteAll = async (req: Request, res: Response) => {
    try{
        await Usuario.destroy({
            truncate: true
        });
        return res.status(200).json({
            msg: "Database Deleted"
        })
    }catch (e){
        return res.status(403).json({
            msg: "Something went wrong",
        })
    }
}