import { saveJournalEntry, useJournalEntries, editJournalEntry } from "./journalDataProvider.js"
import { setupAndRenderCharacterCounter } from "./characterCounter.js"
import { getMoods, useMoods } from "./moodProvider.js"

const contentCharacterLimit = 200
const conceptCharacterLimit = 20
const contentTarget = document.querySelector(".current-entry")
const eventHub = document.querySelector(".container")
const formElements = {}

eventHub.addEventListener("click", clickEvent => {
  
  if (clickEvent.target.className === "current-entry--submitt") {
    
    getFormElements()
    const formData = {
      date: formElements.entryDate.value,
      moodId: parseInt(formElements.entryMood.value),
      concept: formElements.entryConceptCovered.value,
      entry: formElements.entryContent.value
    }
    if (formElements.entryId.value === "") {
      saveJournalEntry(formData)
    }
    else {
      formData.id = parseInt(formElements.entryId.value)
      editJournalEntry(formData)

    }

  }
})


eventHub.addEventListener("editJournalEntry", customEvent => {
  const entryId = parseInt(customEvent.detail.entryId)
  const entryData = useJournalEntries().find( e => e.id === entryId)
  render(entryData)
})


eventHub.addEventListener("journalEntryChange", customEvent => {
  render()
})

eventHub.addEventListener("click", clickEvent => {
  if(clickEvent.target.className === "current-entry--discard") {
    render()
  }
})

export const listForm = () => {
  getMoods()
    .then( () => {
      render()
    })
}

const render = (entryData = {}) => {
  const moods = useMoods()
  const moodsOptions = moods.map(mood => {
    return `
    <option value="${mood.id}">${mood.name}</option>
    `
  }).join("")
  
  contentTarget.innerHTML = `
  <form action="">
  <input type="hidden" name="entryId" id="entryId">
    <fieldset>
      <label for="journalDate">Date of entry</label>
      <input type="date" name="journalDate" id="current-entry--journalDate">
    </fieldset>
  </form>
    <form action="">
      <fieldset>
        <label for="mood">Mood</label>
        <select name="mood" id="current-entry--mood">
          ${moodsOptions}
        </select>
      </fieldset>
    </form>
    <form action="">
      <fieldset>
        <label for="conceptCovered">Concept Covered</label>
        <input type="text" name="conceptCovered" id="current-entry--conceptCovered" maxlength=${conceptCharacterLimit}>
        ${setupAndRenderCharacterCounter( "current-entry--conceptCovered", conceptCharacterLimit )}
      </fieldset>
    </form>
    <form action="">
      <fieldset>
        <label for="journalEntry">Journal Entry</label>
        <textarea name="journalEntry" rows="4" cols="50" id="current-entry--content" maxlength=${contentCharacterLimit}></textarea>
        ${setupAndRenderCharacterCounter( "current-entry--content", contentCharacterLimit )}
      </fieldset>
    </form>
    ${submissionControls(entryData)}
  </section>
  `
  if (entryData.hasOwnProperty('id')){
    getFormElements()
    populateFormFromData(entryData)
  }
}


const getFormElements = () => {
  formElements.entryId = document.querySelector("#entryId")
  formElements.entryDate = document.querySelector("#current-entry--journalDate")
  formElements.entryMood = document.querySelector("#current-entry--mood")
  formElements.entryConceptCovered = document.querySelector("#current-entry--conceptCovered")
  formElements.entryContent = document.querySelector("#current-entry--content")
}

const populateFormFromData = entryData => {
  formElements.entryId.value = entryData.id
  formElements.entryDate.value = entryData.date
  formElements.entryMood.value = entryData.moodId
  formElements.entryConceptCovered.value = entryData.concept
  formElements.entryContent.value = entryData.entry
}

const submissionControls = entryData => {
  if(entryData.hasOwnProperty('id')){
    return `
    <button type="button" class="current-entry--submitt">Save Edits</button>
    <button type="button" class="current-entry--discard">Discard Edits</button>
    `
  }
  else {
    return '<button type="button" class="current-entry--submitt">Submit Entry</button>'
  }
}