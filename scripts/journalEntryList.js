import { journalEntryHTML } from "./journalEntry.js"
import { useJournalEntries } from "./journalDataProvider.js"

// function for listing entries to the dom
export const listEntries = () => {
  // get the entries
  const journalEntries = useJournalEntries()

  // convert the entry object to html
  let journalEnriesAsHTML = journalEntries.map(entry => journalEntryHTML(entry))

  // define the target in the dom
  const contentTarget = document.querySelector(".past-entries")

  // modify the dom for every entry in the html
  journalEnriesAsHTML.forEach(entry => contentTarget.innerHTML += entry)

}
