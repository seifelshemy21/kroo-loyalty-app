import { NavLink } from "react-router-dom";

export default function SideDash() {
  return (
    <div className="side_bar">
      <NavLink  to="" className="side_link">
      <i className="fa-solid fa-calendar-days"></i>
        Bookings
      </NavLink>
      <NavLink  to="" className="side_link">
      <i className="fa-solid fa-gift"></i>
       Rewards
      </NavLink>
    </div>
  );
}
