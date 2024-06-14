import Link from "next/link";
import { useState } from "react";
import Timer from "./Timer";

const IntroPopup = () => {
    const [openClass, setOpenClass] = useState(0);

    const fixDate = new Date();
    return (
        <>
            <div className="modal fade custom-modal  show d-block" dir="rtl">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-body">
                            <div className="text-center">
                                <img src="/assets/imgs/theme/correct.png" />
                            </div>
                            <h1 className="mb-15 font text-center">
                                تم ارسال بياناتك بنجاح سيتم التواصل معك خلال 24 ساعه
                            </h1>
                            <Link href="/">
                                <a className="btn hover-up">
                                    الصفحة الرئيسية{" "}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal-backdrop fade show"

            ></div>
        </>
    );
};

export default IntroPopup;
