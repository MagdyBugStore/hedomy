import React from "react";
import Link from "next/link"
import Tags from "../ecommerce/Filter/Tags";
import { useState } from "react";
import { useSelector } from "react-redux";

const Breadcrumb2 = ({parent, sub, subChild, noBreadcrumb}) => {
    
    const [lastcategory, setLastcategory] = useState("");
    
    useSelector(state => {
        if(lastcategory != state.productFilters.category)
        {
            setLastcategory(state.productFilters.category)
        }
    });

    return (
        <>
            <div className="page-header mt-30 mb-50" dir="rtl">
            <div className="container">
                <div className="archive-header">
                    <div className="row align-items-center">
                        <div className="col-xl-3">
                            <h1 className="mb-15 text-capitalize">{lastcategory ? lastcategory : ""}</h1>
                            <div className="breadcrumb">
                                <Link href="/"><a rel="nofollow"><i className="fi-rs-home mr-5"></i>Home</a></Link>
                                
                            </div>
                        </div>
                        <div className="col-xl-9 text-end d-none d-xl-block">
                            <Tags/>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Breadcrumb2;
