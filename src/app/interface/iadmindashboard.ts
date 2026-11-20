export interface Iadmindashboard {
     userSummary:IUserSummary;
     taskSummary:ITaskSummary;
}

export interface IUserSummary {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
}

export interface ITaskSummary {
    totalTasks: number;
    pendingTasks: number;
    completedTasks: number;
}
