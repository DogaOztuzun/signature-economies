import 'dotenv/config'
import arweave from 'arweave'

const sign = async (request, response) => {
    
    if (request.body === "" || request.body === undefined){
        return res.status(400).json({ message: 'Missing body' });
    }

    if (request.method === 'POST' || request.method ==='OPTIONS') {

        const ARWEAVE_APP_NAME = process.env.ARWEAVE_APP_NAME
        const ARWEAVE_JWK = process.env.ARWEAVE_JWK
        const arweaveJwk = JSON.parse(ARWEAVE_JWK)
        
        // console.log("jwk", arweaveJwk)
        // console.log("app name", ARWEAVE_APP_NAME)

        const gateway = {
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
        }

        const tags = [
            {
                key: 'Content-Type',
                value: 'application/json'
            },
            {
                key: 'App-Name',
                value: ARWEAVE_APP_NAME
            }
         ]

        const client = arweave.init(gateway)
        const key = arweaveJwk
        console.log(request.body)

        // const body = JSON.parse(request.body)
        const body = request.body;

        console.log('signing', body.signature, body.account)

        const data = JSON.stringify(body)
        const transaction = await client.createTransaction({ data }, key)

        tags.concat([{ key: 'Signatory', value: body.account }])
            .forEach((tag) => transaction.addTag(tag.key, tag.value))

        await client.transactions.sign(transaction, key)

        const uploader = await client.transactions.getUploader(transaction)
        
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
          console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }
        // return { transaction }

        return response.status(200).json({
            body: transaction
        });
    }

    return response.status(400).json({ message: `Incorrect method: ${request.method}.` });
}

module.exports = sign