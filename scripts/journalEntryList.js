import { journalEntryHTML } from "./journalEntry.js"
import { getJournalEntries, useJournalEntries } from "./journalDataProvider.js"
import { getTags,  } from "./tagProvider.js"
import { getEntryTags,  } from "./entryTagsProvider.js"
import { findTagsByEntryId } from "./tags.js"

const contentTarget = document.querySelector(".past-entries")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("journalEntryChange", customEvent => {
  listEntries()
  }
)
eventHub.addEventListener("entryTagChange", customEvent => {
  listEntries()
  }
)
eventHub.addEventListener("TagChange", customEvent => {
  listEntries()
  }
)

// function for listing entries to the dom
export const listEntries = () => {
  // get the entries

  getJournalEntries()
    .then(getTags)
    .then(getEntryTags)
    .then( () => {
      const journalEntries = useJournalEntries()

      // convert the entry objects to html
      let journalEnriesAsHTML = journalEntries.map(entry => {
        const relatedTags = findTagsByEntryId(entry.id)
        return journalEntryHTML(entry, relatedTags)
      }).join("")

      // modify the dom 
      contentTarget.innerHTML = journalEnriesAsHTML
    }
  )
}
