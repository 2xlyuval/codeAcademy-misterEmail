import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const emailService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter,
  getFilterFromParams,
  getDefaultEmail,
}

const STORAGE_KEY = "emails"
const loggedinUser = {
  userEmail: "user@appsus.com",
  fullname: "Mahatma Appsus",
}
const emailsDummyData = [
  {
    id: "e101",
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: true,
    isStarred: true,
    sentAt: 1646062191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null, // for later use
    from: "momo@momo.com",
    to: "notuser@appsus.com",
  },
  {
    id: "e102",
    subject: "Regarding our meeting",
    body: "Can we reschedule?",
    isRead: true,
    isStarred: true,
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
    isRead: false,
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
    to: "notMyUser@appsus.com",
  },
  {
    id: "e109",
    subject: "Feedback Request",
    body: "We'd appreciate your feedback on our services.",
    isRead: true,
    isStarred: false,
    sentAt: 1645476191000, // Example timestamp, you can put any valid timestamp here
    removedAt: null,
    from: "feedback@company.com",
    to: "notMyUser@appsus.com",
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
    to: "notMyUser@appsus.com",
  },
]

_createEmails()

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY)
  if (filterBy) {
    emails = filterEmails(emails, filterBy)
  }
  return emails
}

function filterEmails(emails, filterBy) {
  let filteredEmails = []
  const { hasStr, from, subject, isRead: isReadStr, date, folder } = filterBy
  const isRead = _convertToBoolean(isReadStr)

  // all email that havn't been removed
  filteredEmails = emails.filter((email) => !email.removedAt)

  switch (folder) {
    case "inbox":
      //all emails that sent TO me
      filteredEmails = filteredEmails.filter(
        (email) => email.to == loggedinUser.userEmail
      )
      break
    case "starred":
      //all emails that are starred
      filteredEmails = filteredEmails.filter((email) => email.isStarred == true)
      break
    case "sent":
      //all emails that have bben sent
      filteredEmails = filteredEmails.filter((email) => email.sentAt)
      //and that was sent by me
      filteredEmails = filteredEmails.filter(
        (email) => email.from == loggedinUser.userEmail
      )
      break
    case "trash":
      //all emails that been removed
      filteredEmails = emails.filter((email) => email.removedAt)
      break
    case "draft":
      //all emails that havn't been sent
      filteredEmails = filteredEmails.filter((email) => email.sentAt == null)
      break
  }
  // filter by includes string
  if (hasStr) {
    filteredEmails = filterByHasStr(filteredEmails, hasStr, [
      "subject",
      "body",
      "from",
    ])
  }

  // filter by from
  if (from) {
    filteredEmails = filterByHasStr(filteredEmails, from, ["from"])
  }

  // filter by subject
  if (subject) {
    filteredEmails = filterByHasStr(filteredEmails, subject, ["subject"])
  }

  // filter by date
  if (date) {
    filteredEmails = filterBySpecificDate(filteredEmails, date)
  }

  // filter by isRead
  filteredEmails = filterByIsRead(filteredEmails, isRead)

  return filteredEmails
}

function filterByIsRead(emails, isRead) {
  if (isRead == true) return emails.filter((email) => email.isRead == true)
  if (isRead == false) return emails.filter((email) => email.isRead == false)
  return emails
}

function filterBySpecificDate(emails, targetDate) {
  const targetTimestamp = new Date(targetDate).setUTCHours(0, 0, 0, 0)
  return emails.filter((email) => {
    const emailTimestamp = new Date(email.sentAt).setUTCHours(0, 0, 0, 0)
    return emailTimestamp === targetTimestamp
  })
}

function filterByHasStr(emails, hasStr, fields = ["subject", "body", "from"]) {
  const regex = new RegExp(hasStr, "i")
  return emails.filter((email) => {
    return fields.some((field) => {
      const fieldValue = email[field]
      return fieldValue && regex.test(fieldValue)
    })
  })
}

function getDefaultFilter() {
  return {
    hasStr: "",
    from: "",
    subject: "",
    isRead: "null",
    date: "",
    folder: "inbox",
    date: "",
  }
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filetrBy = {}
  for (const field in defaultFilter) {
    filetrBy[field] = searchParams.get(field) || defaultFilter[field]
  }
  return filetrBy
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave)
  } else {
    return storageService.post(STORAGE_KEY, emailToSave)
  }
}

function getDefaultEmail() {
  return {
    body: "",
    to: "",
    subject: "",
    from: loggedinUser.userEmail,
    sentAt: null,
    isStarred: false,
    isRead: true,
    removedAt: null,
  }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY)
  if (!emails || !emails.length) {
    emails = emailsDummyData
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
      })
    }
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
}

function _convertToBoolean(value) {
  var boolianVal = value === "null" ? null : value === "true"
  return boolianVal
}
