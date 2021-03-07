const Sequelize = require('sequelize');
const db = require("./connectDb");
const UserField={
    id:"id",
    email:"email",
    first_name:"first_name",
    last_name:"last_name",
    phone_number:"phone_number",
    password:"password",
    avatar:"avatar"
}
const UserDB = db.define('user',{
    [UserField.id]:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    [UserField.email]:{
        type:Sequelize.DataTypes.STRING,
    },
    [UserField.first_name]:{
        type:Sequelize.DataTypes.STRING,
    },
    [UserField.last_name]:{
        type:Sequelize.DataTypes.STRING,
    },
    [UserField.avatar]:{
        type:Sequelize.DataTypes.STRING,
        defaultValue:'/avatar/default-avatar.jpg'
    },
    [UserField.phone_number]:{
        type:Sequelize.DataTypes.STRING,
    },
    [UserField.password]:{
        type:Sequelize.DataTypes.STRING,
    }
},{timestamps: false})
UserDB.sync();
module.exports ={
    UserDB,
    UserField
}