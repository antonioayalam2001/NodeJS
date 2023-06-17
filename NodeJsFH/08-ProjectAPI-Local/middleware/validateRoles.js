const validateAdminRole = (req, res, next) => {
      if (!req.user) {
            return res.status(500).json({
                  msg: "Se quiere  verificar el rol sin validar el token primero"
            })
      }
      const {role, nombre} = req.user;

      if (role !== 'ADMIN_ROLE') {
            return res.status(401).json({
                  msg: `El usuario ${nombre} no es un administrador`
            })
      }
      next()
}

const tieneRol = (  ...roles )=>{
      return (req,res,next)=>{
            const {role,nombre} = req.user;
            if( !roles.includes(role) ){
                  return res.status(401).json({
                        msg: `El usuario ${nombre} no tiene un rol definido dentro de la base de datos`
                  })
            }
            next()
      }
}


module.exports = {
      validateAdminRole,
      tieneRol
}