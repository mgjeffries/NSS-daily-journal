import { journalEntryHTML } from "./journalEntry.js"
import { getJournalEntries, useJournalEntries } from "./journalDataProvider.js"
import { getTags, useTags } from "./tagProvider.js"
import { getEntryTags, useEntryTags } from "./entryTagsProvider.js"

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
    .then(getTags)
    .then(getEntryTags)
    .then( () => {
      const journalEntries = useJournalEntries()
      const tags = useTags()
      const entryTags = useEntryTags()

      

      // convert the entry objects to html
      let journalEnriesAsHTML = journalEntries.map(entry => {
        const relatedEntryTags = entryTags.filter( entryTag => {
          return entryTag.entryId === entry.id
        })

        const relatedTags = relatedEntryTags.map( relatedEntryTag => {
          return tags.find( tag => tag.id === relatedEntryTag.tagId )
        })

        return journalEntryHTML(entry, relatedTags)
      }).join("")

      // modify the dom 
      contentTarget.innerHTML = journalEnriesAsHTML
    }
  )
}
