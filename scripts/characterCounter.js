const eventHub = document.querySelector(".container")
let targets = []

eventHub.addEventListener("keyup", compositionEvent => {
  //check if the composition is on one of the targetIDs
  //if(compositionEvent.target.id)
  targets.forEach( target => {
    if(target.targetID === compositionEvent.target.id) {
      
      const currentText = compositionEvent.target.value
      const charactersUsed = currentText.length
      updateCharactersRemaining( target.targetID, target.characterLimit, charactersUsed)
      }
    })
  }
)

export const setupAndRenderCharacterCounter = (targetID, characterLimit) => {
  targets.push({
    targetID: targetID,
    characterLimit: characterLimit
  })

  return render(targetID, characterLimit, characterLimit)
}

const updateCharactersRemaining = ( targetID, limit, used ) => {
  const contentTarget = document.querySelector(`.character-limit--${targetID}`)
  contentTarget.innerHTML = render( targetID, limit, used)
}

const render = ( targetID, limit, used ) => {
  return `
  <div class="character-limit--${targetID}">CharactersRemaining = ${limit - used}/${limit}</div>
  `
}