import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails }) {
  return (
    <ul className="email-list">
      {emails.map((email) => {
        return (
          <li key={email.id}>
            <div className="email-selection-btns">
              <div className="email-drag-handle"></div>
              <div className="email-checbox"></div>
              <div
                className={`email-star ${email.isStarred ? "starred" : ""}`}
              ></div>
            </div>
            <EmailPreview email={email} />
            <div className="email-actions">
              <div className="email-archive"></div>
              <div className="email-delete"></div>
              <div
                className={`email-read ${email.isRead ? "readed" : ""}`}
              ></div>
              <div className="email-snooze"></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
