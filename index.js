require('dotenv').config()
const axios = require('axios')
const open = require('open')
const notifier = require('node-notifier')
const { Quota } = require('./quota')
const { DESIRED_QUOTA_VALUE, DESIRED_PROFIT_PERCENTAGE } = process.env
const { getMycotasSearchUrl } = require('./util')

const config = {
    method: 'get',
    url: getMycotasSearchUrl()
}

axios(config)
    .then(async function (response) {
        for (let quotaIndex in response.data) {
            const quota = new Quota(response.data[quotaIndex])

            if (quota.profitPercentage <= DESIRED_PROFIT_PERCENTAGE && quota.creditValue >= DESIRED_QUOTA_VALUE) {
                const isValidToNofify = await quota.registerOnDb()

                if (isValidToNofify) {
                    notifier.notify({
                        title: 'Cota desejada encontrada!',
                        message: quota.messageStats,
                        wait: true,
                        timeout: 60
                    })

                    notifier.on('click', async function (notifierObject, options, event) {
                        await open('https://mycotas.mycon.com.br/')
                        await quota.registerView()
                    })
                }
            }
        }

    })
    .catch(function (error) {
        console.log(error)
    })
