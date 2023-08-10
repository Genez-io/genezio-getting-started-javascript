/**
* This is an auto generated code. This code should not be modified since the file can be overwriten
* if new genezio commands are executed.
*/

import { Remote } from "./remote.js"

export class TaskService {
  static remote = new Remote("http://127.0.0.1:8083/TaskService")

  static async getAllTasksByUser(token) {
    return TaskService.remote.call("TaskService.getAllTasksByUser", token)
  }

  static async createTask(token, title) {
    return TaskService.remote.call("TaskService.createTask", token, title)
  }

  static async updateTask(token, id, title, solved) {
    return TaskService.remote.call("TaskService.updateTask", token, id, title, solved)
  }

  static async deleteTask(token, id) {
    return TaskService.remote.call("TaskService.deleteTask", token, id)
  }

}
