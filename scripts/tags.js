import { useTags } from "./tagProvider.js"
import { useEntryTags, deleteEntryTagByIds } from "./entryTagsProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
  const targetId = clickEvent.target.id
  if (targetId.startsWith("tag-delete-button")) {
    const [ prefix, entryId, tagId ] = targetId.split("--")
    deleteEntryTagByIds(entryId,tagId)
  }
})


export const findTagsByEntryId = entryID => {
  const tags = useTags()
  const entryTags = useEntryTags()
  const relatedEntryTags = entryTags.filter( entryTag => {
    return entryTag.entryId === entryID
  })

  const relatedTags = relatedEntryTags.map( relatedEntryTag => {
    return tags.find( tag => tag.id === relatedEntryTag.tagId )
  })

  return relatedTags
}


export const tagEditHtml = (entryId) => {
  const tags = findTagsByEntryId(entryId)
  return`
  <fieldset>
    <ul>
        ${tags.map( tag => {
          return `
          <li>${tag.subject}</li>
          <button id="tag-delete-button--${entryId}--${tag.id}">Delete</button>
          `
          }).join("")
        }
    </ul>
  </fieldset>
  `
}