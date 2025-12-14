import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const location = useLocation();
  const username = localStorage.getItem('username');

  if (!username) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
