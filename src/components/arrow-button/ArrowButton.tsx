import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import React from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

// export const ArrowButton = () => {
// 	const handleClick = (event: any) => {
// 		console.log("Я ничего не знаю!");
// 	  };
interface ArrowButtonProps {
	onClick: OnClick;
	isOpen: boolean;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	onClick,
	isOpen,
}) => {
	return (
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
