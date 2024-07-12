import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useEffect, useRef } from 'react';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	formState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onFormChange: (key: keyof ArticleStateType, option: OptionType) => void;
}

export const ArticleParamsForm = ({
	formState,
	onApply,
	onFormChange,
}: ArticleParamsFormProps) => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleFormVisibility = () => {
		setIsFormVisible(!isFormVisible);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsFormVisible(false);
		}
	};

	useEffect(() => {
		if (isFormVisible) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormVisible]);

	const handleSelectChange = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		onFormChange(key, option);
	};

	const handleReset = () => {
		localStorage.removeItem('formState');
		onApply(defaultArticleState);
		onFormChange('fontFamilyOption', fontFamilyOptions[0]);
		onFormChange('fontColor', fontColors[0]);
		onFormChange('backgroundColor', backgroundColors[0]);
		onFormChange('contentWidth', contentWidthArr[0]);
		onFormChange('fontSizeOption', fontSizeOptions[0]);
	};

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	};

	return (
		<>
			<ArrowButton onClick={toggleFormVisibility} isOpen={isFormVisible} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isFormVisible ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleApply}>
					<h1 className={clsx(styles.h1, styles.uppercase)}>
						Задайте параметры
					</h1>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							handleSelectChange('fontFamilyOption', option)
						}
						placeholder='Select a font family'
						title='Шрифт'
					/>
					<RadioGroup
						name={'fontSizeGroup'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => handleSelectChange('fontSizeOption', option)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => handleSelectChange('fontColor', option)}
						placeholder='Select a font color'
						title='Цвет шрифта'
					/>
					<Separator></Separator>

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => handleSelectChange('backgroundColor', option)}
						placeholder='Select a background color'
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleSelectChange('contentWidth', option)}
						placeholder='Select content width'
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
