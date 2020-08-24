const eventHub = document.querySelector(".container")
const tagChange = new CustomEvent("tagChange")
let tags = []


export const useTags = () => tags.slice()

export const getTags = () => {
  return fetch("http://localhost:3000/tags")
    .then(res => res.json())
    .then( tagsArray => {
      tags = tagsArray
    })
}

export const saveTag = (entry) => {

  const jsonEntry = JSON.stringify(entry)
  let savedtagId = 0

  return fetch("http://localhost:3000/tags", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonEntry
  })
    .then( res => res.json())
    .then( tag => savedtagId = tag.id)
    .then(getTags)
    .then( () => {
    eventHub.dispatchEvent(tagChange)
    })
    .then( () => savedtagId)
}