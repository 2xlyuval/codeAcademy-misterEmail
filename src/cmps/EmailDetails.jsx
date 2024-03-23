import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router"
import { Link } from "react-router-dom"
import { emailService } from "../services/email.service"
import arrowBack from "../assets/imgs/arrow_back.png"
import GoogleMap from "./GoogleMap"

export function EmailDetails() {
  const [email, setEmail] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  const { emails, onUpdateEmail, onRemoveEmail } = useOutletContext()

  useEffect(() => {
    loadEmail()
  }, [params.emailId])

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId)
      setEmail(email)
      if (email.isRead == false) updateEmailisRead(email, true)
    } catch (error) {
      console.log("error load email by id", error)
      navigate("/email")
    }
  }

  function updateEmailisRead(email, state) {
    const updatedEmail = { ...email, isRead: state }
    onUpdateEmail(updatedEmail)
  }

  function getAdjacentEmailId(currentId, direction) {
    // Find the index of the email with the current ID
    const currentIndex = emails.findIndex((email) => email.id === currentId)

    // Determine the index of the adjacent email based on the direction
    let adjacentIndex
    if (direction === "next") {
      adjacentIndex = currentIndex + 1
    } else if (direction === "prev") {
      adjacentIndex = currentIndex - 1
    }

    // If the current ID is not found or it's at the boundary, return null
    if (adjacentIndex < 0 || adjacentIndex >= emails.length) {
      return null
    }

    // Return the ID of the adjacent email
    return emails[adjacentIndex].id
  }

  if (!email) return <div>Loading..</div>

  //change navigate path to params.emailId becuse i can be on deffrent folders
  return (
    <section className="email-details">
      <div className="top-bar">
        <div className="email-actions flex align-center">
          <Link
            to={`/email/${params.folder}`}
            className="back-btn"
            data-tooltip="Back to inbox"
          >
            <img src={arrowBack} alt="" />
          </Link>
          <div
            className="email-delete"
            onClick={() => {
              onRemoveEmail(email.id)
              navigate(`/email/${params.folder}`)
            }}
            data-tooltip="delete"
          ></div>
          <div
            className={`email-read ${email.isRead ? "checked" : ""}`}
            onClick={() => {
              updateEmailisRead(email, false)
              navigate(`/email/${params.folder}`)
            }}
            data-tooltip="mark as unread"
          ></div>
        </div>
        <div className="email-navigation flex align-center">
          <Link
            to={`/email/${getAdjacentEmailId(email.id, "prev")}`}
            className="prev-email-btn"
            data-tooltip="newer"
          >
            &lsaquo;
          </Link>
          <Link
            to={`/email/${getAdjacentEmailId(email.id, "next")}`}
            className="next-email-btn"
            data-tooltip="older"
          >
            &rsaquo;
          </Link>
        </div>
      </div>
      <h1>{email.subject}</h1>
      <div className="email-info">
        <div className="email-from">{email.from}</div>
        <div className="email-sentAt">
          {/* {utilService.formatTimeStamp(email.sentAt)} */}
        </div>
        <div
          className={`email-star ${email.isStarred ? "checked" : ""}`}
          onClick={() => toggleStar(email)}
        ></div>
      </div>
      <div className="email-body">{email.body}</div>
      {email.map && <GoogleMap lat={email.map.lat} lng={email.map.lng} />}
    </section>
  )
}
