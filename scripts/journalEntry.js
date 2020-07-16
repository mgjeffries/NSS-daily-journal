export const journalEntryHTML = (entry) =>{
  return `
  <article class="past-entry" id="entry-${entry.id}">
    <h2 class="entry-concept">${entry.concept}</h2>
    <div class="entry-mood">${entry.mood}</div>
    <div class="entry-date">${entry.date}</div>
    <p class="entry-entry">${entry.entry}</p>
  </article>
  `
}