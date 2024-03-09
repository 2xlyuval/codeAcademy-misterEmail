import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailCompose({ params, onAddEmail }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState(emailService.getDefaultEmail());
  //minimized, normal, fullscreen
  const [viewState, setViewState] = useState("normal");

  function handleChange(ev) {
    let { name: field, value, type } = ev.target;

    setEmail((prevEmail) => {
      return {
        ...prevEmail,
        [field]: value,
      };
    });
  }

  async function onSaveEmail(ev) {
    ev.preventDefault();
    try {
      await onAddEmail(email);
      navigate(`/email/${params.folder}`);
    } catch (error) {
      console.log("had issue save email", error);
    }
  }

  return (
    <div className={`email-compose-wrapper ${viewState}`}>
      <div className="email-compose">
        <div className="compose-header">
          <div className="title">New Messege</div>
          <div className="actions">
            <span
              onClick={() => setViewState("minimized")}
              className="icon minimize"
            ></span>
            <span
              onClick={() =>
                setViewState((prevView) =>
                  prevView == "normal"
                    ? (prevView = "fullscreen")
                    : (prevView = "normal")
                )
              }
              className="icon openClose-fullScren"
            ></span>
            <Link to={`/email/${params.folder}`}>
              <span className="icon close"></span>
            </Link>
          </div>
        </div>
        <form onSubmit={onSaveEmail}>
          <label htmlFor="to">
            <input
              type="email"
              id="to"
              placeholder="to"
              name="to"
              value={email.to}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="subject">
            <input
              type="text"
              id="subject"
              placeholder="subject"
              name="subject"
              value={email.subject}
              onChange={handleChange}
            />
          </label>
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            value={email.body}
            onChange={handleChange}
          ></textarea>
          <button>send</button>
        </form>
      </div>
    </div>
  );
}
