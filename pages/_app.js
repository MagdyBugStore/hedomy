import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import store from "../redux/store";
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-modal/styles.css";
import "swiper/css";
import "swiper/css/navigation";



function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = useState(true);

    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
export default MyApp;
