const formatText = (text) => {
    const formatedText = text.toLowerCase();

    const allLetters = [...formatedText]
    const firstLetter = allLetters[0]?.toUpperCase()

    allLetters.shift()

    return `${firstLetter}${allLetters.join('')}`
}

module.exports = formatText;