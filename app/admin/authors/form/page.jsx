"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthorForm } from "./contexts/AuthorFormContext";

export default function Page() {
    const searchParams = useSearchParams();
    const updateAuthorId = searchParams.get('id')

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
    } = useAuthorForm();

    useEffect(() => {
        if (updateAuthorId) {
            fetchData(updateAuthorId);
        }
    }, [updateAuthorId])


    return <main className="w-full p-6 flex flex-col gap-3">
        <div className="flex gap-5 items-center">
            {updateAuthorId && <div className="flex">
                <h3 className="text-white bg-orange-500 px-4 py-2 rounded-full text-xs font-bold">Update</h3>
            </div>}
            {!updateAuthorId && <div className="flex">
                <h3 className="text-white bg-green-500 px-4 py-2 rounded-full text-xs font-bold">Create</h3>
            </div>}
            <h1 className="font-bold">Author | Form</h1>
        </div>
        <section className="flex">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (updateAuthorId) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}
                className="flex flex-col gap-2 bg-blue-50 rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Author Name <span className="text-red-500">*</span> </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Author Name"
                        type="text"
                        onChange={(e) => {
                            handleData('name', e.target.value)
                        }}
                        value={data?.name}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Author Email <span className="text-red-500">*</span> </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Author Email"
                        type="email"
                        onChange={(e) => {
                            handleData('email', e.target.value)
                        }}
                        value={data?.email}
                        required
                    />
                </div>
                {data?.photoURL && <div>
                    <img className="h-40" src={data?.photoURL} alt="" />
                </div>}
                {image && <div>
                    <img className="h-40" src={URL.createObjectURL(image)} alt="" />
                </div>}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Image  </label>
                    <input
                        className="px-4 py-2 rounded-full border bg-gray-50"
                        placeholder="Enter Author Slug"
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
                    {isLoading ? "Loading..." : updateAuthorId ? "Update" : "Create"}
                </button>}

                {updateAuthorId && !isDone && <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(updateAuthorId);
                    }}
                    disabled={isLoading || isDone}
                    className="bg-red-500 rounded-full px-4 py-2 text-white">
                    {isLoading ? "Loading..." : "Delete"}
                </button>}

                {isDone && <h3 className="text-green-500 font-bold text-center">
                    Successfully {updateAuthorId ? "Updated" : "Created"} !
                </h3>}

            </form>
        </section>
    </main>
}