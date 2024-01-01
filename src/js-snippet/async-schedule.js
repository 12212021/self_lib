class AsyncSchedule {
    constructor(taskLimit = 2) {
        this.taskLimit = taskLimit;
        this.running = 0;
        this.tasks = [];
    }

    addTask(fn, ...args) {
        if (typeof fn !== 'function') {
            throw new Error('task must be function!');
        }

        return new Promise((resolve, reject) => {
            this.tasks.push({
                task: fn,
                args,
                resolve,
                reject
            });
            this._run();
        });
    }

    _run() {
        while (this.running < this.taskLimit && this.tasks.length > 0) {
            const {task, resolve, reject, args} = this.tasks.shift();
            this.running++;
            task(...args)
                .then(resolve, reject)
                .finally(() => {
                    this.running--;
                    this._run();
                });
        }
    }
}

const asyncSchedule = new AsyncSchedule();
const sleep = (tag, delay = 2000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`任务执行：${tag}`);
            resolve();
        }, delay);
    });
};

asyncSchedule.addTask(sleep, 1, 2000);
asyncSchedule.addTask(sleep, 2, 2000);
asyncSchedule.addTask(sleep, 3, 2000);
asyncSchedule.addTask(sleep, 4, 2000);
asyncSchedule.addTask(sleep, 5, 2000);
