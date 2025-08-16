import styles from "./index.module.scss"

interface ButtonProps {
    title: string;
    type: "button" | "submit" | "reset";
    handleClick: () => void;
    style?: string;
}

const Index = ({title, type, handleClick, style}: ButtonProps) => {
    return (
        <button className={`${styles.btn} ${style ? styles[style] : ''}`} type={type} onClick={handleClick}>{title}</button>
    );
}
export default Index;