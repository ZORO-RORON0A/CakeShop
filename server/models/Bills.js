module.exports =(sequelize,DataTypes)=> {
    const Bills=sequelize.define("Bills",{
        date:DataTypes.DATE
    })
    Bills.associate=(modal)=>{
        Bills.hasMany(modal.BillItems,{
            onDelete:"cascade"
        })
    }
    return Bills;
};
