import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter,
};

const STORAGE_KEY = "emails";
const emailsDummyData = [
  {
    id: "e101",
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isStarred: true,
    sentAt: 1646062191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null, // for later use
    from: "momo@momo.com",
    to: "user@appsus.com",
  },
  {
    id: "e102",
    subject: "Regarding our meeting",
    body: "Can we reschedule?",
    isRead: true,
    isStarred: false,
    sentAt: 1645990191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "boss@company.com",
    to: "user@appsus.com",
  },
  {
    id: "e103",
    subject: "Weekly Report",
    body: "Attached is the weekly report.",
    isRead: false,
    isStarred: false,
    sentAt: 1645918191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "manager@company.com",
    to: "user@appsus.com",
  },
  {
    id: "e104",
    subject: "Important Announcement",
    body: "Please read the attached document.",
    isRead: true,
    isStarred: true,
    sentAt: 1645846191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "ceo@company.com",
    to: "user@appsus.com",
  },
  {
    id: "e105",
    subject: "Invitation to the Conference",
    body: "You're invited to attend the conference.",
    isRead: false,
    isStarred: true,
    sentAt: 1645774191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "events@conference.com",
    to: "user@appsus.com",
  },
  {
    id: "e106",
    subject: "Vacation Plans",
    body: "Let's plan our vacation.",
    isRead: true,
    isStarred: false,
    sentAt: 1645702191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "partner@travel.com",
    to: "user@appsus.com",
  },
  {
    id: "e107",
    subject: "Project Update",
    body: "Here's the latest update on the project.",
    isRead: false,
    isStarred: false,
    sentAt: 1645620191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "projectmanager@company.com",
    to: "user@appsus.com",
  },
  {
    id: "e108",
    subject: "Product Launch",
    body: "Exciting news! Our new product is launching soon.",
    isRead: true,
    isStarred: true,
    sentAt: 1645548191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "marketing@company.com",
    to: "user@appsus.com",
  },
  {
    id: "e109",
    subject: "Feedback Request",
    body: "We'd appreciate your feedback on our services.",
    isRead: false,
    isStarred: false,
    sentAt: 1645476191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "feedback@company.com",
    to: "user@appsus.com",
  },
  {
    id: "e110",
    subject: "Happy Birthday!",
    body: "Wishing you a fantastic birthday!",
    isRead: true,
    isStarred: true,
    sentAt: 1645404191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "birthday@friends.com",
    to: "user@appsus.com",
  },
];

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    emails = filterEmails(emails, filterBy);
  }
  return emails;
}

function filterEmails(emails, filterBy) {
  let filteredEmails = emails;
  const { isRead, searchStr, folder } = filterBy;
  if (folder === "inbox") {
    if (isRead != null) {
      filteredEmails = filteredEmails.filter((email) => email.isRead == isRead);
      console.log("isRead", filteredEmails);
    }
    filteredEmails = filteredEmails.filter(
      (email) =>
        email.subject.toLowerCase().includes(searchStr.toLowerCase()) ||
        email.body.toLowerCase().includes(searchStr.toLowerCase()) ||
        email.from.toLowerCase().includes(searchStr.toLowerCase())
    );
  } else {
    filteredEmails = emails.filter((email) => email[folder] == true);
  }
  return filteredEmails;
}

function getDefaultFilter() {
  return {
    searchStr: "",
    isRead: null,
    folder: "inbox",
  };
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

//TODO: change to create email
function createRobot(model = "", type = "", batteryStatus = 100) {
  return {
    model,
    batteryStatus,
    type,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = emailsDummyData;
    for (let i = 11; i <= 50; i++) {
      emails.push({
        id: `e${i}`,
        subject: `Email Subject ${i}`,
        body: `Email Body ${i}`,
        isRead: Math.random() < 0.5,
        isStarred: Math.random() < 0.5,
        sentAt: 1646062191000 - i * 86400000, // Example timestamp, you can adjust as needed
        removedAt: null,
        from: `sender${i}@example.com`,
        to: "user@appsus.com",
      });
    }
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
