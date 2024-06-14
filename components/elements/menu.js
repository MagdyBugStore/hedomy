import Link from 'next/link';
import { server } from "../../config/index";
import React, { useEffect, useState } from "react";
import headerMen from '../../public/static/men/header_content.json';
import headerwoMen from '../../public/static/women/header_content.json';
import headerKids from '../../public/static/kids/header_content.json';
import {storage} from '../../util/localStorage';





const MenuItem = ({ title, items }) => (
  <li className="sub-mega-menu sub-mega-menu-width-22">
    <a className="menu-title" href="#">
      {title}
    </a>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <a href="/products">{item}</a>
        </li>
      ))}
    </ul>
  </li>
);

const BannerItem = ({ imgSrc, title, content, price, discount }) => (
  <li className="sub-mega-menu sub-mega-menu-width-34">
    <div className="menu-banner-wrap">
      <a href="#">
        <img src={imgSrc} alt="Hedomy" />
      </a>
      <div className="menu-banner-content">
        <h4>{title}</h4>
        <h3>{content}</h3>
        <div className="menu-banner-price">
          <span className="new-price text-success">{price}</span>
        </div>
        <div className="menu-banner-btn">
          <a href="#">Shop now</a>
        </div>
      </div>
      <div className="menu-banner-discount">
        <h3>
          <span>{discount}</span>
          off
        </h3>
      </div>
    </div>
  </li>
);


const MegaMenu = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genderFromStorage = storage.get('type');

        switch (genderFromStorage) {
          case 'men':
            setCategories(headerMen);
            break;
          case 'women':
            setCategories(headerwoMen);
            break;
          case 'kids':
            setCategories(headerKids);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {
        categories &&
        categories.map((category, index) => (
          <li className="position-static" key={index}>
            <Link href="/#">
              <a>
                {category.category}
                <i className="fi-rs-angle-down"></i>
              </a>
            </Link>

            <ul className="mega-menu">
              <BannerItem
                imgSrc={category.banner.imgSrc}
                title={category.banner.title}
                content={category.banner.content}
                price={category.banner.price}
                discount={category.banner.discount}
              />
              {category.subcategories.map((subcategory, subIndex) => (
                <MenuItem key={subIndex} title={subcategory.title} items={subcategory.items} />
              ))}
            </ul>
          </li>
        ))}
    </ul>
  );
}

export default MegaMenu;
