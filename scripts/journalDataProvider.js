/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
  {
      id: 1,
      date: "07/6/2020",
      concept: "Start Day",
      entry: "John Talked to the class most of the day",
      mood: "meh"
  },
  {
      id: 2,
      date: "07/08/2020",
      concept: "HTML & CSS",
      entry: "Jumped in to creating pages with css and flexbox. Feeling overwhelmed",
      mood: "sad"
  },
  {
      id: 3,
      date: "07/16/2020",
      concept: "Lab Day",
      entry: "Working on adding scripts to sites. Back in my comfort zone",
      mood: "happy"
  }
]

export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
      (currentEntry, nextEntry) =>
          Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  )
  
  // reverse the sorted list to organize by most recent entry.
  return sortedByDate.reverse()
}