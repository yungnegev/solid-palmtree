import { loadStripe } from '@stripe/stripe-js'

let stripePromise 

const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe('pk_test_51MCOAAGIwK7oKvHYBkp2t5JctUavpk5caybKgwfsemDg0eZhogGdXuCyVPTHPChazg5nwDlypzKfjy71vuNkKKZW00iFgXoIld')
    }

    return stripePromise
}

export default getStripe