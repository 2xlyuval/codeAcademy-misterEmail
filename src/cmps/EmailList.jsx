import { useParams } from "react-router";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onUpdateEmail, onDeleteEmail }) {
  const params = useParams();

  function toggleStar(email) {
    const updatedEmail = { ...email, isStarred: !email.isStarred };
    onUpdateEmail(updatedEmail);
  }

  function toggleRead(email) {
    const updatedEmail = { ...email, isRead: !email.isRead };
    onUpdateEmail(updatedEmail);
  }

  function onRemoveEmail(email) {
    if (params.folder == "trash") {
      onDeleteEmail(email.id);
    } else {
      moveEmailToTrash(email);
    }
  }

  function moveEmailToTrash(email) {
    const updatedEmail = { ...email, removedAt: Date.now() };
    onUpdateEmail(updatedEmail);
  }

  return (
    <section className="email-list-container">
      <div className="email-list-header">all emails</div>
      <ul className="email-list clean-list">
        {emails.map((email) => {
          return (
            <li
              key={email.id}
              className={`email-list-item flex align-center ${
                email.isRead ? "isRead" : ""
              }`}
            >
              <div className="email-selection-btns flex align-center">
                <div className="email-drag-handle"></div>
                <div className="email-checbox" data-tooltip="select"></div>
                <div
                  className={`email-star ${email.isStarred ? "checked" : ""}`}
                  onClick={() => toggleStar(email)}
                  data-tooltip={email.isStarred ? "starred" : "not starred"}
                ></div>
              </div>
              <EmailPreview email={email} />
              <div className="email-actions flex align-center">
                <div className="email-archive" data-tooltip="archive"></div>
                <div
                  className="email-delete"
                  onClick={() => onRemoveEmail(email)}
                  data-tooltip="delete"
                ></div>
                <div
                  className={`email-read ${email.isRead ? "checked" : ""}`}
                  onClick={() => toggleRead(email)}
                  data-tooltip={
                    email.isRead ? "mark as unread" : "mark as read"
                  }
                ></div>
                <div className="email-snooze" data-tooltip="snooze"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
