import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

export const getAllPosts = async () => {
    return await getDocs(collection(db, 'posts')).then((snaps) => snaps.docs.map((d) => d.data()))
}

export const getAllPostsWithCategory = async (categoryId) => {
    const q = query(collection(db, 'posts'), where('categoryId', '==', categoryId))
    return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()))
}


export const getPost = async (id) => {
    return await getDoc(doc(db, `posts/${id}`)).then((snap) => snap.data());
}
