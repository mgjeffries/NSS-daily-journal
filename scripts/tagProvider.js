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

  return fetch("http://localhost:3000/tags", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonEntry
  })
    .then(getTags)
    .then( () => {
    eventHub.dispatchEvent(tagChange)
  })
}