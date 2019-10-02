import * as R from 'ramda';
import { FailureStrategies } from './constants/workflow';
import { TaskTypes, TaskTypesList } from './constants/task';
import { isValidName, isValidRev } from './utils/common';

export interface IBaseTask {
  name: string;
  taskReferenceName: string;
  inputParameters: {
    [key: string]: string | number;
  };
}

export interface ITaskTask extends IBaseTask {
  type: TaskTypes.Task;
  retry?: {
    limit: number;
    delay: number;
  };
  ackTimeout?: number;
  timeout?: number;
}

export interface ICompensateTask extends IBaseTask {
  type: TaskTypes.Compensate;
}

export interface IParallelTask extends IBaseTask {
  type: TaskTypes.Parallel;
  parallelTasks: AllTaskType[][];
}

export interface ISubWorkflowTask extends IBaseTask {
  type: TaskTypes.SubWorkflow;
  workflow: {
    name: string;
    rev: string;
  };
}

export interface IDecisionTask extends IBaseTask {
  type: TaskTypes.Decision;
  decisions: {
    [decision: string]: AllTaskType[];
  };
  defaultDecision: AllTaskType[];
}

export type AllTaskType =
  | ITaskTask
  | ICompensateTask
  | IParallelTask
  | ISubWorkflowTask
  | IDecisionTask;

export interface IWorkflowDefinition {
  name: string;
  rev: string;
  description?: string;
  tasks: AllTaskType[];
  failureStrategy: FailureStrategies;
  retry?: {
    limit: number;
  };
  recoveryWorkflow?: {
    name: string;
    rev: string;
  };
  outputParameters: {
    [key: string]: string | any;
  };
}

const isNumber = R.is(Number);
const isString = R.is(String);

const isRecoveryWorkflowConfigValid = (
  workflowDefinition: IWorkflowDefinition,
): boolean =>
  workflowDefinition.failureStrategy === FailureStrategies.RecoveryWorkflow &&
  (!isString(R.path(['recoveryWorkflow', 'name'], workflowDefinition)) ||
    !isString(R.path(['recoveryWorkflow', 'rev'], workflowDefinition)));

const isFailureStrategiesConfigValid = (
  workflowDefinition: IWorkflowDefinition,
): boolean =>
  workflowDefinition.failureStrategy === FailureStrategies.Retry &&
  (!isNumber(R.path(['retry', 'limit'], workflowDefinition)) ||
    !isNumber(R.path(['retry', 'delay'], workflowDefinition)));

const isEmptyTasks = R.compose(
  R.isEmpty,
  R.prop('tasks'),
);

const getTaskDecisions = R.compose(
  R.toPairs,
  R.propOr({}, 'decisions'),
);

const isValidWorkflowName = R.compose(
  isValidName,
  R.pathOr('', ['workflow', 'name']),
);

const isValidWorkflowRev = R.compose(
  isValidRev,
  R.path(['workflow', 'rev']),
);

interface TasksValidateOutput {
  errors: string[];
  taskReferenceName: {
    [taskName: string]: string;
  };
}

const validateTasks = (
  tasks: AllTaskType[],
  root: string,
  defaultResult: TasksValidateOutput,
) =>
  tasks.reduce(
    (
      result: TasksValidateOutput,
      task: AllTaskType,
      index: number,
    ): TasksValidateOutput => {
      const currentRoot = `${root}.tasks[${index}]`;
      if (!isValidName(task.name) && task.type === TaskTypes.Task)
        result.errors.push(`${currentRoot}.name is invalid`);

      if (!isValidName(task.taskReferenceName))
        result.errors.push(`${currentRoot}.taskReferenceName is invalid`);

      if (result.taskReferenceName[task.taskReferenceName])
        result.errors.push(`${currentRoot}.taskReferenceName is duplicated`);
      else
        result.taskReferenceName[task.taskReferenceName] =
          task.taskReferenceName;

      // TODO Validate inputParameters

      if (!TaskTypesList.includes(task.type))
        result.errors.push(`${currentRoot}.type is invalid`);

      if (task.type === TaskTypes.Decision) {
        const defaultDecision: AllTaskType[] = R.propOr(
          [],
          'defaultDecision',
          task,
        );
        if (R.isEmpty(defaultDecision))
          result.errors.push(`${currentRoot}.defaultDecision cannot be empty`);

        const defaultDecisionResult = validateTasks(
          defaultDecision,
          `${currentRoot}.defaultDecision`,
          result,
        );

        return getTaskDecisions(task).reduce(
          (
            decisionResult: TasksValidateOutput,
            [decision, decisionTasks]: [string, AllTaskType[]],
          ): TasksValidateOutput => {
            return validateTasks(
              decisionTasks,
              `${currentRoot}.decisions["${decision}"]`,
              decisionResult,
            );
          },
          defaultDecisionResult,
        );
      }

      if (task.type === TaskTypes.Parallel) {
        const parallelTasks: AllTaskType[][] = R.propOr(
          [],
          'parallelTasks',
          task,
        );

        return parallelTasks.reduce(
          (
            parallelResult: TasksValidateOutput,
            parallelTasks: AllTaskType[],
            index: number,
          ): TasksValidateOutput => {
            return validateTasks(
              parallelTasks,
              `${currentRoot}.parallelTasks[${index}]`,
              parallelResult,
            );
          },
          result,
        );
      }

      if (task.type === TaskTypes.SubWorkflow) {
        if (!isValidWorkflowName(task))
          result.errors.push(`${currentRoot}.workflow.name is invalid`);

        if (!isValidWorkflowRev(task))
          result.errors.push(`${currentRoot}.workflow.rev is invalid`);

        // TODO check if workflow/rev is exists
      }

      return result;
    },
    defaultResult,
  );

const workflowValidation = (
  workflowDefinition: IWorkflowDefinition,
): string[] => {
  const errors = [];
  if (!isValidName(workflowDefinition.name))
    errors.push('workflowDefinition.name is invalid');

  if (!isValidRev(workflowDefinition.rev))
    errors.push('workflowDefinition.rev is invalid');

  if (isRecoveryWorkflowConfigValid(workflowDefinition))
    errors.push('workflowDefinition.recoveryWorkflow is invalid');

  if (isFailureStrategiesConfigValid(workflowDefinition))
    errors.push('workflowDefinition.retry is invalid');

  if (isEmptyTasks(workflowDefinition))
    errors.push('workflowDefinition.tasks cannot be empty');

  return errors;
};

export class WorkflowDefinition implements IWorkflowDefinition {
  name: string;
  rev: string;
  description?: string = 'No description';
  tasks: AllTaskType[];
  failureStrategy: FailureStrategies;
  retry?: {
    limit: number;
  };
  recoveryWorkflow?: {
    name: string;
    rev: string;
  };
  outputParameters: {};

  constructor(workflowDefinitionData: IWorkflowDefinition) {
    const workflowValidationErrors = workflowValidation(workflowDefinitionData);

    const validateTasksResult = validateTasks(
      R.propOr([], 'tasks', workflowDefinitionData),
      'workflowDefinition',
      {
        errors: workflowValidationErrors,
        taskReferenceName: {},
      },
    );
    if (validateTasksResult.errors.length)
      throw new Error(validateTasksResult.errors.join('\n'));

    Object.assign(this, workflowDefinitionData);
    this.tasks = workflowDefinitionData.tasks;
  }

  toObject = (): any => {
    return R.pick(
      [
        'name',
        'rev',
        'description',
        'tasks',
        'failureStrategy',
        'retry',
        'recoveryWorkflow',
        'outputParameters',
      ],
      this,
    );
  };

  toJSON = (): string => {
    return JSON.stringify(this.toObject());
  };
}
