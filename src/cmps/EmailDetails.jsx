import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();

  useEffect(() => {
    loadEmail();
  }, [params]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
    } catch (error) {
      console.log("error load email by id", error);
    }
  }

  if (!email) return <div>Loading..</div>;
  return (
    <section className="email-details">
      <div className="top-bar">
        <Link to="/email">
          <div className="back-btn">back</div>
        </Link>
        <div
          className="email-delete"
          onClick={() => onRemoveEmail(email.id)}
        ></div>
        <div
          className={`email-read ${email.isRead ? "checked" : ""}`}
          onClick={() => toggleRead(email)}
        ></div>
      </div>
      <h1>{email.subject}</h1>
      <div className="email-info">
        <div className="email-from">{email.from}</div>
        <div className="email-sentAt">
          {/* {utilService.formatTimeStamp(email.sentAt)} */}
        </div>
        <div
          className={`email-star ${email.isStarred ? "checked" : ""}`}
          onClick={() => toggleStar(email)}
        ></div>
      </div>
      <div className="email-body">{email.body}</div>
    </section>
  );
}
