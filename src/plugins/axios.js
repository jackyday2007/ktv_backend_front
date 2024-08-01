import axios from "axios";
import Swal from "sweetalert2";



const axiosapi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// axiosapi.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         console.log(error);
//         if (error.response && error.response.status && error.response.status === 403) {

//             Swal.fire({
//                 text: "權限不足",
//                 icon: "error"
//             }).then(function () {
//                 window.location.href = "/secure/login";
//             });
//             return Promise.reject();
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosapi;