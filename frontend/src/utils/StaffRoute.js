import Redirect from "../components/Redirect/Redirect";
import useAuth from "../hooks/useAuth";

const StaffRoute = ({ children }) => {
  const [user] = useAuth();
  return user.is_staff ? children : <Redirect />;
};

export default StaffRoute;
