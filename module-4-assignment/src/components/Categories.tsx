import React, { useState, useEffect } from 'react'
import { Card } from '../GUI/Card'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Skeleton } from '../GUI/Skeleton'
import { Button } from '../GUI/Button'
import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Category } from '../types/CategoryType'
import CategoryDialog from './CategoryComponent.tsx/CategoryDialog'
import { useAppContext } from '../context/CategoryContext'

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const { dispatch } = useAppContext()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://library-crud-sample.vercel.app/api/category',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                )
                console.log(response)

                setCategories(response.data)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }

        fetchData()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(
                `https://library-crud-sample.vercel.app/api/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )

            const updatedCategories = categories.filter(
                (category) => category.id !== id
            )
            setCategories(updatedCategories)
        } catch (error) {
            console.error('Error deleting category:', error)
        }
    }

    const handleClickEditButton = async (id: string) => {
        try {
            const response = await axios.get(
                `https://library-crud-sample.vercel.app/api/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            dispatch({ type: 'setCategory', payload: response.data })
        } catch (error) {
            console.error('Error fetching category data:', error)
        }
    }

    return (
        <div className="mt-20 flex max-h-full items-center justify-center overflow-scroll">
            <div>
                <CategoryDialog>
                    <Button className="mb-2" variant={'outline'}>
                        <PlusIcon className="mr-2 h-4 w-4 " /> Category
                    </Button>
                </CategoryDialog>

                {isLoading ? (
                    <Skeleton className="h-16 w-96 rounded-lg" />
                ) : (
                    categories.map((category) => (
                        <Card key={category.id} className="mb-2 h-16 w-96 p-2">
                            <div className="flex items-center justify-between">
                                <div className="flex h-full flex-col justify-center">
                                    <Link
                                        to={category.id}
                                        className="font-semibold hover:underline"
                                    >
                                        {category.category_name}
                                    </Link>
                                    <span className="text-sm text-gray-500">
                                        {category.category_description}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <CategoryDialog>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            onClick={() =>
                                                handleClickEditButton(
                                                    category.id
                                                )
                                            }
                                        >
                                            <Pencil1Icon className="h-4 w-4" />
                                        </Button>
                                    </CategoryDialog>

                                    <Button
                                        variant="destructive"
                                        size="icon-sm"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

export default Categories