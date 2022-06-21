const axios = require('axios').default
const Constants = require('./constants')
const Arweave = require('arweave').default
const { protocol, host, port } = Constants.arweave.gateway

// arweave graphql endpoint
const arweaveQuery = axios.create({
  baseURL: protocol + '://' + host + ':' + port,
  headers: {
    'Content-type': 'Application/Json'
  }
})

// arweave client sdk
const arweaveClient = Arweave.init(Constants.arweave.gateway)

// upload to arweave
export const uploadToArweave = async ({ signature, account }) => {
  await axios.post(Constants.weaver + '/rpc/sign', JSON.stringify({signature, account}), {
    headers: {
      "content-type": "application/json"
    }
  })
}

export const getUserSignature = async ({ signatory }) => {
  return (await arweaveQuery.post('/graphql', {
    ...Queries.getUserSignatures(signatory)
  }))
}

export const getAllSignatures = () => {
  return arweaveQuery.post('/graphql', {
    ...Queries.getSignatures
  })
}

export const getTransactionData = async (tx, opts = { decode: true, string: true }) => {
  return arweaveClient.transactions.getData(tx, { ...opts })
}

const GET_SIGNATURE_QUERY = `
  query getSignatures($appName: String!, $first: Int) {
    transactions(tags:[
      {
        name:"App-Name",
        values:[$appName],
      },
    ], sort:HEIGHT_DESC, first: $first) {
      edges {
        node {
          id
          block {
            timestamp
          }
          tags {
            name
            value
          }
        }
      }
    }
  }
`

const GET_USER_SIGNATURE_QUERY = `
  query getSignatures(
    $appName: String!, $first: Int, $signatory: String!
  ) {
    transactions(tags:[
      {
        name:"App-Name",
        values:[$appName],
      },
      {
        name:"Signatory",
        values: [$signatory]
      }
    ], sort:HEIGHT_DESC, first: $first) {
      edges {
        node {
          id
          block {
            timestamp
          }
          tags {
            name
            value
          }
        }
      }
    }
  }
`

const GET_SIGNATURE_QUERY_VARS = {
  appName: Constants.arweave.appName,
  first: 15
}

const Queries = {
  getSignatures: {
    query: GET_SIGNATURE_QUERY,
    variables: GET_SIGNATURE_QUERY_VARS
  },
  getUserSignatures: (signatory) => {
    return {
      query: GET_USER_SIGNATURE_QUERY,
      variables: {
        appName: Constants.arweave.appName,
        first: 1,
        signatory
      }
    }
  }
}
