const db = require('../config/database');

class TodoController {
    async createTask(body) {
        const { title, content, person_id } = body;
        const newTask = await db.query('INSERT INTO todo (title, content, person_id) values ($1, $2, $3) RETURNING *', [title, content, person_id]);
        return newTask.rows[0];
    }
    async getAllTasks() {
        const tasks = await db.query('SELECT * FROM todo');
        return tasks.rows;
    }
    async getTaskbyUser(id) {
        const tasks = await db.query('SELECT * FROM todo where person_id = $1', [id]);
        return tasks.rows;
    }
    async updateTaskByUser(id, body) {
        const updateTask = await db.query('UPDATE todo SET content = $1 WHERE todo_id = $2 RETURNING *', [body, id]);
        return updateTask.rows[0];
    }
    async deleteTaskByUser(id){
        const deleteTask = await db.query('DELETE FROM todo where todo_id = $1',[id]);
        return deleteTask.rows[0];
    }
}

module.exports = new TodoController();