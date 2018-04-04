/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, CategorySelect, ArticlesList } from '@wordpress/components';
import { Component, compose } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import {
	isEditorSidebarPanelOpened,
	getSelectedCategory,
	getSearchTerm,
	getArticles,
} from '../../../store/selectors';
import {
	toggleGeneralSidebarEditorPanel,
	setCategory,
	setSearchTerm,
	searchArticles,
} from '../../../store/actions';
import '@wordpress/core-data';

/**
 * Module Constants
 */
const PANEL_NAME = 'articles-panel';

class ArticlesPanel extends Component {
	componentWillMount() {
		this.props.searchArticles();
	}

	render() {
		const {
			isOpened,
			onTogglePanel,
			categories,
			articles,
			selectedCategory,
			onCategoryChange,
			onSearchInputChange,
			searchTerm,
		} = this.props;

		return (
			<PanelBody
				title={ __( 'Stories' ) }
				opened={ isOpened }
				onToggle={ onTogglePanel }
			>
				<TextControl
					placeholder={ __( 'Search articles' ) }
					value={ searchTerm }
					onChange={ onSearchInputChange }
				/>

				<CategorySelect
					key="query-controls-category-select"
					categoriesList={ categories }
					label={ __( 'Category' ) }
					noOptionLabel={ __( 'All' ) }
					selectedCategoryId={ selectedCategory }
					onChange={ onCategoryChange }
				/>

				<ArticlesList
					articles={ articles }
				/>
			</PanelBody>
		);
	}
}

export default compose(
	connect(
		( state ) => ( {
			isOpened: isEditorSidebarPanelOpened( state, PANEL_NAME ),
			selectedCategoryId: getSelectedCategory( state ),
			searchTerm: getSearchTerm( state ),
			articles: getArticles( state ),
		} ),
		{
			onTogglePanel() {
				return toggleGeneralSidebarEditorPanel( PANEL_NAME );
			},

			onCategoryChange( categoryId ) {
				return setCategory( categoryId );
			},

			onSearchInputChange( term ) {
				return setSearchTerm( term );
			},

			searchArticles,
		},
		undefined,
		{ storeKey: 'edit-post' }
	),
	withSelect( ( select ) => {
		const { getCategories } = select( 'core' );

		return {
			categories: getCategories(),
		};
	} )
)( ArticlesPanel );
