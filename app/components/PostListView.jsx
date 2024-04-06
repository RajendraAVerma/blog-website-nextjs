import { getAuthor } from "@/lib/firebase/author/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getAllPosts } from "@/lib/firebase/post/read_server"
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PostListView() {
    const posts = await getAllPosts();
    if (!posts) {
        return <div>
            <h3>Posts Not Available!</h3>
        </div>
    }
    return <section className="p-10">
        <div className="grid grid-cols-4 gap-5">
            {posts?.map((post, key) => {
                return <PostCard post={post} key={key} />
            })}
        </div>
    </section>
}

export function PostCard({ post }) {
    return <Link href={`/posts/${post?.id}`}>
        <div className="flex flex-col gap-3 p-5 rounded">
            <div className="relative">
                <div className="absolute flex justify-end w-full p-3">
                    <CategoryCard categoryId={post?.categoryId} />
                </div>
                <img className="h-[200px] w-full object-cover" src={post?.imageURL} alt="" />
            </div>
            <h1 className="font-bold">{post?.title}</h1>
            <div className="flex justify-between">
                <AuthorCard authorId={post?.authorId} />
                <h5 className="text-xs text-gray-500">{post?.timestamp?.toDate()?.toLocaleDateString()}</h5>
            </div>
        </div>
    </Link>
}

async function AuthorCard({ authorId }) {
    const author = await getAuthor(authorId);
    return <div className="flex gap-2 items-center">
        <img className="h-6 w-6 rounded-full object-cover" src={author?.photoURL} alt="" />
        <h4 className="text-sm text-gray-500">{author?.name}</h4>
    </div>
}

async function CategoryCard({ categoryId }) {
    const category = await getCategory(categoryId);
    return <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1">
        <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
        <h4 className="text-xs text-gray-500">{category?.name}</h4>
    </div>
}