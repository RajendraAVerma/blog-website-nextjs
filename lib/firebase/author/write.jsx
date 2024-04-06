import { db, storage } from "@/lib/firebase";
import { Timestamp, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewAuthor = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    if (!image) {
        throw new Error("Image is not selected");
    }
    const id = doc(collection(db, 'ids')).id;

    const imageRef = ref(storage, `authors/${id}.png`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    const firestoreRef = doc(db, `authors/${id}`)
    await setDoc(firestoreRef, {
        ...data,
        id: id,
        photoURL: imageURL,
        timestamp: Timestamp.now(),
    });
}

export const updateAuthor = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    var imageURL = data?.photoURL;

    if (image) {
        const imageRef = ref(storage, `authors/${data?.id}.png`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }

    const firestoreRef = doc(db, `authors/${data?.id}`);

    await updateDoc(firestoreRef, {
        ...data,
        photoURL: imageURL,
        timestamp: Timestamp.now(),
    });
}

export const deleteAuthor = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `authors/${id}`));
}