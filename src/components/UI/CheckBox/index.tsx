"use client"

import styles from './index.module.scss'

interface CheckBoxProps {
  name: string;
  id?: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

const CheckBox: React.FC<CheckBoxProps> = ({ name, id, checked, onChange, onFocus }) => {
  return (
    <div className={`${styles.checkboxContainer} ${checked ? styles.active : ''}`}>
      <input 
        type="checkbox" 
        name={name} 
        id={id} 
        checked={checked}
        onChange={onChange} 
        onFocus={onFocus}
        className={styles.checkbox}
      />
    </div>
  )
}
  
export default CheckBox;
