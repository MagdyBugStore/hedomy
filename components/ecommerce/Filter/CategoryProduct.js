import { connect } from "react-redux";
import menMenuData from '../../../public/static/men/categories.json'
import womenMenuData from '../../../public/static/women/categories.json'
import kidsMenuData from '../../../public/static/kids/categories.json'
import {storage} from '../../../util/localStorage';
import {Categories , CategoriesHeader} from '../../../redux/stores/categories';
import React, { useEffect } from 'react';
import { updateProductCategory } from "../../../redux/action/productFiltersAction";

const CategoryProduct = ({ updateProductCategory , gender }) => {
    const tags = CategoriesHeader();

    const AddCategory = (category) => {
        updateProductCategory(category);
    };
    var MenuData = menMenuData;

    var gender = storage.get('type')
    if(gender == 'women'){
        MenuData = womenMenuData
    }
    else if(gender == 'kids'){
        MenuData = kidsMenuData   
    }
    
    return (
        <>
            <ul>
                
                {
                    tags.map((category,index) => (
                        <li key={index} onClick={(e) => AddCategory(category)}>
                            <a>
                                {category}
                            </a>
                            <span className="count">{}</span>
                        </li>
                    ))
                }            
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
