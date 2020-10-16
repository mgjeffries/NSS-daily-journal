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
  return  fetch("http://localhost:8088/entries")
    .then(entryData => entryData.json())
    .then(entryArray => {
      journal = entryArray
    })
}

export const saveJournalEntry = (entry) => {

  const jsonEntry = JSON.stringify(entry)
  let savedId = 0

  return fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonEntry
  })
    .then( res => res.json())
    .then( newEntry => savedId = newEntry.id)
    .then(getJournalEntries)
    .then(dispatchChangeEvent)
    .then( () => savedId)


}
export const editJournalEntry = (entry) => {

  const jsonEntry = JSON.stringify(entry)

  return fetch(`http://localhost:8088/entries/${entry.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonEntry
  })
    .then(getJournalEntries)
    .then( dispatchChangeEvent )

}

export const deleteJournalEntry = entryId => {
  return fetch(`http://localhost:8088/entries/${entryId}`, {
    method: "DELETE"
  })
  .then(getJournalEntries)
  .then( dispatchChangeEvent )
}

const dispatchChangeEvent = () => eventHub.dispatchEvent(journalEntryChange)