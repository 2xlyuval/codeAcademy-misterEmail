import { utilService } from "../services/util.service";

export function EmailPreview({ email }) {
  return (
    <article className="email-preview">
      <div className="email-from">{email.from}</div>
      <div className="email-content">
        <span className="email-subject">{email.subject}</span>
        <span className="email-body">{email.body}</span>
      </div>
      <div className="email-sentAt">
        {utilService.formatTimeStamp(email.sentAt)}
      </div>
    </article>
  );
}
