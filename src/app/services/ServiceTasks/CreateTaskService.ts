import { TaskPointsRequest } from '../../modules/controllers/ControllerTask';
import AppError from '../../shared/errors/AppError';
import Tasks from '../../modules/models/Tasks';
import TaskPoints from '../../modules/models/TaskPoints';

interface TaskPointsResponse extends TaskPointsRequest {
  id: number;
  tasksId: number;
}

interface Request {
  task: string;
  priority: string;
  date_deadline: string;
  time_deadline: string;
  completed: boolean;
  organization: string;
  invited: string[];
  taskPoints: TaskPointsRequest[];
}

interface Response {
  id: number;
  task: string;
  priority: string;
  date_deadline: string;
  time_deadline: string;
  completed: boolean;
  organization: string;
  invited: string[];
  taskPoints: TaskPointsResponse[];
}

class createTaskService {
  constructor() {}

  createTask = async (data: Request): Promise<Response> => {
    const createTask = await Tasks.create({
      task: data.task,
      priority: data.priority,
      date_deadline: data.date_deadline,
      time_deadline: data.time_deadline,
      completed: data.completed,
      organization: data.organization,
      invited: data.invited,
    });

    const taskPointsPromises = data.taskPoints.map(async point => {
      const createTaskPoint = await TaskPoints.create({
        points: point.points,
        makeTask: point.makeTask,
        tasksId: createTask.id,
      });
      return createTaskPoint;
    });

    const taskPoints = await Promise.all(taskPointsPromises);

    return {
      id: createTask.id,
      task: createTask.task,
      priority: createTask.priority,
      date_deadline: createTask.date_deadline,
      time_deadline: createTask.time_deadline,
      completed: createTask.completed,
      organization: createTask.organization,
      invited: createTask.invited,
      taskPoints: taskPoints,
    };
  };
}

export default new createTaskService();
