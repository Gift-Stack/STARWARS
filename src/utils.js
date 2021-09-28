// @Desc        A reuseable funtion that gets values in a given array which have the url in them.
// @Returns     object[]

export const diff = (array, url) => {
  let movieCharacters = []
  for (let i = 0; i < array.length; i++) {
    if (array[i].films.includes(url)) movieCharacters.push(array[i])
    else continue
  }
  return movieCharacters
}
