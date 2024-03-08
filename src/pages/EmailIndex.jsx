import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import { emailService } from "../services/email.service";

import { EmailHeader } from "../cmps/EmailHeader";
import { EmailList } from "../cmps/EmailList";
import { EmailMainMenu } from "../cmps/EmailMainMenu";
import { EmailCompose } from "../cmps/EmailCompose";

export function EmailIndex() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  //I use null and not [] beacuse until the i get the data the com will try to render an empty array and it will throw error
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  );

  useEffect(() => {
    setFilterBy((prevFilter) => ({ ...prevFilter, folder: params.folder }));
  }, [params.folder]);

  // i load the data with useEfffect becuse if not i will get into a loop od rendering becuse the state keep changing
  useEffect(() => {
    setSearchParams(filterBy);
    loadEmails();
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query({
        ...filterBy,
        folder: params.folder,
      });
      setEmails(emails);
    } catch (error) {
      console.log("Error loding emails", error);
    }
  }

  async function onDeleteEmail(emailId) {
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
  const { hasStr, from, subject, isRead, date, folder } = filterBy;
  return (
    <section className="email-index">
      <EmailHeader
        filterBy={{ hasStr, from, subject, isRead, date }}
        onSetFilter={onSetFilter}
      />
      <main className="email-main">
        <EmailMainMenu params={params} />
        {params.emailId ? (
          <Outlet context={{ emails, onUpdateEmail, onDeleteEmail }} />
        ) : (
          <>
            <EmailList
              emails={emails}
              onUpdateEmail={onUpdateEmail}
              onDeleteEmail={onDeleteEmail}
            />
            {searchParams.get("compose") && <EmailCompose params={params} />}
          </>
        )}

        <section className="side-panel"></section>
      </main>
    </section>
  );
}
