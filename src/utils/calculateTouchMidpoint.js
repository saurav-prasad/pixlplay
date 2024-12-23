// Utility to calculate midpoint between two touch points
const calculateTouchMidpoint = (e) => {
    const [touch1, touch2] = e.evt.touches;
    return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
    };
};
export default calculateTouchMidpoint