// src/IconPicker.js
import React, { useState } from 'react';
import * as Icons from 'feather-icons-react';
import './IconPicker.css';

const IconPicker = ({ rowsInOnePage, columnsInOnePage, iconHeight, iconWidth, pickerHeight = 500, pickerWidth = 500 }) => {
  const [selectedIcon, setSelectedIcon] = useState(null); //State to store the selected icon
  const [isOpen, setIsOpen] = useState(false); //State to manage the visibility of the icon picker
  const [page, setPage] = useState(0); //State to manage the current page of the icon picker

  const iconsArray = Object.keys(Icons); //Array of all available Feather icons
  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const totalPages = Math.ceil(iconsArray.length / iconsPerPage); //Total number of pages in the icon picker

  //Function to handle the click event when an icon is selected
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setIsOpen(false);
  };

  //Function to handle the click event when the icon picker div is opened or closed
  const handleDivClick = () => {
    setIsOpen(prev => !prev);
  };

  //Function to render the icons based on the current page
  const renderIcons = () => {
    const startIndex = page * iconsPerPage;
    const endIndex = startIndex + iconsPerPage;

    //Maps over the icons for the current page and renders them.
    return iconsArray.slice(startIndex, endIndex).map((iconName) => {
      const IconComponent = Icons[iconName]; //Dynamically gets the icon component from the feather-icons-react library.
      return (
        <div
          key={iconName}
          onClick={() => handleIconClick(iconName)}
          className="icon-container"
          style={{
            width: iconWidth,
            height: iconHeight,
            display: 'inline-block',
            margin: '5px',
            cursor: 'pointer',
          }}
        >
          <IconComponent size={iconHeight - 10} />
        </div>
      );
    });
  };

  return (
    <div className="icon-picker-wrapper">
      <div
        onClick={handleDivClick}
        className="selected-icon"
        style={{
          width: '100px',
          height: '100px',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        }}
      >
        {selectedIcon ? React.createElement(Icons[selectedIcon], { size: 48 }) : 'Click to select icon'}
      </div>
      {isOpen && (
        <div
          className="icon-picker"
          style={{
            position: 'absolute',
            width: pickerWidth,
            height: pickerHeight,
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            overflow: 'auto',
            zIndex: 1000,
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            padding: '10px',
          }}
        >
          <div className="icon-picker-header">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}>
              Next
            </button>
          </div>
          <div
            className="icon-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columnsInOnePage}, ${iconWidth}px)`,
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {renderIcons()}
          </div>
          <div className="icon-picker-footer">
            <button onClick={() => setIsOpen(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
