"use client"

import { db } from '@/lib/firebase'
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'

export function usePosts() {
    const { data, error } = useSWRSubscription(['posts'], ([path], { next }) => {
        const ref = collection(db, path);

        const unsub = onSnapshot(ref, (snaps) => {
            next(null, snaps.docs.map((v) => v.data()))
        }, (error) => {
            next(error?.message)
        })
        return () => unsub();
    })
    return {
        data,
        error,
        isLoading: data === undefined ? true : false,
    }
}

export const getPost = async (id) => {
    return await getDoc(doc(db, `posts/${id}`));
}
