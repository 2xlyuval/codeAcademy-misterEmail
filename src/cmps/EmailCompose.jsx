import { Link } from "react-router-dom";

export function EmailCompose({ params }) {
  return (
    <div className="email-compose">
      <div className="compose-header">
        <div className="title">New Messege</div>
        <div className="actions">
          <span className="icon minimize"></span>
          <span className="icon openClose-fullScren"></span>
          <Link to={`/email/${params.folder}`}>
            <span className="icon close"></span>
          </Link>
        </div>
      </div>
      <form>
        <label htmlFor="to">
          <input type="text" id="to" placeholder="to" />
        </label>
        <label htmlFor="subject">
          <input type="text" id="subject" placeholder="subject" />
        </label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>send</button>
      </form>
    </div>
  );
}
