import { deleteJournalEntry } from "./journalDataProvider.js";

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("entry-delete-button")) {
    const [ prefix, entryId ] = clickEvent.target.id.split("--")
    deleteJournalEntry(entryId)
  }
})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("entry-edit-button")) {
    const [ prefix, entryId ] = clickEvent.target.id.split("--")
    const editEntryEvent = new CustomEvent("editJournalEntry", {
      detail: {
        entryId: entryId
      }
    })
    eventHub.dispatchEvent(editEntryEvent)
  }
})

export const journalEntryHTML = (entry) =>{
  return `
  <article class="past-entry" id="entry-${entry.id}">
    <h2 class="entry-concept">${entry.concept}</h2>
    <div class="entry-mood">${entry.mood.name}</div>
    <div class="entry-date">${entry.date}</div>
    <p class="entry-entry">${entry.entry}</p>
    <button id="entry-delete-button--${entry.id}">Delete</button>
    <button id="entry-edit-button--${entry.id}">Edit</button>
  </article>
  `
}