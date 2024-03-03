import inboxOutline from "../assets/imgs/inbox-outline.png";
import inboxFill from "../assets/imgs/inbox-fill.png";
import starOutline from "../assets/imgs/star-outline.png";
import starFill from "../assets/imgs/star-fill.png";
import snoozeOutline from "../assets/imgs/snooze-outline.png";
import snoozeFill from "../assets/imgs/snooze-fill.png";
import sentOutline from "../assets/imgs/sent-outline.png";
import sentFill from "../assets/imgs/sent-fill.png";
import compose from "../assets/imgs/compose.png";

export function EmailMainMenu() {
  const menuItems = [
    {
      name: "inbox",
      title: "inbox",
      images: { outline: inboxOutline, fill: inboxFill },
    },
    {
      name: "star",
      title: "starred",
      images: { outline: starOutline, fill: starFill },
    },
    {
      name: "snooze",
      title: "snoozed",
      images: { outline: snoozeOutline, fill: snoozeFill },
    },
    {
      name: "sent",
      title: "sent",
      images: { outline: sentOutline, fill: sentFill },
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
        />
      ))}
    </section>
  );
}

function MainMenuItem({ name, title, images }) {
  return (
    <div className="main-menu-item">
      <input
        id={name}
        type="radio"
        name="main-menu-filter"
        value={name}
        checked
      />
      <label htmlFor={name}>
        <span>
          <img src={images.outline} alt="" />
        </span>
        <span>{title}</span>
      </label>
    </div>
  );
}
