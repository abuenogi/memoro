import { db } from '../services/firebase/firebaseConfig';

export const createData = (data, collection_name) => {

    debugger;
    try {
        return db
            .collection(collection_name)
            .doc()
            .set(data);
    } catch (error) {
        console.log(error);
    }
}


export const deleteData = (id, collection_name) => {


    try {
        return db
            .collection(collection_name)
            .doc(id)
            .delete();
    } catch (error) {
        console.log(error);
    }

}


export const updateDataElement = (collection_name,id, data, value) => {

    try {
        const field = `${data}`;
        return db
            .collection(collection_name)
            .doc(id)
            .update({field:value});
    } catch (error) {
        console.log(error);
    }

}

export const getData = (collection_name) => {

    return db.collection(collection_name).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });

}


export function getDataElement(collection_name, data, value) {
    debugger;
    return db.collection(collection_name).where(data, "==", value).get();
}

