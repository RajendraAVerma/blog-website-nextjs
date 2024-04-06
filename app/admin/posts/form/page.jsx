"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePostForm } from "./contexts/PostFormContext";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuthors } from "@/lib/firebase/author/read";
import { RTEField } from "./components/RTEField";

export default function Page() {
    const searchParams = useSearchParams();
    const updatePostId = searchParams.get('id')

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
    } = usePostForm();

    useEffect(() => {
        if (updatePostId) {
            fetchData(updatePostId);
        }
    }, [updatePostId])


    return <main className="w-full p-6 flex flex-col gap-3">
        <div className="flex gap-5 items-center">
            {updatePostId && <div className="flex">
                <h3 className="text-white bg-orange-500 px-4 py-2 rounded-full text-xs font-bold">Update</h3>
            </div>}
            {!updatePostId && <div className="flex">
                <h3 className="text-white bg-green-500 px-4 py-2 rounded-full text-xs font-bold">Create</h3>
            </div>}
            <h1 className="font-bold">Posts | Form</h1>
        </div>
        <section className="flex gap-5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (updatePostId) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}
                className="flex flex-col gap-2 bg-blue-50 rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Title <span className="text-red-500">*</span> </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Title"
                        type="text"
                        onChange={(e) => {
                            handleData('title', e.target.value)
                        }}
                        value={data?.title}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Post Slug <span className="text-red-500">*</span> </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Post Slug"
                        type="text"
                        disabled={updatePostId}
                        onChange={(e) => {
                            handleData('slug', e.target.value)
                        }}
                        value={data?.slug}
                        required
                    />
                </div>

                <SelectCategoryField />

                <SelectAuthorField />


                {data?.imageURL && <div>
                    <img className="h-40" src={data?.imageURL} alt="" />
                </div>}
                {image && <div>
                    <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                </div>}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Image  </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Post Slug"
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
                    {isLoading ? "Loading..." : updatePostId ? "Update" : "Create"}
                </button>}

                {updatePostId && !isDone && <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(updatePostId);
                    }}
                    disabled={isLoading || isDone}
                    className="bg-red-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : "Delete"}
                </button>}

                {isDone && <h3 className="text-green-500 font-bold text-center">
                    Successfully {updatePostId ? "Updated" : "Created"} !
                </h3>}

            </form>
            <RTEField />
        </section>
    </main>
}

function SelectCategoryField() {
    const {
        data,
        handleData,
    } = usePostForm();
    const { data: categories } = useCategories();
    return <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500">Category  <span className="text-red-500">*</span> </label>
        <select
            className="px-4 py-2 rounded-full border bg-gray-50"
            name="category"
            id="category"
            value={data?.categoryId}
            onChange={(e) => {
                handleData('categoryId', e.target.value)
            }}
            required>
            <option value="">Select Category</option>
            {categories && categories?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>
            })}
        </select>
    </div>
}


function SelectAuthorField() {
    const {
        data,
        handleData,
    } = usePostForm();
    const { data: authors } = useAuthors();
    return <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500">Authors  <span className="text-red-500">*</span> </label>
        <select
            className="px-4 py-2 rounded-full border bg-gray-50"
            name="authorId"
            id="authorId"
            value={data?.authorId}
            onChange={(e) => {
                handleData('authorId', e.target.value)
            }}
            required>
            <option value="">Select Author</option>
            {authors && authors?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>
            })}
        </select>
    </div>
}
