import { Link, Outlet } from "react-router-dom";

export function AboutUs() {
  return (
    <section>
      <h1>this is us</h1>
      <nav>
        <Link to="/about/project">About Project</Link>
        <Link to="/about/team">About Team</Link>
      </nav>
      <Outlet />
    </section>
  );
}
