import { deleteJournalEntry } from "./journalDataProvider.js";

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("entry-delete-button")) {
    const [ prefix, entryID ] = clickEvent.target.id.split("--")
    deleteJournalEntry(entryID)
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
  </article>
  `
}