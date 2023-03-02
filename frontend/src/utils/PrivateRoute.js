import Redirect from "../components/Redirect/Redirect";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const [user] = useAuth();
  return user ? children : <Redirect />;
};

export default PrivateRoute;
