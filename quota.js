const database = require('./db')
const QuotaModel = require('./db_models/quota')

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
    }

    get profitPercentage() {
        return this.profit
    }

    get messageStats() {
        return `Lucro real: ${Math.round(this.profitPercentage)}%\nValor crédito: ${moneyFormat.format(this.creditValue)}\nValor venda: ${moneyFormat.format(this.sellingPrice)}`
    }

    isValid() {
        const hasOnDb = QuotaModel.findByPk(this.data.propostaID).then(res => {
            console.log(res)
        })
    }

    async registerView() {
        try {
            const result = await database.sync()
            console.log(result)
     
            const create = await QuotaModel.create({
                id: this.data.propostaID
            })

            console.log(create)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    Quota
}