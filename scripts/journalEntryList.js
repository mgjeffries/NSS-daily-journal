import { journalEntryHTML } from "./journalEntry.js"
import { getJournalEntries, useJournalEntries } from "./journalDataProvider.js"

const contentTarget = document.querySelector(".past-entries")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("journalEntryChange", customEvent => {
  listEntries()
  }
)

// function for listing entries to the dom
export const listEntries = () => {
  // get the entries
  getJournalEntries()
    .then( () => {
      const journalEntries = useJournalEntries()

      // convert the entry objects to html
      let journalEnriesAsHTML = journalEntries.map(entry => journalEntryHTML(entry)).join("")

      // modify the dom 
      contentTarget.innerHTML = journalEnriesAsHTML
    }
  )
}
