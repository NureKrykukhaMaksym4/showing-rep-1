import React, {useMemo} from 'react';
import styles from './classic-button.module.scss';

type ClassicButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    variant?: string;
    children: any;
}
const ClassicButton = ({
                           children,
                           onClick,
                           variant
                       }: ClassicButtonProps) => {
    const variantClassName = useMemo(() => {
        let className = '';
        switch (variant) {
            case 'danger':
                className = styles.danger;
                break;
            default:
                break;
        }

        return className;
    }, [variant]);
    return (
        <button
            className={`${styles.button} ${variantClassName}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ClassicButton;