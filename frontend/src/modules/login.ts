
import firebase from "firebase";
import { useRouter } from 'vue-router'
import axios from 'axios'
import { dataLogin } from '../types'

export const googleLogin = () =>{
  const router = useRouter()
  const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly"),
        provider.addScope("");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;

          console.log(JSON.stringify(user));
          alert(
            JSON.stringify(`Username is : ${user?.displayName}
                             email is : ${user?.email}`)
          );
          router.replace("/home");
          return user
        })
        .catch((error) => {
          console.log(error.message);
        });
  
}
// export const localLogin = async (email:dataLogin, api:string) => {
//   const router = useRouter()
//   const res = await axios.post(`${api}/login`, infoLogin);
//       console.log(res.data.success);
//       // check if pwd and email are correct
//       if (res.data.success == true) {
//         router.push("/home");
//       } else {
//         alert("Password or username wrong!");
//       }
// }