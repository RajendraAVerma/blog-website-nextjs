"use client"

import { useSearchParams } from "next/navigation";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import { useEffect } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get('id')

    const {
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
    } = useCategoryForm();

    useEffect(() => {
        if (updateCategoryId) {
            fetchData(updateCategoryId);
        }
    }, [updateCategoryId])


    return <main className="w-full p-6 flex flex-col gap-3">
        <div className="flex gap-5 items-center">
            {updateCategoryId && <div className="flex">
                <h3 className="text-white bg-orange-500 px-4 py-2 rounded-full text-xs font-bold">Update</h3>
            </div>}
            {!updateCategoryId && <div className="flex">
                <h3 className="text-white bg-green-500 px-4 py-2 rounded-full text-xs font-bold">Create</h3>
            </div>}
            <h1 className="font-bold">Category | Form</h1>
        </div>
        <section className="flex">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (updateCategoryId) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}
                className="flex flex-col gap-2 bg-blue-50 rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Category Name <span className="text-red-500">*</span> </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Category Name"
                        type="text"
                        onChange={(e) => {
                            handleData('name', e.target.value)
                        }}
                        value={data?.name}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Category Slug <span className="text-red-500">*</span> </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Category Slug"
                        type="text"
                        onChange={(e) => {
                            handleData('slug', e.target.value)
                        }}
                        value={data?.slug}
                        required
                    />
                </div>
                {data?.iconURL && <div>
                    <img className="h-40" src={data?.iconURL} alt="" />
                </div>}
                {image && <div>
                    <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                </div>}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Image  </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Category Slug"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            e.preventDefault();
                            setImage(e.target.files[0]);
                        }}
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {!isDone && <button
                    type="submit"
                    disabled={isLoading || isDone}
                    className="bg-blue-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : updateCategoryId ? "Update" : "Create"}
                </button>}

                {updateCategoryId && !isDone && <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(updateCategoryId);
                    }}
                    disabled={isLoading || isDone}
                    className="bg-red-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : "Delete"}
                </button>}

                {isDone && <h3 className="text-green-500 font-bold text-center">
                    Successfully {updateCategoryId ? "Updated" : "Created"} !
                </h3>}

            </form>
        </section>
    </main>
}