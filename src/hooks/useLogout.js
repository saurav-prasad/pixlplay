import { useDispatch } from 'react-redux';
import { logout } from '../app/features/auth';
import { removeAllCanvases } from '../app/features/allCanvases';
import { removeCanvas } from '../app/features/canvases';
import removeAuthToken from '../utils/removeAuthToken';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        dispatch(removeAllCanvases())
        dispatch(removeCanvas())
        removeAuthToken()
        navigate("/signin");
    };

    return handleLogout
};

export default useLogout;
