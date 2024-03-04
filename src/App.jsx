import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";
import { Home } from "./pages/Home";
import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";
import { AboutProject } from "./pages/AboutProject";
import { AboutTeam } from "./pages/AboutTeam";
import { EmailDetails } from "./cmps/EmailDetails";

export function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />}>
              <Route path="/about/project" element={<AboutProject />} />
              <Route path="/about/team" element={<AboutTeam />} />
            </Route>
            <Route path="/email" element={<EmailIndex />}>
              <Route path="/email/:emailId" element={<EmailDetails />} />
            </Route>
            <Route path="/starred" element={<EmailIndex />} />
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  );
}
