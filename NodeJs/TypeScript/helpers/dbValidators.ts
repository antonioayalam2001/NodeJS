import Usuario from "../models/User";


export const  validateEmail  = async (email = " ")  => {
    const existsEmail = await Usuario.findOne({where : {Email: email}})
    if (existsEmail){
        throw new Error("This email is already in databse System")
    }
    return true;
};

export const existsUser = async (id :number) => {
    const existsUser = await Usuario.findOne({where : {id}});
    if (!existsUser){
        throw new Error("This id does not belong to any user in the database System")
    }
    // @ts-ignore
    const {State} = existsUser.dataValues;
    if (!State){
        throw new Error("The user is not in the database System")
    }
    return true;
}