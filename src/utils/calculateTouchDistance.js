// Utility to calculate distance between two touch points
const calculateTouchDistance = (e) => {
    const [touch1, touch2] = e.evt.touches;
    return Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
};

export default calculateTouchDistance