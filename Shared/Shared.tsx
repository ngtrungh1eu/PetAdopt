import { db } from '@/config/FirebaseConfig';
import { collection, doc, DocumentReference, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const GetFavList = async (user: any) => {
  const docSnap = await getDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress));
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress), {
      email: user?.primaryEmailAddress?.emailAddress,
      favorites: [],
    });
  }
};

export const UpdateFavList = async (user: any, favorites: any) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, { favorites: favorites });
  } catch (error) {}
};

export default {
  GetFavList,
  UpdateFavList,
};
