function isCanvasCollaboratorPresent(allCollaborators, canvasId, userId) {
    let flag = false
    allCollaborators[canvasId]?.map((data) => {
        if (data?.userId === userId) {
            flag = true
        }
    })
    return flag
}
export default isCanvasCollaboratorPresent