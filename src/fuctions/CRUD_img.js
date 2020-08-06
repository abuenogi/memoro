
import {
    storage
} from '../services/firebase/firebaseConfig';

export const func_getDownloadURL = (ref_storage,child_storage) => {

    storage.ref(ref_storage).child(child_storage).getDownloadURL().then(url=>{
        // `url` is the download URL for 'images/stars.jpg'

        return url;

    }).catch(function (error) {
        console.log(error)
    });

}