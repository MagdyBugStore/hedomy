import React, { useState } from 'react';

const NestedMenu = ({ menuData }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  const renderSubMenu = (subMenu) => {
    return (
      <ul className="ml-4">
        {subMenu.map((subItem) => (
          <li key={subItem.label} className="py-1">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              {subItem.label}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => (
      <li key={item.label} className="py-2">
        <a
          href="#"
          className="text-gray-600 hover:text-gray-800 flex items-center"
          onClick={() => handleItemClick(item)}
        >
          <span className="mr-2">{item.label}</span>
          {item.subMenu && (
            <svg
              className={`w-4 h-4 transition-transform ${
                item === activeItem ? 'rotate-90' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </a>
        {item.subMenu && item === activeItem && renderSubMenu(item.subMenu)}
      </li>
    ));
  };

  return <ul>{renderMenuItems(menuData)}</ul>;
};

export default NestedMenu;
