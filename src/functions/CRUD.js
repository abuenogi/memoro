import {
    db, geo
} from '../services/firebase/firebaseConfig';

export const createData = (data, collection_name) => {

    console.log(" === > CREATEDATA del CRUD data: ", data, "CREATEDATA del CRUD collection_name: ", collection_name);
    try {
        return db
            .collection(collection_name)
            .doc()
            .set(data);
    } catch (error) {
        console.log("error creando datos en createData CRUD ", error);
    }
}


export const deleteData = (id, collection_name) => {

    console.log(" === > DELETEDATA del CRUD id: ", id, "DELETEDATA del CRUD collection_name: ", collection_name);
    try {
        return db
            .collection(collection_name)
            .doc(id)
            .delete();
    } catch (error) {
        console.log("error borrando datos en deleteData CRUD ",error);
    }

}

export function deleteDataElement(collection_name, id , value) {   
    var ref = db.collection(collection_name).doc(id);
    ref.update({contactos: geo.FieldValue.arrayRemove(value)})
}


export const updateDataElement = (collection_name, id, data) => {
    try {
        console.log(" === > UPDATEDATAELELEMT del CRUD id: ", id, "UPDATEDATAELELEMT del CRUD collection_name: ", collection_name);
        db.collection(collection_name).where('__name__', '==' ,id).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " update => ", doc.data());
                db.collection(collection_name).doc(doc.id).update(data);
            });
        })
    } catch (error) {
        console.log("error actualizando datos en updateDataElement CRUD ",error);
    }
}


export const updateData = (id, data, collection_name) => {
    try {
        console.log(" === > UPDATEDATA del CRUD id: ", id, "UPDATEDATA del CRUD data: ", data, "UPDATEDATA del CRUD collection_name: ", collection_name);
        return db
            .collection(collection_name)
            .doc(id)
            .update(data);
    } catch (error) {
        console.log("error actualizando datos en updateData CRUD ",error);
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

export const getDataByID = (collection_name, id) => {

    //return db.collection(collection_name).where('__name__', '==' ,id).get()
    //return db.collection(collection_name).where(db.collection(collection_name).id, '==', id).get()
    return db.collection(collection_name).doc(id).get()

}



export function getDataElement(collection_name, data, value) {
    return db.collection(collection_name).where(data, "==", value).get();
}

 export function fetch_data(url) {

    return fetch (url)
    .then( function (response) {
         return response.text();
    })
    
}

/**
 * Función que devuelve los objetos referenciados de un objeto  que 
 * están relacionados y almacenados en la Database de firebase
 * @param { colección donde residen los datos a buscar } colection_name_ref 
 * @param { array con los identificadores de la ruta del documento } array_ref 
 */
export function getDataWithRef(colection_name_ref, array_ref) {

    //Devuelve una colección de promesas con los objetos en función de 
    //la colección solicitada y el conjunto de identificadores
    const collectionPromises = array_ref.map(id => {
        return db.collection(colection_name_ref).doc(id).get();
    })
    // Se devuelve la colección de promesas obtenidas en la búsqueda anterior
    return Promise.all(collectionPromises)


}
