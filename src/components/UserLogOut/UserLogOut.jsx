import "./UserLogOut.css";
import { logOut } from "../../utilities/services/users";

export default function UserLogOut({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div>
      <div>{user.name}</div>
      {/* <div className="email">{user.email}</div> */}
      <button className="btn-sm" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}
