import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/features/auth';
import { removeAllCanvases } from '../app/features/allCanvases';
import { removeCanvas } from '../app/features/canvases';
import removeAuthToken from '../utils/removeAuthToken';
import { useNavigate } from 'react-router-dom';
import socket from "../socket/socket"
import { removeAllOnlineUser } from '../app/features/onlineUsers';
import { clearCanvasAdmin } from '../app/features/canvasAdmin';
import { clearAllCollab } from '../app/features/allCollaborators';
import removeStoredCanvasBg from "../utils/removeStoredCanvasBg";
import { removeAllLiveCanvases } from '../app/features/allLiveCanvases';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user } = useSelector(state => state.authReducer)

    const handleLogout = () => {
        dispatch(logout());
        dispatch(removeAllCanvases())
        dispatch(removeCanvas())
        removeAuthToken()
        socket.emit("log-out", user.id)
        navigate("/signin");
        removeStoredCanvasBg()
        dispatch(removeAllOnlineUser())
        dispatch(clearCanvasAdmin())
        dispatch(clearAllCollab())
        dispatch(removeAllLiveCanvases())
    };



    return handleLogout
};

export default useLogout;
