import React, { useState } from 'react';
import './searchableDropdown.css';

const SearchableDropdown = ({ list, onSelect, labelTitle, isDisabled }) => {
    const [filter, setFilter] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    const selectDropdownStyle = {
        backgroundColor: isDisabled ? 'var(--gray-bg)' : '',
        pointerEvents: isDisabled ? 'none' : '',
    };

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);

        const filteredList = getFilteredList(newFilter);

        setFilteredList(filteredList);

    };

    const handleSelectedOption = (value) => {
        setFilter(value.text);
        setFilteredList([]);
        onSelect(value); // Llamar a la función onSelect con el valor seleccionado
    };

    const getFilteredList = (filter) => {
        return list.filter(item =>
            item.text.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <>
            <p className='selDropdown-title'>{labelTitle}</p>
            <div className='selDropdown-container'>
                <input
                    type="text"
                    value={filter}
                    onChange={handleFilterChange}
                    placeholder="Buscar..."
                    className='selDropdown-input'
                    style={selectDropdownStyle}
                />
                <div className="selDropdown-heightWindow">
                    {filter && (
                        <ul className='selDropdown-list'>
                            {filteredList.map((item, index) => (
                                <li
                                    key={index}
                                    className='selDropdown-item'
                                    onClick={() => handleSelectedOption(item)}
                                >
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchableDropdown;
