# Mycon Notifier
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Este projeto foi desenvolvido com o intuito de notificar o usuário sobre a venda de cotas de imóveis contempladas do consórcio Mycon pelo sistema MyCotas. Ele varre o sistema de anúncios e mostra ao usuário os anúncios de cotas contempladas de acordo com o valor da carta de crédito configurada e a porcentagem real dos lucros do anunciante.

### ❗ O desenvolvedor não tem qualquer associação com a Empresa Mycon e nem garante que as informações exibidas pela ferramenta são de fato verdadeiras.
### ❗ O desenvolvedor também não dá garantia nenhuma no software e talvez dê manutenção quando der na telha.



# Como configurar

## Configuração do arquivo .env
Faça uma cópia do arquivo ```.env.example``` para um arquivo ```.env``` e coloque os valores de busca desejados seguindo o exemplo a seguir:
```
DESIRED_QUOTA_VALUE=150000 #<- Quero uma cota de 150.000 reais
DESIRED_PROFIT_PERCENTAGE=10 #<- Quero que o lucro real do vendedor seja igual ou abaixo 20% 
DAYS_BETWEEN_MULTIPLE_ALERTS=1 #<- Depois que eu clicar na notificação, vou ser notificado novamente em 1 dia sobre a cota que eu já cliquei
```
## Executando a aplicação
É preciso instalar as dependências do projeto pelo yarn.
```
yarn install
```
Para rodar o a aplicação, execute o comando a seguir na raíz do projeto.
```
yarn search
```
Pronto.