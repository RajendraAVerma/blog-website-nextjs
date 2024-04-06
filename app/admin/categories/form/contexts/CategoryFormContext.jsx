"use client"

import { getCategory } from "@/lib/firebase/category/read";
import { createNewCategory, deleteCategory, updateCategory } from "@/lib/firebase/category/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
    const router = useRouter();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
        setIsDone(false)
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async () => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await createNewCategory({ data: data, image: image });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleUpdate = async () => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await updateCategory({ data: data, image: image });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleDelete = async (id) => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await deleteCategory(id);
            setIsDone(true);
            router.push('/admin/categories');
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            const res = await getCategory(id);
            if (res.exists()) {
                setData(res.data());
            } else {
                throw new Error(`No Category found from id ${id}`)
            }

        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }


    return <CategoryFormContext.Provider
        value={{
            data,
            isLoading,
            error,
            isDone,
            handleData,
            handleCreate,
            handleUpdate,
            handleDelete,
            image,
            setImage,
            fetchData,
        }}
    >{children}</CategoryFormContext.Provider>
}

export const useCategoryForm = () => useContext(CategoryFormContext);