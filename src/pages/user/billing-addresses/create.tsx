import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom';
import { json } from 'react-router-dom';

import BillingAddress from '../../../models/billing-address';
import CustomInput from '../../../components/CustomInput';

const BillingAddressCreatePage = () => {
    const fetcher = useFetcher()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Billing Address</h1>

            <div className='w-full sm:col-span-2'>
                <h2 className="text-lg font-semibold mb-2">Billing Information</h2>
                <Formik
                    initialValues={
                        {
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            address: '',
                            city: '',
                            country: '',
                            postalCode: '',
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
                            method: 'POST',
                            action: '/user/billing-addresses/create'
                        })
                    }}
                >
                    {({ isSubmitting }: FormikProps<any>) => (
                        <Form className='space-y-2 md:space-y-4'>
                            <div className='grid gap-2 md:grid-cols-2 md:gap-6 w-full'>

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

export default BillingAddressCreatePage;

export const action = async ({ request, params }: ActionFunctionArgs) => {
    try {

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

        await billingAddress.save()

        return redirect('/user/billing-addresses')
    } catch (error: any) {
        throw json({ message: error.message })
    }
}
