import { useState } from "react";
import { emailService } from "../services/email.service";
import { useEffect } from "react";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const loggedinUser = {
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
  };

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      const emails = await emailService.query();
      setEmails(emails);
    } catch (error) {}
  }

  if (!emails) return <div>Loading...</div>;

  return (
    <section>
      <h1>Email App</h1>
      <pre>{JSON.stringify(emails, null, 2)}</pre>
    </section>
  );
}
