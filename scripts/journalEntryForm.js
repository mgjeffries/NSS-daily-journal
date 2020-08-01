import { saveJournalEntry } from "./journalDataProvider.js"

const contentTarget = document.querySelector(".current-entry")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
  
  if (clickEvent.target.className === "current-entry--submitt") {

    const entryDate = document.querySelector("#current-entry--journalDate").value
    const entryMood = document.querySelector("#current-entry--mood").value
    const entryConceptCovered = document.querySelector("#current-entry--conceptCovered").value
    const entryContent = document.querySelector("#current-entry--content").value



    const newEntry = {
      date: entryDate,
      mood: entryMood,
      concept: entryConceptCovered,
      entry: entryContent
    }

    saveJournalEntry(newEntry)

  }
})

export const listForm = () => {
  render()
}

const render = () => {
  contentTarget.innerHTML = `
  <form action="">
    <fieldset>
      <label for="journalDate">Date of entry</label>
      <input type="date" name="journalDate" id="current-entry--journalDate">
    </fieldset>
  </form>
    <form action="">
      <fieldset>
        <label for="mood">Mood</label>
        <select name="mood" id="current-entry--mood">
          <option value="happy">happy</option>
          <option value="meh">meh</option>
          <option value="sad">sad</option>
        </select>
      </fieldset>
    </form>
    <form action="">
      <fieldset>
        <label for="conceptCovered">Concept Covered</label>
        <input type="text" name="conceptCovered" id="current-entry--conceptCovered">
      </fieldset>
    </form>
    <form action="">
      <fieldset>
        <label for="journalEntry">Journal Entry</label>
        <textarea name="journalEntry" rows="4" cols="50" id="current-entry--content"></textarea>
      </fieldset>
    </form>
    <button type="button" class="current-entry--submitt">Submit Entry</button>
  </section>
    `
}