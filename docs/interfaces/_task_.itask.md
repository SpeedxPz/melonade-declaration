[@melonade/melonade-declaration](../README.md) › [Globals](../globals.md) › ["task"](../modules/_task_.md) › [ITask](_task_.itask.md)

# Interface: ITask

## Hierarchy

* **ITask**

## Index

### Properties

* [ackTimeout](_task_.itask.md#acktimeout)
* [createTime](_task_.itask.md#createtime)
* [decisions](_task_.itask.md#optional-decisions)
* [defaultDecision](_task_.itask.md#optional-defaultdecision)
* [endTime](_task_.itask.md#endtime)
* [input](_task_.itask.md#input)
* [isRetried](_task_.itask.md#isretried)
* [logs](_task_.itask.md#optional-logs)
* [output](_task_.itask.md#output)
* [parallelTasks](_task_.itask.md#optional-paralleltasks)
* [retries](_task_.itask.md#retries)
* [retryDelay](_task_.itask.md#retrydelay)
* [startTime](_task_.itask.md#starttime)
* [status](_task_.itask.md#status)
* [taskId](_task_.itask.md#taskid)
* [taskName](_task_.itask.md#taskname)
* [taskReferenceName](_task_.itask.md#taskreferencename)
* [timeout](_task_.itask.md#timeout)
* [transactionId](_task_.itask.md#transactionid)
* [type](_task_.itask.md#type)
* [workflowId](_task_.itask.md#workflowid)

## Properties

###  ackTimeout

• **ackTimeout**: *number*

*Defined in [src/task.ts:39](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L39)*

___

###  createTime

• **createTime**: *number*

*Defined in [src/task.ts:28](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L28)*

___

### `Optional` decisions

• **decisions**? : *object*

*Defined in [src/task.ts:34](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L34)*

#### Type declaration:

* \[ **decision**: *string*\]: [AllTaskType](../modules/_workflowdefinition_.md#alltasktype)[]

___

### `Optional` defaultDecision

• **defaultDecision**? : *[AllTaskType](../modules/_workflowdefinition_.md#alltasktype)[]*

*Defined in [src/task.ts:37](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L37)*

___

###  endTime

• **endTime**: *number*

*Defined in [src/task.ts:30](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L30)*

___

###  input

• **input**: *any*

*Defined in [src/task.ts:26](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L26)*

___

###  isRetried

• **isRetried**: *boolean*

*Defined in [src/task.ts:25](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L25)*

___

### `Optional` logs

• **logs**? : *any[]*

*Defined in [src/task.ts:31](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L31)*

___

###  output

• **output**: *any*

*Defined in [src/task.ts:27](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L27)*

___

### `Optional` parallelTasks

• **parallelTasks**? : *[AllTaskType](../modules/_workflowdefinition_.md#alltasktype)[][]*

*Defined in [src/task.ts:33](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L33)*

___

###  retries

• **retries**: *number*

*Defined in [src/task.ts:24](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L24)*

___

###  retryDelay

• **retryDelay**: *number*

*Defined in [src/task.ts:38](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L38)*

___

###  startTime

• **startTime**: *number*

*Defined in [src/task.ts:29](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L29)*

___

###  status

• **status**: *[TaskStates](../enums/_state_.taskstates.md)*

*Defined in [src/task.ts:23](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L23)*

___

###  taskId

• **taskId**: *string*

*Defined in [src/task.ts:20](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L20)*

___

###  taskName

• **taskName**: *string*

*Defined in [src/task.ts:18](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L18)*

___

###  taskReferenceName

• **taskReferenceName**: *string*

*Defined in [src/task.ts:19](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L19)*

___

###  timeout

• **timeout**: *number*

*Defined in [src/task.ts:40](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L40)*

___

###  transactionId

• **transactionId**: *string*

*Defined in [src/task.ts:22](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L22)*

___

###  type

• **type**: *[TaskTypes](../enums/_task_.tasktypes.md)*

*Defined in [src/task.ts:32](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L32)*

___

###  workflowId

• **workflowId**: *string*

*Defined in [src/task.ts:21](https://github.com/devit-tel/melonade-declaration/blob/2273da1/src/task.ts#L21)*