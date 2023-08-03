import { Request, Response } from 'express';

import createTaskService from '../services/CreateTaskService';
import AppErrors from '@shared/errors/AppErrors';

export interface TaskPointsRequest {
  points: string;
  makeTask: boolean;
}

class TaskController {
  private _task: string;
  private _priority: string;
  private _date_deadline: string;
  private _time_deadline: string;
  private _completed: boolean;
  private _organization: string;
  private _invited: string[];
  private _taskPoints: TaskPointsRequest[];

  // Getters
  get task(): string {
    return this._task;
  }

  get priority(): string {
    return this._priority;
  }

  get date_deadline(): string {
    return this._date_deadline;
  }

  get time_deadline(): string {
    return this._time_deadline;
  }

  get completed(): boolean {
    return this._completed;
  }

  get organization(): string {
    return this._organization;
  }

  get invited(): string[] {
    return this._invited;
  }

  get taskPoints(): TaskPointsRequest[] {
    return this._taskPoints;
  }

  // Setters
  set task(task: string) {
    if (task.trim() === '') {
      throw new AppErrors('A task deve ter um nome!');
    }

    if (task.trim().length < 4) {
      throw new AppErrors('O nome da Task deve conter mais de 4 caracteres!');
    }

    this._task = task;
  }

  set priority(priority: string) {
    this._priority = priority;
  }

  set date_deadline(dateDeadline: string) {
    this._date_deadline = dateDeadline;
  }

  set time_deadline(timeDeadline: string) {
    this._time_deadline = timeDeadline;
  }

  set completed(completed: boolean) {
    this._completed = completed;
  }

  set organization(organization: string) {
    this._organization = organization;
  }

  set invited(invited: string[]) {
    this._invited = invited;
  }

  set taskPoints(taskPoints: TaskPointsRequest[]) {
    this._taskPoints = taskPoints;
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    this.task = req.body.task;
    this.priority = req.body.priority;
    this.date_deadline = req.body.date_deadline;
    this.time_deadline = req.body.time_deadline;
    this.completed = req.body.completed;
    this.organization = req.body.organization;
    this.invited = req.body.invited;
    this.taskPoints = req.body.taskPoints;

    try {
      const data = await createTaskService.createTask({
        task: this.task,
        priority: this.priority,
        date_deadline: this.date_deadline,
        time_deadline: this.time_deadline,
        completed: this.completed,
        organization: this.organization,
        invited: this.invited,
        taskPoints: this.taskPoints,
      });

      return res.status(201).json({ data });
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(error.statusCode).json(error);
      } else {
        return res
          .status(500)
          .json({
            msg: 'Error interno no servidor ao criar informações!',
            error: error,
          });
      }
    }
  };
}

export default TaskController;
