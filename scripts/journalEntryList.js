import { journalEntryHTML } from "./journalEntry.js"
import { useJournalEntries } from "./journalDataProvider.js"


export const listEntries = () => {
  const journalEntries = useJournalEntries()

  let journalEnriesAsHTML = journalEntries.map(entry => journalEntryHTML(entry))

  const contentTarget = document.querySelector(".past-entries")

  journalEnriesAsHTML.forEach(entry => contentTarget.innerHTML += entry)

}
