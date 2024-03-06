import inboxOutline from "../assets/imgs/inbox-outline.png";
import inboxFill from "../assets/imgs/inbox-fill.png";
import starOutline from "../assets/imgs/star-outline.png";
import starFill from "../assets/imgs/star-fill.png";
import snoozeOutline from "../assets/imgs/snooze-outline.png";
import snoozeFill from "../assets/imgs/snooze-fill.png";
import sentOutline from "../assets/imgs/sent-outline.png";
import sentFill from "../assets/imgs/sent-fill.png";
import compose from "../assets/imgs/compose.png";
import { NavLink } from "react-router-dom";

export function EmailMainMenu() {
  const menuItems = [
    {
      name: "inbox",
      title: "inbox",
      images: { outline: inboxOutline, fill: inboxFill },
      to: "/inbox",
    },
    {
      name: "isStarred",
      title: "starred",
      images: { outline: starOutline, fill: starFill },
      to: "/isStarred",
    },
    {
      name: "snooze",
      title: "snoozed",
      images: { outline: snoozeOutline, fill: snoozeFill },
      to: "/snoozed",
    },
    {
      name: "sent",
      title: "sent",
      images: { outline: sentOutline, fill: sentFill },
      to: "sent",
    },
  ];
  return (
    <section className="main-menu">
      <div className="compose-mail">
        <span>
          <img src={compose} alt="" />
        </span>{" "}
        compose
      </div>
      {menuItems.map((item, idx) => (
        <MainMenuItem
          key={idx}
          name={item.name}
          title={item.title}
          images={item.images}
          to={item.to}
        />
      ))}
    </section>
  );
}

function MainMenuItem({ name, title, to, images }) {
  return (
    <NavLink to={`/email${to}`} className="main-menu-item">
      <span>
        <img src={images.outline} alt={name} />
      </span>
      <span>{title}</span>
    </NavLink>
  );
}
