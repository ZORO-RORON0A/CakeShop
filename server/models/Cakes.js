module.exports = (sequelize,DataTypes)=>{
    const Cakes=sequelize.define("Cakes", {
            name:{
                type:DataTypes.STRING,
                unique:true,
                allownull:false                    
            },
            price:{
                type:DataTypes.INTEGER,
                allownull:false
            },
            pic:{
                type:DataTypes.STRING,
                allownull:true
            }
            
        });
        Cakes.associate=(modal)=>{
            Cakes.hasMany(modal.BillItems,{
                onDelete:"cascade"
            })
        }
        return Cakes
};
