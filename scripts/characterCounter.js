export const listenForComposition = (targetID, characterLimit) => {

  const currentEntryField = document.querySelector(`#${targetID}`)
  
  currentEntryField.addEventListener("keyup", compositionEvent => {
    const currentText = compositionEvent.target.value
    const charactersUsed = currentText.length
    updateCharactersRemaining( targetID, characterLimit, charactersUsed )
  })
}


export const renderCharactersRemaining = ( targetID, limit, used ) => {
  return `
  <div class="character-limit--${targetID}">CharactersRemaining = ${limit - used}/${limit}</div>
  `
}

const updateCharactersRemaining = ( targetID, limit, used ) => {
  const contentTarget = document.querySelector(`.character-limit--${targetID}`)
  contentTarget.innerHTML = renderCharactersRemaining( targetID, limit, used)
}