/**
 * External dependencies
 */
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { usePopoverContext } from '../popover';
import { Scrollable } from '../scrollable';
import { View } from '../view';
import * as styles from './styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').CardBodyProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function CardBody( props, forwardedRef ) {
	const { className, scrollable = true, ...otherProps } = useContextSystem(
		props,
		'CardBody'
	);

	const { popover } = usePopoverContext();

	const classes = useMemo(
		() =>
			cx(
				styles.Body,
				styles.borderRadius,
				popover && styles.popoverBody,
				className
			),
		[ className, popover ]
	);

	if ( scrollable ) {
		return (
			<Scrollable
				{ ...otherProps }
				className={ classes }
				ref={ forwardedRef }
			/>
		);
	}

	return (
		<View { ...otherProps } className={ classes } ref={ forwardedRef } />
	);
}

/**
 * `CardBody` is a layout component, rendering the contents of a `Card`.
 * Multiple `CardBody` components can be used within `Card` if needed.
 *
 * @example
 * ```jsx
 * <Card>
 * 	<CardBody>
 * 		...
 * 	</CardBody>
 * </Card>
 * ```
 */
const ConnectedCardBody = contextConnect( CardBody, 'CardBody' );

export default ConnectedCardBody;
