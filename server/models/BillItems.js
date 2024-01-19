module.exports =(sequelize,DataTypes)=> {
    const BillItems=sequelize.define("BillItems",{
        qty:DataTypes.INTEGER,
        Tex:DataTypes.INTEGER,
        price:DataTypes.INTEGER
    });
    return BillItems
};
