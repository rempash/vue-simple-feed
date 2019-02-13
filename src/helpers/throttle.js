export const throttle = (fn, interval) => {
    let lastTime;
    return function throttled() {
        let timeSinceLastExecution = Date.now() - lastTime;
        if (!lastTime || (timeSinceLastExecution >= interval)) {
            fn.apply(this, arguments);
            lastTime = Date.now();
        }
    };
};
//# sourceMappingURL=throttle.js.map