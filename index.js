require('dotenv').config()
const axios = require('axios')
const open = require('open')
const notifier = require('node-notifier')
const {Quota} = require('./quota')
const { DESIRED_QUOTA_VALUE, DESIRED_PROFIT_PERCENTAGE } = process.env

const config = {
    method: 'get',
    url: `https://mycotas.mycon.com.br/home/filter?CategoriaID=1&ValorCredito=${DESIRED_QUOTA_VALUE}`
}

axios(config)
    .then(function (response) {
        for (let quotaIndex in response.data) {
            const quota = new Quota(response.data[quotaIndex])

            if (quota.profitPercentage <= DESIRED_PROFIT_PERCENTAGE) {
                notifier.notify({
                    title: 'Cota desejada encontrada!',
                    message: quota.messageStats,
                    wait: true,
                    timeout: 60
                })

                notifier.on('click', function (notifierObject, options, event) {
                    open('https://mycotas.mycon.com.br/')
                })
            }
        }
    
    })
    .catch(function (error) {
        console.log(error);
    });
