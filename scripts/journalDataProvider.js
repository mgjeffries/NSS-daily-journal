const eventHub = document.querySelector(".container")
const journalEntryChange = new CustomEvent("journalEntryChange")
let journal = []


export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
      (currentEntry, nextEntry) =>
          Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  )
   
  // reverse the sorted list to organize by most recent entry.
  return sortedByDate.reverse()
}


export const getJournalEntries = () => {
  return  fetch("http://localhost:3000/entries?_expand=mood")
    .then(entryData => entryData.json())
    .then(entryArray => {
      journal = entryArray
    })
}

export const saveJournalEntry = (entry) => {

  const jsonEntry = JSON.stringify(entry)

  return fetch("http://localhost:3000/entries", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonEntry
  })
    .then(getJournalEntries)
    .then( () => {
    eventHub.dispatchEvent(journalEntryChange)
  }
  )

}
export const editJournalEntry = (entry) => {

  const jsonEntry = JSON.stringify(entry)

  return fetch(`http://localhost:3000/entries/${entry.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonEntry
  })
    .then(getJournalEntries)
    .then( () => {
    eventHub.dispatchEvent(journalEntryChange)
  }
  )

}

export const deleteJournalEntry = entryId => {
  return fetch(`http://localhost:3000/entries/${entryId}`, {
    method: "DELETE"
  })
  .then(getJournalEntries)
  .then( () => {
    eventHub.dispatchEvent(journalEntryChange)}
    )
}