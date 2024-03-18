import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { emailService } from "../services/email.service"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { svg } from "../assets/svg"

export function EmailCompose({ params, onAddEmail, onUpdateEmail }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [email, setEmail] = useState(emailService.getDefaultEmail())
  const [viewState, setViewState] = useState("normal") //minimized, normal, fullscreen

  const draftTimeout = useRef()
  const timeOutDur = 5000

  const emailId =
    searchParams.get("compose") != "new" ? searchParams.get("compose") : null

  useEffect(() => {
    if (emailId) loadEmail()

    if (searchParams.has("subject", "Help")) {
      setEmail((prevEmail) => ({
        ...prevEmail,
        to: searchParams.get("to"),
        subject: searchParams.get("subject"),
      }))
    }
  }, [])

  useEffectUpdate(() => {
    draftTimeout.current = setTimeout(() => {
      console.log("save")
      onSaveEmail()
    }, timeOutDur)
    return () => {
      console.log("clear timeout")
      clearTimeout(draftTimeout.current)
    }
  }, [email])

  function onCloseCompose() {
    setSearchParams((prevParams) => {
      prevParams.delete("compose")
      return prevParams
    })
  }

  async function loadEmail() {
    try {
      const email = await emailService.getById(emailId)
      setEmail(email)
    } catch (error) {
      console.log("has issues getting email by id", error)
    }
  }

  function handleChange(ev) {
    let { name: field, value, type } = ev.target

    setEmail((prevEmail) => {
      return {
        ...prevEmail,
        [field]: value,
      }
    })
  }

  async function onSaveEmail() {
    try {
      if (email.id) {
        await onUpdateEmail(email)
      } else {
        const newEmail = await onAddEmail(email)
        console.log("new mail", newEmail)
        setEmail(newEmail)
      }
    } catch (error) {
      console.log("had issue save email", error)
    }
  }

  async function onSentEmail(ev) {
    ev.preventDefault()
    try {
      if (email.id) await onUpdateEmail({ ...email, sentAt: Date.now() })
      else await onAddEmail({ ...email, sentAt: Date.now() })
      onCloseCompose()
    } catch (error) {
      console.log("had issue sent email", error)
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
            <span className="icon close" onClick={onCloseCompose}></span>
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
          <div className="compose-action-btns">
            <button className="send-btn">send</button>
            <button
              type="button"
              className="my-location-btn"
              data-tooltip="Add my location"
            >
              {svg.locationIcon}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
