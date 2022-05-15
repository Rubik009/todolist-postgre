const db = require('../config/database');
const modules = require('../modules/modules');

class TodoController {
    async createTask(body, person_id, username) {
        const { title, content } = body;
        const newTask = await modules.todo.create({
            title,
            content,
            person_id: person_id,
        });
        return `Task with title - ${newTask.title}  for user - ${username} added  `;
    }
    async getTaskbyUser(id) {
        const tasks = await modules.todo.findAll({
            where: { person_id: id },
            raw: true,
        });
        console.log(tasks)
        return tasks;
    }
    async updateTaskByUser(id, person_id, title, content) {
        const updateTask = await modules.todo.update({
            title: title,
            content: content,
            person_id : person_id,
        }, { where: { id: id } });
        return `code of update ${updateTask}, Task with id - ${id} updated!`;
    }
    async deleteTaskByUser(id, todo_id) {
        const deleteTask = await modules.todo.destroy({
            where : {
                person_id: id,
                id : todo_id,
            }
        });
        return `code of delete ${deleteTask}, Task with id - ${todo_id} deleted!`;
    }
}

module.exports = new TodoController();