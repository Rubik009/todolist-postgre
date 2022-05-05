const db = require('../config/database');

class TodoController {
    async createTask(body) {
        const { title, content, person_id } = body;
        const newTask = await db.query('INSERT INTO todo (title, content, person_id) values ($1, $2, $3) RETURNING *', [title, content, person_id]);
        return newTask.rows[0];
    }
    async getTaskbyUser(id) {
        const tasks = await db.query('SELECT * FROM todo where person_id = $1', [id]);
        return tasks.rows;
    }
    async updateTaskByUser(id, title, content) {
        const updateTask = await db.query('UPDATE todo SET content = $1 WHERE person_id = $2 and title = $3 RETURNING *', [content, id, title]);
        return updateTask.rows[0];
    }
    async deleteTaskByUser(id, todo_id){
        const deleteTask = await db.query('DELETE FROM todo where todo_id = $1 and person_id = $2',[todo_id, id]);
        return deleteTask.rows[0];
    }
}

module.exports = new TodoController();