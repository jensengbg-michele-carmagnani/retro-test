import { reactive } from "vue";
import { dataLogin, counter, carsTypes } from '../types'
import axios from 'axios'

 const state = reactive({
   counter: 0 as counter,
   login: {} as dataLogin,
   api: 'http://localhost:3000',
  cars : []  as carsTypes[]
});

const methods = {
  decreaseCounter() {
    state.counter--;
  },
  increaseCounter () {
    state.counter ++;
  },
   

};
// const login = async (info) => {
      
//       const res = await axios.post(`${api}/login`, info.infoLogin);
//       console.log(res.data.success);
//       if (res.data.success == true) {
        
//         router.push("/home");
//       }
//     };



export function getCars () {
    //  const options = {
    //    headers: {
    //      Accept: 'application/json',
    //      "Content-Type": "application/json"
    //    }
    //  }
 axios.get(`${state.api}/cars`)
 
    
     
   } 

    
    
  


export default {
  state,
  methods,
  getCars

  
};
