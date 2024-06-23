import { useEffect, useState } from "react";
// import "react-input-range/lib/css/index.css";
import { Provider } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ToastContainer } from 'react-toastify';
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import store from "../redux/store";
import Preloader from "./../components/elements/Preloader";
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-modal/styles.css";
import "swiper/css";
import "swiper/css/navigation";



function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = useState(true);

    return (
        <>
            {!loading ? (
                <Provider store={store}>
                        <Component {...pageProps} />
                        <ToastContainer />
                </Provider>
            ) : (
                <Preloader />
            )}
        </>
    );
}
export default MyApp;
