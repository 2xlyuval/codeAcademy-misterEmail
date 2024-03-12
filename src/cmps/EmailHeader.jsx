import { EmailFilter } from "../cmps/EmailFilter"
import logoImg from "../assets/imgs/gmail-logo.png"

export function EmailHeader({ filterBy, onSetFilter }) {
  return (
    <header className="email-header">
      <div className="flex align-center">
        <div className="main-menu-btn" data-tooltip="main menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="gmail-logo">
          <img src={logoImg} alt="logo" />
        </div>
      </div>
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
    </header>
  )
}
