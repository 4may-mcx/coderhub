const connection = require('../app/database');

class UserService{
    async create(user){
        // 将用户数据放到数据库中
        const {name, password} = user;
        const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;
        const result = await connection.execute(statement, [name, password]);

        return result;
    }
}

module.exports = new UserService();