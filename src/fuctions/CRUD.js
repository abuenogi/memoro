import { db } from '../services/firebase/firebaseConfig';


export const getData = (collection_name) => {
    return db.collection(collection_name).doc().get()
        .then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
}

export const createData = (data, collection_name) => {

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


export const useUpdateData = (id, data, collection_name) => {

            try {
                return db
                    .collection(collection_name)
                    .doc(id)
                    .update(data);
            } catch (error) {
                console.log(error);
            }

}
