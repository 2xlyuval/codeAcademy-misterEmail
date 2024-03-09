import { Link, useParams } from "react-router-dom";
import { utilService } from "../services/util.service";

export function EmailPreview({ email }) {
  const params = useParams();

  const path =
    params.folder == "draft"
      ? `/email/${params.folder}?compose=${email.id}`
      : `/email/${params.folder}/${email.id}`;

  return (
    <Link to={path}>
      <article className="email-preview flex align-center">
        <div className="email-from">
          {utilService.getStringBeforeChar(email.from, "@")}
        </div>
        <div className="email-content">
          <span className="email-subject">{email.subject}</span>
          <span className="dash">-</span>
          <span className="email-body">{email.body}</span>
        </div>
        <div className="email-sentAt">
          {utilService.formatTimeStamp(email.sentAt)}
        </div>
      </article>
    </Link>
  );
}
