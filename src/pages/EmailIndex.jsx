import { useState, useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { EmailList } from "../cmps/EmailList";
import { emailService } from "../services/email.service";
import { EmailHeader } from "../cmps/EmailHeader";
import { EmailMainMenu } from "../cmps/EmailMainMenu";

export function EmailIndex() {
  //I use null and not [] beacuse until the i get the data the com will try to render an empty array and it will throw error
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const params = useParams();
  const location = useLocation();
  const { hash, pathname, search } = location;
  const loggedinUser = {
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
  };

  // i load the data with useEfffect becuse if not i will get into a loop od rendering becuse the state keep changing
  useEffect(() => {
    console.log("mount");
    loadEmails();
  }, [filterBy, location]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  }

  async function loadEmails() {
    try {
      if (pathname == "/starred") {
        const emails = await emailService.query();
        const starredEmail = emails.filter((email) => email.isStarred == true);
        setEmails(starredEmail);
      } else {
        const emails = await emailService.query(filterBy);
        setEmails(emails);
      }
    } catch (error) {
      console.log("Error loding emails", error);
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId);
      //update emails state to save api calls
      setEmails((emailsPrev) => {
        return emailsPrev.filter((email) => email.id !== emailId);
      });
    } catch (error) {
      console.log("Error deleting email", error);
    }
  }

  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email);
      //update emails state to save api calls
      setEmails((emailsPrev) => {
        return emailsPrev.map((currEmail) => {
          return currEmail.id === updatedEmail.id ? updatedEmail : currEmail;
        });
      });
    } catch (error) {
      console.log("Error updating email", error);
    }
  }

  //wating for the data come back from storage
  if (!emails) return <div>Loading...</div>;

  return (
    <section className="email-index">
      <EmailHeader filterBy={filterBy} onSetFilter={onSetFilter} />
      <main className="email-main">
        <EmailMainMenu />
        {/* Q - cr */}
        {params.emailId ? (
          <Outlet context={{ emails, onUpdateEmail, onRemoveEmail }} />
        ) : (
          <EmailList
            emails={emails}
            onRemoveEmail={onRemoveEmail}
            onUpdateEmail={onUpdateEmail}
          />
        )}
        <section className="side-panel"></section>
      </main>
    </section>
  );
}
