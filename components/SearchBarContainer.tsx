import React from 'react'

interface SearchBarContainerProps {
    headerText: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarContainer = ({
    headerText,
    placeholder,
    value,
    onChange
}: SearchBarContainerProps) => {
  return (
      <div className='searchContainer' data-testid='searchArea'>
        <h1>{headerText}</h1>
        <input 
          className='searchInput'
          type='text' 
          placeholder={placeholder} 
          value={value}
          onChange={onChange} 
        />
      </div>
  )
}

export default SearchBarContainer;
