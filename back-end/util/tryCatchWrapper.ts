export function tryCatchWrapper<T extends Function>(fn: T) {
    return async (...args: any[]) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.error(error);
            throw new Error('Database error. See server log for details.');
        }
    };
}

export function syncTryCatchWrapper<T extends Function>(fn: T) {
    return (...args: any[]) => {
        try {
            return fn(...args);
        } catch (error) {
            console.error(error);
            throw new Error('Database error. See server log for details.');
        }
    };
}