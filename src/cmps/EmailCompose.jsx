import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailCompose({ params, onAddEmail }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState(emailService.getDefaultEmail());

  function handleChange(ev) {
    let { name: field, value, type } = ev.target;

    console.log(ev);

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
  );
}
