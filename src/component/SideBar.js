import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="side_bar">
      <NavLink  to="/admin/users" className="side_link">
      <i className="fa-solid fa-users" ></i>
        Users 
      </NavLink>
      <NavLink  to="/admin/user/create" className="side_link">
      <i className="fa-solid fa-user-plus" ></i>
        New Users 
      </NavLink>
    </div>
  );
}
