const eventHub = document.querySelector(".container")
const entryTagChange = new CustomEvent("entryTagChange")
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
    .then( () => {
    eventHub.dispatchEvent(entryTagChange)
  })
}