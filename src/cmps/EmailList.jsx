import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {
  function toggleStar(email) {
    const updatedEmail = { ...email, isStarred: !email.isStarred };
    onUpdateEmail(updatedEmail);
  }

  function toggleRead(email) {
    const updatedEmail = { ...email, isRead: !email.isRead };
    onUpdateEmail(updatedEmail);
  }

  return (
    <ul className="email-list">
      {emails.map((email) => {
        return (
          <li key={email.id}>
            <div className="email-selection-btns">
              <div className="email-drag-handle"></div>
              <div className="email-checbox"></div>
              <div
                className={`email-star ${email.isStarred ? "checked" : ""}`}
                onClick={() => toggleStar(email)}
              ></div>
            </div>
            <EmailPreview email={email} />
            <div className="email-actions">
              <div className="email-archive"></div>
              <div
                className="email-delete"
                onClick={() => onRemoveEmail(email.id)}
              ></div>
              <div
                className={`email-read ${email.isRead ? "checked" : ""}`}
                onClick={() => toggleRead(email)}
              ></div>
              <div className="email-snooze"></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
