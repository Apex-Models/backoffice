"use client"

import { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  options, 
  value, 
  placeholder = "Sélectionner...", 
  onChange, 
  style 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Trouver l'option sélectionnée
  const selectedOption = options.find(option => option.value === value);

  // Fermer le dropdown lors du clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdown} ${style ? styles[style] : ''}`} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
      >
        <span className={styles.buttonText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <img
          src="/icons/arrow.svg"
          alt="arrow"
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.dropdownItem} ${
                option.value === value ? styles.selected : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
