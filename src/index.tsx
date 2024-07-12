import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(() => {
		const savedState = localStorage.getItem('articleState');
		return savedState ? JSON.parse(savedState) : defaultArticleState;
	});

	const [formState, setFormState] = useState<ArticleStateType>(() => {
		const savedFormState = localStorage.getItem('formState');
		return savedFormState ? JSON.parse(savedFormState) : defaultArticleState;
	});

	useEffect(() => {
		localStorage.setItem('articleState', JSON.stringify(articleState));
	}, [articleState]);

	useEffect(() => {
		localStorage.setItem('formState', JSON.stringify(formState));
	}, [formState]);

	const handleApplyChanges = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const handleFormChange = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState((prevState: ArticleStateType) => ({
			...prevState,
			[key]: option,
		}));
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				onApply={handleApplyChanges}
				onFormChange={handleFormChange}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
