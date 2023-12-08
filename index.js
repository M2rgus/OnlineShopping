const http = require('http')
const qs = require('querystring')
const calculatePrice = require('./calculatePrice')

const server = http.createServer(function(request, response) {
    console.dir(request.param)

    if (request.method == 'POST') {
        console.log('POST')
        var body = ''
        request.on('data', function(data) {
            body += data
        })

        request.on('end', function() {
            const post = qs.parse(body)
            console.log(post);
            const result = calculatePrice.calculateProductPrice(Number(post.customerAge), String(post.productType), parseBool(post.hasReturns), parseBool(post.isLoyaltyMember))
            console.log(result);
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end('Result: ' + result)
        })
    } else {
        var html = `
            <html>
                <body>
                    <form id="calcForm" method="post" action="http://localhost:3000">Customer and purchase info: <br><br>
                        <label for="html">Your age?</label><br>
                        <input type="number" name="customerAge"/><br>
                        <label for="product">Which product do you wish to buy?</label><br>
                        <select id="product" name="productType">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        </select><br>
                        <label for="html">Have you returned any items in the past?</label><br>
                        <input type=checkbox name="hasReturns" /><br>
                        <label for="html">Are you a loyalty member?</label><br>
                        <input type=checkbox name="isLoyaltyMember" /><br>
                        <input type="submit" value="Buy" />
                    </form>
                </body>
            </html>`
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html)
    }

    function parseBool(val) {
        let updatedVal = false;
        if (val == 'on') {
            updatedVal = true;
        }
        return updatedVal;
    }
})

const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
