import { GoalProgressInterface, InputGoalProgressInterface } from "../interfaces";
import { GoalProgress } from "../models";
import { BaseRepository } from "./baseRepository";

export class GoalProgressRepository extends BaseRepository<
InputGoalProgressInterface,
GoalProgressInterface> {
  constructor() {
    super(GoalProgress);
  }
}
