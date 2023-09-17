import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect, useFetcher, useLoaderData } from 'react-router-dom';
import BillingAddress from '../../../models/billing-address';
import CustomInput from '../../../components/CustomInput';

const BillingAddressEditPage = () => {
    const fetcher = useFetcher()
    const { billingAddress } = useLoaderData() as { billingAddress: BillingAddress }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Update Billing Address</h1>

            <div className='w-full sm:col-span-2'>
                <h2 className="text-lg font-semibold mb-2">Billing Information</h2>
                <Formik
                    initialValues={
                        {
                            firstName: billingAddress.firstName,
                            lastName: billingAddress.lastName,
                            email: billingAddress.email,
                            phone: billingAddress.phone,
                            address: billingAddress.address,
                            city: billingAddress.city,
                            country: billingAddress.country,
                            postalCode: billingAddress.postalCode,
                        }
                    }
                    validationSchema={
                        Yup.object({
                            firstName: Yup.string().required(),
                            lastName: Yup.string().required(),
                            email: Yup.string().email().required(),
                            phone: Yup.string().required(),
                            address: Yup.string().required(),
                            city: Yup.string().required(),
                            country: Yup.string().required(),
                            postalCode: Yup.string().required(),
                        })
                    }
                    onSubmit={(values) => {
                        fetcher.submit(values, {
                            method: 'PUT',
                            action: `/user/billing-addresses/${billingAddress.id}/edit`
                        })
                    }}
                >
                    {({ isSubmitting }: FormikProps<any>) => (
                        <Form className='space-y-2 md:space-y-4'>
                            <div className='grid md:grid-cols-2 gap-6 w-full'>

                                <CustomInput label='First Name' name='firstName' type='text' />
                                <CustomInput label='Last Name' name='lastName' type='text' />
                                <CustomInput label='Email' name='email' type='email' />
                                <CustomInput label='Phone' name='phone' type='phone' />
                                <CustomInput label='Address' name='address' type='text' />
                                <CustomInput label='City' name='city' type='text' />
                                <CustomInput label='Country' name='country' type='text' />
                                <CustomInput label='Postal Code' name='postalCode' type='text' />

                            </div>

                            <button type='submit' className="btn btn-primary disabled:!bg-opacity-50" disabled={isSubmitting}>Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BillingAddressEditPage;

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const id = params.id

    try {
        const billingAddress = await BillingAddress.fetch(id)

        return json({
            billingAddress: {
                ...billingAddress,
                id
            }
        }, { status: 200 })
    } catch (error: any) {
        throw json({ message: error.message })
    }
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const id = params.id!
        const data = await request.formData()

        // instantiate billing address from form data
        const billingAddress = BillingAddress.fromJson({
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            email: data.get('email') as string,
            phone: data.get('phone') as string,
            address: data.get('address') as string,
            city: data.get('city') as string,
            country: data.get('country') as string,
            postalCode: data.get('postalCode') as string,
        })

        await billingAddress.update(id)

        return redirect('/user/billing-addresses')
    } catch (error: any) {
        throw json({ message: error.message })
    }
}
