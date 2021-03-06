export const throttle = (fn, interval: number) => {
    let lastTime;
    return function throttled() {
        const timeSinceLastExecution = Date.now() - lastTime;
        if (!lastTime || (timeSinceLastExecution >= interval)) {
            fn.apply(this, arguments);
            lastTime = Date.now();
        }
    };
};
