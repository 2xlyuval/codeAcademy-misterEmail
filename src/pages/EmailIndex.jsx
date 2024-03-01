import { useState } from "react";
import { emailService } from "../services/email.service";
import { useEffect } from "react";
import { EmailList } from "../cmps/EmailList";
import { Outlet, Route, Routes, useParams } from "react-router";
import { EmailDetails } from "../cmps/EmailDetails";

export function EmailIndex() {
  //I use null and not [] beacuse until the i get the data the com will try to render an empty array and it will throw error
  const [emails, setEmails] = useState(null);
  const params = useParams();
  const loggedinUser = {
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
  };

  // i load the data with useEfffect becuse if not i will get into a loop od rendering becuse the state keep changing
  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      const emails = await emailService.query();
      setEmails(emails);
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
    <section className="container email-index">
      <h1>Email App</h1>
      {params.emailId ? (
        <Outlet />
      ) : (
        <EmailList
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onUpdateEmail={onUpdateEmail}
        />
      )}
    </section>
  );
}
