const eventHub = document.querySelector(".container")
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
  return  fetch("http://localhost:3000/entries")
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
    const journalEntryChange = new CustomEvent("journalEntryChange")
    eventHub.dispatchEvent(journalEntryChange)
  }
  )

}