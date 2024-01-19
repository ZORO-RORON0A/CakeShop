module.exports = (sequelize,DataTypes)=>{
    const Taxs=sequelize.define("Taxs",{
        Rate:DataTypes.INTEGER        
    });
    Taxs.associate=(modal)=>{
        Taxs.hasMany(modal.Cakes,{
            onDelete:"cascade",
        })
    }
    return Taxs
};
