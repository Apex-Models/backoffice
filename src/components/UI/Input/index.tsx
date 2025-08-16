"use client"

import styles from './index.module.scss'

interface InputProps {
  name: string;
  id?: string;
  value: string | number;
  placeholder?: string;
  style?: string;
  type?: string;
  icon?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  isRequired?: boolean;
}

const Index: React.FC<InputProps> = ({ name, value, id, placeholder, type, style, onChange, onFocus, isRequired, icon }) => {
  const isChecked = type === "checkbox" && value === "checked";
  
  return (
    type === "checkbox" ? (
      <div className={`${styles.checkboxContainer} ${isChecked ? styles.active : ''}`}>
        <input 
          type="checkbox" 
          name={name} 
          id={id} 
          checked={isChecked}
          onChange={onChange} 
          onFocus={onFocus}
        />
        {isChecked && <span className={styles.checkmark}>✓</span>}
      </div>
    ) : (
      <div className={styles.inputContainer}>
        {icon && (
          <label htmlFor={id}>
            <img src={icon} alt={name}/>
          </label>
        )}
        <input className={`${styles.textInput} ${style ? styles[style] : ''}`} type={type} name={name} id={id} value={value} required={isRequired} placeholder={placeholder} onChange={onChange} onFocus={onFocus}/>
      </div>
    )
  )
}
  
export default Index;