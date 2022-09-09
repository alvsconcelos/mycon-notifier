const { DAYS_BETWEEN_MULTIPLE_ALERTS } = process.env

const getMultipleAlertsInterval = () => {
    return DAYS_BETWEEN_MULTIPLE_ALERTS * 24 * 60 * 60
}

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const timestampValid = (timestamp) => {
    if(timestamp === null) return true
    return Date.now() > (timestamp + getMultipleAlertsInterval())
}

const getMycotasSearchUrl = () => {
    const randomQuotaValue = randomIntFromInterval(100000, 5000000)
    return `https://mycotas.mycon.com.br/home/filter?CategoriaID=1&ValorCredito=${randomQuotaValue}`
}

module.exports = {
    getMultipleAlertsInterval, timestampValid, getMycotasSearchUrl
}