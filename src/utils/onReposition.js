// redo function
const onReposition = (e, setStagePosition, setScale) => {
    e.preventDefault();
    setStagePosition({
        x: width / 2,
        y: height / 2,
    });
    setScale(1);
};
