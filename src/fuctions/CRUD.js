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


export const DeleteData = (id, collection_name) => {
    

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
