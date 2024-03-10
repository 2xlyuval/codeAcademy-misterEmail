import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailCompose({ params, onAddEmail, onUpdateEmail }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const emailId =
    searchParams.get("compose") != "new" ? searchParams.get("compose") : null;

  const [email, setEmail] = useState(emailService.getDefaultEmail());
  //minimized, normal, fullscreen
  const [viewState, setViewState] = useState("normal");

  useEffect(() => {
    if (timeLeft == 0) {
      clearInterval(timerIntervalRef.current);
      setTimeLeft(5);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (emailId) loadEmail();
  }, []);

  async function loadEmail() {
    try {
      const email = await emailService.getById(emailId);
      setEmail(email);
    } catch (error) {
      console.log("has issues getting email by id", error);
    }
  }

  function handleChange(ev) {
    let { name: field, value, type } = ev.target;

    setEmail((prevEmail) => {
      return {
        ...prevEmail,
        [field]: value,
      };
    });
    // Q - try to use interval but it was too complicated
  }

  //Q - problem that every change the service didnt bring the id on time so it adds mulitiple times
  async function onSaveEmail() {
    try {
      if (email.id) await onUpdateEmail(email);
      else await onAddEmail(email);
    } catch (error) {
      console.log("had issue save email", error);
    }
  }

  async function onSentEmail(ev) {
    ev.preventDefault();
    try {
      if (email.id) await onUpdateEmail({ ...email, isDraft: false });
      else await onAddEmail({ ...email, isDraft: false });
      navigate(`/email/${params.folder}`);
    } catch (error) {
      console.log("had issue sent email", error);
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
        <form onSubmit={onSentEmail}>
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
