import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        
        router.push({
            pathname: "/products",
            query: {
                search: searchTerm,
            },
        });
        // setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    return (
        <>
            <form>
                {/* 
                <select className="select-active">
                    <option>جميع الفئات</option>
                    <option>النساء</option>
                    <option>الرجال</option>
                    <option>الهواتف الخلوية</option>
                    <option>الحواسيب</option>
                    <option>الإلكترونيات</option>
                    <option>الإكسسوارات</option>
                    <option>المنزل والحديقة</option>
                    <option>الأمتعة</option>
                    <option>الأحذية</option>
                    <option>الأم والأطفال</option>
                </select>
                     */}
                <input
                    value={searchTerm}
                    onKeyDown={handleInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="بحث"
                />
            </form>

        </>
    );
};

export default Search;
