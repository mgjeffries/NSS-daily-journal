import { saveJournalEntry, useJournalEntries, editJournalEntry } from "./journalDataProvider.js"
import { setupAndRenderCharacterCounter } from "./characterCounter.js"
import { getMoods, useMoods } from "./moodProvider.js"
import { useTags, getTags, saveTag } from "./tagProvider.js"
import { saveEntryTag } from "./entryTagsProvider.js"
import { findTagsByEntryId, tagEditHtml } from "./tags.js"

const contentCharacterLimit = 200
const conceptCharacterLimit = 20
const tagsCharacterLimit = 20
const contentTarget = document.querySelector(".current-entry")
const eventHub = document.querySelector(".container")
const formElements = {}

eventHub.addEventListener("click", clickEvent => {
  
  if (clickEvent.target.className.startsWith('current-entry-submitt')) {
    const [prefix, entryId] = clickEvent.target.className.split("--")

    getFormElements(entryId)

    const formData = {
      date: formElements.date.value,
      moodId: parseInt(formElements.moodId.value),
      concept: formElements.concept.value, 
      entry: formElements.entry.value,
    }

    if (entryId === "0") {
      saveJournalEntry(formData)
      .then( newEntryId => {
        saveEntryTags(newEntryId)
      })
    }
    else {
      formData.id = parseInt(entryId)
      editJournalEntry(formData)
        .then( () => {
          saveEntryTags(entryId)
        })
    }
    
  }
})


eventHub.addEventListener("editJournalEntry", customEvent => {
  const entryId = parseInt(customEvent.detail.entryId)
  const entryData = useJournalEntries().find( e => e.id === entryId)
  const contentTarget = document.querySelector(`#entry-${entryId}`)
  render(entryData, contentTarget)
})


eventHub.addEventListener("journalEntryChange", customEvent => {
  render()
})

eventHub.addEventListener("click", clickEvent => {
  if(clickEvent.target.className.startsWith("current-entry-discard")) {
    const journalEntryChange = new CustomEvent("journalEntryChange")
    eventHub.dispatchEvent(journalEntryChange)
  }
})

export const listForm = () => {
  getMoods()
  .then(getTags)
    .then( () => {
      render()
    })
}

const render = (entryData = {}, target = contentTarget) => {
  if(!entryData.hasOwnProperty('id')){
    entryData.id = 0
    entryData.date = "" 
    entryData.moodId = 1
    entryData.concept = ""
    entryData.entry = ""
  }

  const moods = useMoods()
  const moodsOptions = moods.map(mood => {
    return `
    <option value="${mood.id}" ${(mood.id === entryData.moodId) ? "selected" : ""}>${mood.name}</option>
    `
  }).join("")
  
  target.innerHTML = `
  <form action="">
    <fieldset>
      <label for="journalDate">Date of entry</label>
      <input type="date" name="journalDate" id="current-entry-journalDate--${entryData.id}" value="${entryData.date}">
    </fieldset>
    <fieldset>
      <label for="mood">Mood</label>
      <select name="mood" id="current-entry-mood--${entryData.id}" >
        ${moodsOptions}
      </select>
    </fieldset>
    <fieldset>
      <label for="conceptCovered">Concept Covered</label>
      <input type="text" name="conceptCovered" id="current-entry-conceptCovered--${entryData.id}" maxlength=${conceptCharacterLimit} value="${entryData.concept}">
      ${setupAndRenderCharacterCounter( `current-entry-conceptCovered--${entryData.id}`, conceptCharacterLimit )}
    </fieldset>
    <fieldset>
      <label for="journalEntry">Journal Entry</label>
      <textarea name="journalEntry" rows="4" cols="50" id="current-entry-content--${entryData.id}" maxlength=${contentCharacterLimit}>${entryData.entry}</textarea>
      ${setupAndRenderCharacterCounter( `current-entry-content--${entryData.id}`, contentCharacterLimit )}
    </fieldset>
    <fieldset>
      <label for="tags">Tags</label>
      <input type="text" name="tags" id="current-entry-tags--${entryData.id}" maxlength=${tagsCharacterLimit} value="">
      ${tagForm(entryData)}
    </fieldset>
    <fieldset>
    ${submissionControls(entryData)}
    </fieldset>
    </form>
  </form>
  `
}


const saveEntryTags = newEntryId => {
  const tagsArray = formElements.tags.value.split(",")

  const tagIdPromises = tagsArray.map(inputTag => {
    if (useTags().some( t => t.subject === inputTag)) {
      return useTags().find( t => t.subject === inputTag ).id
    }
    else {
      return saveTag( { subject: inputTag } )
    }
  })

  Promise.all(tagIdPromises)
  .then( resolvedIds => {
    resolvedIds.forEach( tagId => {
      saveEntryTag( 
        {
          entryId: parseInt(newEntryId), 
          tagId: tagId
        })
      })
  })
}

const tagForm = entryData => {
  if(entryData.id !== 0){
    return tagEditHtml(entryData.id)
  }
  else {
    return ''
  }
}



const submissionControls = entryData => {
  if(entryData.id === 0){
    return `<button type="button" class="current-entry-submitt--${entryData.id}">Submit Entry</button>`
  }
  else {
    return `
    <button type="button" class="current-entry-submitt--${entryData.id}">Save Edits</button>
    <button type="button" class="current-entry-discard--${entryData.id}">Discard Edits</button>
    `
  }
}

const getFormElements = (entryId) => {
  formElements.date = document.querySelector(`#current-entry-journalDate--${entryId}`)
  formElements.moodId = document.querySelector(`#current-entry-mood--${entryId}`)
  formElements.concept = document.querySelector(`#current-entry-conceptCovered--${entryId}`)
  formElements.entry = document.querySelector(`#current-entry-content--${entryId}`)
  formElements.tags = document.querySelector(`#current-entry-tags--${entryId}`)
}