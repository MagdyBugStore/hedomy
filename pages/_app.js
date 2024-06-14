import { useEffect, useState } from "react";
// import "react-input-range/lib/css/index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-modal/styles.css";

import "swiper/css";
import "swiper/css/navigation";
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import store from "../redux/store";
import Preloader from "./../components/elements/Preloader";
import "../public/assets/css/main.css";



function MyApp({ Component, pageProps }) {


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            {!loading ? (
                <Provider store={store}>
                    <StorageWrapper>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </StorageWrapper>
                </Provider>
            ) : (
                <Preloader />
            )}
        </>
    );
}
export default MyApp;
