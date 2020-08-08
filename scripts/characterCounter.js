export const listenForComposition = (targetID, characterLimit) => {

  const currentEntryField = document.querySelector(`#${targetID}`)
  
  currentEntryField.addEventListener("keyup", compositionEvent => {
    const currentText = compositionEvent.target.value
    const charactersUsed = currentText.length
    updateCharactersRemaining(characterLimit, charactersUsed)
  })
}


export const renderCharactersRemaining = (limit, used) => {
  return `
  <div class="character-limit">CharactersRemaining = ${limit - used}/${limit}</div>
  `
}

const updateCharactersRemaining = (limit, used) => {
  const contentTarget = document.querySelector(".character-limit")
  contentTarget.innerHTML = renderCharactersRemaining(limit, used)
}