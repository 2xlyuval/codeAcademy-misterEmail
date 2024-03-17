import { Link, NavLink } from "react-router-dom"
import { svg } from "../assets/svg"

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="container">
        <Link to="/">
          <h1 className="logo">MISTER EMAIL</h1>
        </Link>
        <nav className="app-nav">
          <ul className="clean-list">
            <li>
              <NavLink to="/about">About Us</NavLink>
              <ul className="clean-list nested-navigation">
                <li>
                  <NavLink to="/about/project">About Project</NavLink>
                </li>
                <li>
                  <NavLink to="/about/team">About Team</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/email/inbox">Emails</NavLink>
            </li>
            {/* Q - how to change params? */}
            <Link to="/email/inbox?compose=new&to=help@gmail.com&subject=Help">
              {svg.helpIcon}
            </Link>
          </ul>
        </nav>
      </section>
    </header>
  )
}
