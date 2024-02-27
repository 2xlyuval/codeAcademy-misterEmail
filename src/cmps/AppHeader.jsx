import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="container">
        <Link to="/email">
          <h1>Gmail Logo</h1>
        </Link>
      </section>
      <nav>
        <ul>
          <li>
            {" "}
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
            <ul>
              <li>
                <NavLink to="/about/project">About Project</NavLink>
              </li>
              <li>
                <NavLink to="/about/team">About Team</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/email">Emails</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
