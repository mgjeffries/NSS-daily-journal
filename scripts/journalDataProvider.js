/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
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
  console.log(entry)

  
  const jsonEntry = JSON.stringify(entry)

  return fetch("http://localhost:3000/entries", {
    method: "POST",
    headers: {
      "Content-Type": "applicaton/json"
    },
    body: jsonEntry
  })
    .then(getJournalEntries)
    // TODO: dispatch custom state changed event
}