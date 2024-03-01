import { NavLink, Outlet } from "react-router-dom";

export function AboutUs() {
  return (
    <section className="about-us">
      <div className="container ">
        <h1>About Us</h1>
        <p>
          Welcome to our Gmail-inspired project! We're thrilled to have you here
          and to share more about the journey behind this endeavor.
        </p>
        <nav className="tabs">
          <NavLink to="/about/project">About Project</NavLink>
          <NavLink to="/about/team">About Team</NavLink>
        </nav>
        <Outlet />
      </div>
    </section>
  );
}
