import { useDispatch } from 'react-redux';
import { logout } from '../app/features/auth';
import { removeAllCanvases } from '../app/features/allCanvases';
import { removeCanvas } from '../app/features/canvases';
import removeAuthToken from '../utils/removeAuthToken';
import { useNavigate } from 'react-router-dom';
import socket from "../socket/socket"
import { removeAllOnlineUser } from '../app/features/onlineUsers';
import { clearCanvasAdmin } from '../app/features/canvasAdmin';
import { clearAllCollab } from '../app/features/allCollaborators';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        dispatch(removeAllCanvases())
        dispatch(removeCanvas())
        removeAuthToken()
        socket.disconnect()
        navigate("/signin");
        localStorage.removeItem("background-color");
        dispatch(removeAllOnlineUser())
        dispatch(clearCanvasAdmin())
        dispatch(clearAllCollab())
    };



    return handleLogout
};

export default useLogout;
