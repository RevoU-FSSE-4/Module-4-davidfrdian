import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import { Label } from '../../GUI/Label'
import { Button } from '../../GUI/Button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Category } from '../../types/CategoryType'
import { useAppContext } from '../../context/CategoryContext'

const CategoryForm: React.FC = () => {
    const navigate = useNavigate()
    const { state } = useAppContext()
    const [formValues, setFormValues] = useState<Category>({
        id: '',
        category_name: '',
        category_description: '',
        is_active: false,
    })

    useEffect(() => {
        if (state && state.category) {
            console.log(state.category)
            setFormValues(state.category)
        }
    }, [state])

    const validationSchema = Yup.object().shape({
        category_name: Yup.string().required('Category name is required'),
        category_description: Yup.string().required(
            'Category description is required'
        ),
    })

    const handleSubmit = async (
        values: Category,
        actions: FormikHelpers<Category>
    ) => {
        try {
            let url =
                'https://library-crud-sample.vercel.app/api/category/create'
            let method = 'POST'

            if (formValues.id) {
                values.id = formValues.id
                url = `https://library-crud-sample.vercel.app/api/category/update`
                method = 'PUT'
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(values),
            })

            await response.json()

            if (response.ok) {
                navigate('/categories')
            }
        } catch (error) {
            console.error('Category creation/update error:', error)
            actions.setSubmitting(false)
        }
    }

    return (
        <Formik 
            enableReinitialize={true}
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            
        >
            {({ values, isSubmitting }) => (
                <Form className='bg-white'>
                    <div className="mt-3 ">
                        <Label htmlFor="category_name">Name</Label>
                        <Field
                            type="text"
                            id="category_name"
                            name="category_name"
                            value={values.category_name}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1         focus:ring-violet-700 focus:bg-violet-100 :cursor-not-allowed disabled:opacity-50 my-2"
                            placeholder="Enter category name"
                        />
                        <ErrorMessage
                            name="category_name"
                            component="div"
                            className="text-xs text-red-500"
                        />
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="category_description">
                            Description
                        </Label>

                        <Field
                            type="text"
                            id="category_description"
                            name="category_description"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                            focus:ring-violet-700 focus:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 my-2"
                            placeholder="Enter category description"
                        />
                        <ErrorMessage
                            name="category_description"
                            component="div"
                            className="text-xs text-red-500"
                        />
                    </div>
       
                    <div className="mt-6 flex justify-end ">
                        <Button 
                        className='hover:bg-violet-900 hover:text-slate-100 duration-300' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CategoryForm