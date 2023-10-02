import { Link } from 'react-router-dom'
import { ReactComponent as Confirmation } from '../assets/svgs/confirmation.svg'
import { useEffect, useState } from 'react'
import { Product } from '../models/product'
import Order from '../models/order'
import { formatFirebaseData } from '../utils'

const Payment = () => {
    const [status, setStatus] = useState<'succeeded' | 'requires_action' | 'requires_payment_method' | 'pending'>('pending')

    // verify payment
    useEffect(() => {
        const verifyPayment = async () => {
            const paymentIntentId = (new URL(window.location.href)).searchParams.get('payment_intent')
            const clientSecret = (new URL(window.location.href)).searchParams.get('payment_intent_client_secret')

            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-payment-intent?payment_intent_client_secret=${paymentIntentId}`)

            const { paymentIntent } = await response.json()

            if (paymentIntent) {
                setStatus(paymentIntent.status)
            }

            return clientSecret
        }

        const updateOrder = async (clientSecret: string) => {
            const ordersSnapshot = await Order.fetch()
            const ordersData = formatFirebaseData(ordersSnapshot) as Order[]

            const orderSnapshot = ordersData.find(order => order.clientSecret === clientSecret)

            const orderData = Order.fromJson(orderSnapshot)

            if (status === 'succeeded') {
                orderData.status = 'confirmed'
            }

            orderData.update()
        }

        verifyPayment()
            .then(clientSecret => updateOrder(clientSecret!))
            .catch(() => { console.log('An error has occurred') })

    })

    let statusMessage = 'Confirming Payment'

    if (status === 'succeeded') {
        statusMessage = 'Thank you for your purchase!'
    } else if (status === 'requires_action') {
        statusMessage = 'Action needed for payment!'
    } else if (status === 'requires_payment_method') {
        statusMessage = 'Payment method required.'
    }

    return (
        <div className='flex flex-col space-y-4 justify-center items-center w-full h-96'>
                <Confirmation className='w-60' />
                <h3 className='text-2xl'>{ statusMessage }</h3>
                { status === 'succeeded' && <Link className='btn btn-primary' to="/user/orders">View orders</Link> }
            </div>
    )
}

export default Payment