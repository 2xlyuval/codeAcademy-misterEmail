import inboxOutline from "../assets/imgs/inbox-outline.png"
import inboxFill from "../assets/imgs/inbox-fill.png"
import starOutline from "../assets/imgs/star-outline.png"
import starFill from "../assets/imgs/star-fill.png"
import trashOutline from "../assets/imgs/delete-outline.png"
import trashFill from "../assets/imgs/delete-fill.png"
import sentOutline from "../assets/imgs/sent-outline.png"
import sentFill from "../assets/imgs/sent-fill.png"
import draftOutline from "../assets/imgs/draft-outline.png"
import draftFill from "../assets/imgs/draft-fill.png"
import compose from "../assets/imgs/compose.png"
import { Link, NavLink, useSearchParams } from "react-router-dom"

export function EmailMainMenu({ params, unreadCount }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const menuItems = [
    {
      name: "inbox",
      title: "inbox",
      images: { outline: inboxOutline, fill: inboxFill },
      to: "/inbox",
    },
    {
      name: "starred",
      title: "starred",
      images: { outline: starOutline, fill: starFill },
      to: "/starred",
    },
    {
      name: "trash",
      title: "trash",
      images: { outline: trashOutline, fill: trashFill },
      to: "/trash",
    },
    {
      name: "sent",
      title: "sent",
      images: { outline: sentOutline, fill: sentFill },
      to: "/sent",
    },
    {
      name: "draft",
      title: "draft",
      images: { outline: draftOutline, fill: draftFill },
      to: "/draft",
    },
  ]

  function onOpenCompose() {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("compose", "new")
      return prevSearchParams
    })
  }

  return (
    <section className="main-menu">
      <button onClick={onOpenCompose} className="compose-mail">
        <span>
          <img src={compose} alt="" />
        </span>
        compose
      </button>
      {menuItems.map((item, idx) => (
        <MainMenuItem
          key={idx}
          name={item.name}
          title={item.title}
          images={item.images}
          to={item.to}
          params={params}
          unreadCount={unreadCount}
        />
      ))}
    </section>
  )
}

function MainMenuItem({ name, title, to, images, params, unreadCount }) {
  return (
    <NavLink to={`/email${to}`} className="main-menu-item">
      <span>
        <img
          src={params.folder == name ? images.fill : images.outline}
          alt={name}
        />
      </span>
      <span>{title}</span>
      {name == "inbox" && (
        <span style={{ marginLeft: "auto" }}>{unreadCount}</span>
      )}
    </NavLink>
  )
}
