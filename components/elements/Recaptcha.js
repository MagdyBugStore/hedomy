// components/Recaptcha.js
import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = ({ onChange }) => {
    const recaptchaKey = "6LfUckkoAAAAABIfZy21bLSGcqBFrKig8kXxcDat";

    return (
        <ReCAPTCHA
            sitekey={recaptchaKey}
            onChange={onChange}
        />
    );
};

export default Recaptcha;
