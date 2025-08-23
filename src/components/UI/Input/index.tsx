"use client"

import styles from './index.module.scss'

interface InputProps {
  name: string;
  id?: string;
  value?: string | number;
  placeholder?: string;
  style?: string;
  type?: string;
  icon?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  isRequired?: boolean;
}

const Index: React.FC<InputProps> = ({ name, value = "", id, placeholder, type = "text", style, onChange, onFocus, isRequired, icon }) => {
  return (
    <div className={styles.inputContainer}>
      <input 
        className={`${styles.textInput} ${style ? styles[style] : ''}`} 
        type={type} 
        name={name} 
        id={id} 
        value={value} 
        required={isRequired} 
        placeholder={placeholder} 
        onChange={onChange} 
        onFocus={onFocus}
      />
      {icon && (
        <label htmlFor={id}>
          <img src={icon} alt={name}/>
        </label>
      )}
    </div>
  )
}
  
export default Index;