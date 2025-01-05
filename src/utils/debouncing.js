function debouncing(func, delay) {
    let timer;

    return function (...args) {
        const context = this;
        clearTimeout(timer); // Clear the previous timer
        timer = setTimeout(() => {
            func.apply(context, args); // Execute the function after the delay
        }, delay);
    };
}
export default debouncing