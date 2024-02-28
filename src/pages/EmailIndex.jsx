import { useState } from "react";
import { emailService } from "../services/email.service";
import { useEffect } from "react";
import { EmailList } from "../cmps/EmailList";

export function EmailIndex() {
  //I use null and not [] beacuse until the i get the data the com will try to render an empty array and it will throw error
  const [emails, setEmails] = useState(null);
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
      console.log("Error loding robots", error);
    }
  }

  //wating for the data come back from storage
  if (!emails) return <div>Loading...</div>;

  return (
    <section>
      <h1>Email App</h1>
      <EmailList emails={emails} />
    </section>
  );
}
