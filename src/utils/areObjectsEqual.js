function areObjectsEqual(obj1, obj2, fields){
    for (const field of fields) {
        if (obj1[field] !== obj2[field]) {
            return false;
        }
    }
    return true;
};

export default areObjectsEqual