const { db, generateDbKey } = require('./db')
const { timestampValid } = require('./util')

const moneyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

class Quota {
    constructor(data) {
        const { valorVenda, valorPago, valorCredito } = data

        this.data = data
        this.creditValue = valorCredito
        this.paidValue = valorPago
        this.sellingPrice = valorVenda

        this.sellingValue = valorVenda - valorPago
        this.profit = (this.sellingValue * 100) / valorCredito
        this.dbKey = generateDbKey(this.data.propostaID)
    }

    get profitPercentage() {
        return this.profit
    }

    get messageStats() {
        return `Lucro real: ${Math.round(this.profitPercentage)}%\nValor crédito: ${moneyFormat.format(this.creditValue)}\nValor venda: ${moneyFormat.format(this.sellingPrice)}`
    }

    registerView() {
        return new Promise((resolve, reject) => {
            db.push(this.dbKey, {
                timestamp: Date.now(),
            }, false).then((value) => {
                resolve(true)
            })
        })
    }

    registerOnDb() {
        return new Promise((resolve, reject) => {
            db.getData(this.dbKey).then((quotaData) => {
                // Found on the database. If the timestamp is valid, will show to the user
                if (timestampValid(quotaData.timestamp)) {
                    resolve(true)
                }
            })
                // Not found on the database, will register on the database and show to the user
                .catch((error) => {
                    db.push(this.dbKey, {
                        creditValue: this.creditValue,
                        paidValue: this.paidValue,
                        sellingPrice: this.sellingPrice,
                        sellingValue: this.sellingValue,
                        profit: this.profit,
                        timestamp: null,
                        ...this.data
                    })
                    resolve(true)
                })
        })
    }
}

module.exports = {
    Quota
}