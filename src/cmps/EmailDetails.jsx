import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { onUpdateEmail, emails } = useOutletContext();

  useEffect(() => {
    loadEmail();
  }, [params.emailId]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
      if (email.isRead == false) updateEmailisRead(email, true);
    } catch (error) {
      console.log("error load email by id", error);
      navigate("/email");
    }
  }

  // i need to change it beacste it dosent set update email list state
  function updateEmailisRead(email, state) {
    const updatedEmail = { ...email, isRead: state };
    onUpdateEmail(updatedEmail);
  }

  function getAdjacentEmailId(currentId, direction) {
    // Find the index of the email with the current ID
    const currentIndex = emails.findIndex((email) => email.id === currentId);

    // Determine the index of the adjacent email based on the direction
    let adjacentIndex;
    if (direction === "next") {
      adjacentIndex = currentIndex + 1;
    } else if (direction === "prev") {
      adjacentIndex = currentIndex - 1;
    }

    // If the current ID is not found or it's at the boundary, return null
    if (adjacentIndex < 0 || adjacentIndex >= emails.length) {
      return null;
    }

    // Return the ID of the adjacent email
    return emails[adjacentIndex].id;
  }

  if (!email) return <div>Loading..</div>;
  return (
    <section className="email-details">
      <div className="top-bar">
        <Link to="/email" className="back-btn">
          Return
        </Link>
        <Link
          to={`/email/${getAdjacentEmailId(email.id, "next")}`}
          className="next-email-btn"
        >
          Next
        </Link>
        <Link
          to={`/email/${getAdjacentEmailId(email.id, "prev")}`}
          className="prev-email-btn"
        >
          prev
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
