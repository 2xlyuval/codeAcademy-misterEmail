import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import { emailService } from "../services/email.service";

import { EmailHeader } from "../cmps/EmailHeader";
import { EmailList } from "../cmps/EmailList";
import { EmailMainMenu } from "../cmps/EmailMainMenu";
import { EmailCompose } from "../cmps/EmailCompose";
import { eventBusService } from "../services/eventbus.service";

export function EmailIndex() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  );
  const [unreadCount, setUnreadCount] = useState(null);

  useEffect(() => {
    countUnreadEmails();
  }, []);

  useEffect(() => {
    setFilterBy((prevFilter) => ({ ...prevFilter, folder: params.folder }));
  }, [params.folder]);

  useEffect(() => {
    setSearchParams(filterBy);
    loadEmails();
  }, [filterBy]);

  async function countUnreadEmails() {
    try {
      const unradEmails = await emailService.query({
        ...emailService.getDefaultFilter(),
        isRead: false,
      });
      setUnreadCount(unradEmails.length);
    } catch (error) {
      console.log("Error loding emails", error);
    }
  }

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
      eventBusService.emmit("show-use-msg", {
        type: "error",
        txt: "failed to load emails",
        show: true,
      });
    }
  }

  async function onDeleteEmail(emailId) {
    try {
      await emailService.remove(emailId);
      //update emails state to save api calls
      setEmails((emailsPrev) => {
        return emailsPrev.filter((email) => email.id !== emailId);
      });
      eventBusService.emmit("show-use-msg", {
        type: "success",
        txt: "email are delted!",
        show: true,
      });
    } catch (error) {
      console.log("Error deleting email", error);
      eventBusService.emmit("show-use-msg", {
        type: "error",
        txt: "failed to delete email",
        show: true,
      });
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

      eventBusService.emmit("show-use-msg", {
        type: "success",
        txt: "email was updated!",
        show: true,
      });
    } catch (error) {
      console.log("Error updating email", error);
      eventBusService.emmit("show-use-msg", {
        type: "error",
        txt: "fail to updated email :(",
        show: true,
      });
    }
  }

  function onAddEmail(email) {
    try {
      emailService.save(email);
      setEmails((prevEmails) => [...prevEmails, email]);
      eventBusService.emmit("show-use-msg", {
        type: "success",
        txt: "email are saved!",
        show: true,
      });
    } catch (error) {
      console.log("had issue add email", error);
      eventBusService.emmit("show-use-msg", {
        type: "error",
        txt: "email not saved :(",
        show: true,
      });
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
        <EmailMainMenu params={params} unreadCount={unreadCount} />
        {params.emailId ? (
          <Outlet context={{ emails, onUpdateEmail, onDeleteEmail }} />
        ) : (
          <>
            <EmailList
              emails={emails}
              onUpdateEmail={onUpdateEmail}
              onDeleteEmail={onDeleteEmail}
            />
            {searchParams.get("compose") && (
              <EmailCompose params={params} onAddEmail={onAddEmail} />
            )}
          </>
        )}

        <section className="side-panel"></section>
      </main>
    </section>
  );
}
