import React, { useState } from "react";
import Recaptcha from "../components/elements/Recaptcha";
import Layout from "../components/layout/Layout";
import { setbuyer } from '../redux/stores/apis'
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import OrderMessage from './../components/elements/OrderMessage'
import {
    clearCart,
    deleteFromCart,
} from "../redux/action/cart";

function UserInfo({ cartItems, clearCart }) {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const [errors, setErrors] = useState({});
    const [popup, setpopup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRecaptchaChange = (response) => {
        setIsVerified(response);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!/^[A-Za-z\s-]+$/.test(formData.firstName.trim())) {
            newErrors.firstName = "الرجاء إدخال الاسم الأول.";
        }
        if (!/^[A-Za-z\s-]+$/.test(formData.lastName.trim())) {
            newErrors.lastName = "الرجاء إدخال اسم العائلة.";
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "البريد الإلكتروني غير صحيح.";
        }
        if (!/^\d+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "رقم الهاتف يجب أن يحتوي على أرقام فقط.";
        }
        if (!/^[A-Za-z0-9\s\-\.,#\/]+$/u.test(formData.address.trim())) {
            newErrors.address = "الرجاء إدخال عنوان التوصيل.";
        }
        if (!isVerified) {
            newErrors.recaptcha = "الرجاء التحقق من Recaptcha.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!validateForm()) {
            alert("Please fill out all fields correctly and verify Recaptcha.");
            return;
        }

        try {
            const extractedData = cartItems.map((item) => ({
                _id: item._id,
                quantity: item.quantity,
            }));

            await setbuyer({ ...formData, products: extractedData })
            clearCart();
            PoPup();
          
        } catch (error) {
            console.error('Error sending data to API:', error);
            alert('An error occurred while submitting the form.');
        }
    };
    const price = () => {
        let price = 0;
        cartItems.forEach((item) => (price += item.price * item.quantity));

        return price;
    };
    const PoPup = () => { setpopup(true) }
    const closePoPup = () => { setpopup(false) }
    return (
        <>
            {
                popup && <OrderMessage />
            }
            <Layout parent="الصفحة الرئيسية" sub="متابعة التسوق" subChild="بيانات العميل">
                <div className="page-content pt-150 pb-150" dir="rtl">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                                <div className="row">
                                    <div className="col-lg-6 mb-50 lg:mb-0 lg:pr-30 ">
                                        <h1>تفاصيل الشحنه</h1>
                                        <td ><div className="divider mt-30 mb-30" /></td>
                                        <table className="table table-wishlist">
                                            <thead>
                                                <tr className="main-heading">
                                                    <th className="pr-30" >المحاقظة</th>
                                                    <th scope="col">سعر الطلب</th>
                                                    <th scope="col">سعر الشحن</th>
                                                    <th scope="col">الإجمالي</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center"> القاهرة </td>
                                                    <td className="text-right" data-title="الإجمالي">{price()}</td>
                                                    <td>50</td>
                                                    <td> {price() + 50} ج.م</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center"> باقي المحاقظات </td>
                                                    <td className="text-right" data-title="الإجمالي">{price()}</td>
                                                    <td>غير متوفر</td>
                                                    <td> --</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mb-30">عذراً ، سيتم تفعيل التوصيل لباقي المحاقظات في اسرع وقت</p>

                                    </div>
                                    <div className="col-lg-6 col-md-8">
                                        <div className="login_wrap widget-taber-content background-white">
                                            <div className="padding_eight_all bg-white">
                                                <div className="heading_s1">
                                                    <h1 className="mb-15">قم بادخال بياناتك</h1>
                                                    <p className="mb-30">سيتم التواصل معك في خلال 24 ساعه</p>
                                                </div>
                                                <form method="post" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            required
                                                            name="firstName"
                                                            placeholder="الاسم الأول *"
                                                            value={formData.firstName}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            required
                                                            name="lastName"
                                                            placeholder="اسم العائلة *"
                                                            value={formData.lastName}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            required
                                                            name="email"
                                                            placeholder="البريد الإلكتروني *"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.email && <p className="error">{errors.email}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="tel"
                                                            required
                                                            name="phoneNumber"
                                                            placeholder="رقم الهاتف *"
                                                            value={formData.phoneNumber}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea
                                                            required
                                                            name="address"
                                                            placeholder="عنوان التوصيل *"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                        ></textarea>
                                                        {errors.address && <p className="error">{errors.address}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <Recaptcha onChange={handleRecaptchaChange} />
                                                        {errors.recaptcha && <p className="error">{errors.recaptcha}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <button
                                                            type="submit"
                                                            disabled={!isVerified}
                                                            className="btn btn-heading btn-block hover-up"
                                                            name="submit"
                                                        >
                                                            إرسال البيانات
                                                        </button>
                                                        
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});
const mapDispatchToProps = {
    clearCart,
    deleteFromCart
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
