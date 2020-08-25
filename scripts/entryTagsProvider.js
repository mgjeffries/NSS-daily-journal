const eventHub = document.querySelector(".container")
const entryTagChange = new CustomEvent("entryTagChange")
const dispatchChangeEvent = () => eventHub.dispatchEvent(entryTagChange)
let entryTags = []


export const useEntryTags = () => entryTags.slice()

export const getEntryTags = () => {
  return fetch("http://localhost:3000/entryTags")
    .then(res => res.json())
    .then( entryTagsArray => {
      entryTags = entryTagsArray
    })
}

export const saveEntryTag = (entry) => {

  const jsonEntry = JSON.stringify(entry)

  return fetch("http://localhost:3000/entryTags", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonEntry
  })
    .then(getEntryTags)
    .then(dispatchChangeEvent)
}

export const deleteEntryTagByIds = (entryId, tagId) => {
  entryId = parseInt(entryId)
  tagId = parseInt(tagId)
  const entryTagToDelete = useEntryTagByIds(entryId, tagId)
  return deleteEntryTag(entryTagToDelete.id)
}

const deleteEntryTag = entryTagId => {
  return fetch(`http://localhost:3000/entryTags/${entryTagId}`, {
    method: "DELETE"
  })
  .then(getEntryTags)
  .then(dispatchChangeEvent)
}

const useEntryTagByIds = (entryId, tagId) => {
  return entryTags.find( et => {
    return et.entryId === entryId && et.tagId === tagId
  })
}