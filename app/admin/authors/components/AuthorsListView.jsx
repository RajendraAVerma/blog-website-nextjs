"use client"

import { useAuthors } from "@/lib/firebase/author/read";
import Link from "next/link"

export default function AuthorsListView() {
    const { data, error, isLoading } = useAuthors();
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }
    if (!data) {
        return <h1>Data not found!</h1>
    }
    return <section>
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border px-4 py-2 bg-blue-50">Sr.</th>
                    <th className="border px-4 py-2 bg-blue-50">Photo</th>
                    <th className="border px-4 py-2 bg-blue-50">Name</th>
                    <th className="border px-4 py-2 bg-blue-50">Email</th>
                    <th className="border px-4 py-2 bg-blue-50">Action</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, key) => {
                    return <tr>
                        <td className="border px-4 py-2">{key + 1}</td>
                        <td className="border px-4 py-2"> <img className="h-10" src={item?.photoURL} alt="" /> </td>
                        <td className="border px-4 py-2">{item?.name}</td>
                        <td className="border px-4 py-2">{item?.email}</td>
                        <td className="border px-4 py-2">
                            <Link href={`/admin/authors/form?id=${item?.id}`}>
                                <button className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm">Action</button>
                            </Link>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </section>
}