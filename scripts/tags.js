import { useTags } from "./tagProvider.js"
import { useEntryTags } from "./entryTagsProvider.js"

export const findTagsByEntry = entryID => {
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

