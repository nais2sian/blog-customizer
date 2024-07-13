import clsx from 'clsx';
import { CSSProperties, useState, useEffect } from 'react';
import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(() => {
		const savedState = localStorage.getItem('articleState');
		return savedState ? JSON.parse(savedState) : defaultArticleState;
	});

	useEffect(() => {
		localStorage.setItem('articleState', JSON.stringify(articleState));
	}, [articleState]);

	const handleApplyChanges = (newState: ArticleStateType) => {
		setArticleState(newState);
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
			{<ArticleParamsForm onApply={handleApplyChanges} />}
			<Article />
		</div>
	);
};
