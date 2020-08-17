let moods = []

export const useMoods = () => moods.slice()

export const getMoods = () => {
  return fetch("http://localhost:3000/moods")
    .then(res => res.json())
    .then( moodsArray => {
      moods = moodsArray
    })
}