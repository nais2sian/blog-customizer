import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
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
	onApply: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(() => {
		const savedFormState = localStorage.getItem('formState');
		return savedFormState ? JSON.parse(savedFormState) : defaultArticleState;
	});
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		localStorage.setItem('formState', JSON.stringify(formState));
	}, [formState]);

	const toggleFormVisibility = () => {
		setIsFormVisible(!isFormVisible);
	};

	useOutsideClickClose({
		isOpen: isFormVisible,
		onChange: setIsFormVisible,
		rootRef: formRef,
	});

	const handleSelectChange = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState((prevState: ArticleStateType) => ({
			...prevState,
			[key]: option,
		}));
	};

	const handleReset = () => {
		localStorage.removeItem('formState');
		onApply(defaultArticleState);
		Object.keys(defaultArticleState).forEach((key) => {
			handleSelectChange(
				key as keyof ArticleStateType,
				defaultArticleState[key as keyof ArticleStateType]
			);
		});
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
				className={clsx(styles.container, {
					[styles.container_open]: isFormVisible,
				})}>
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
