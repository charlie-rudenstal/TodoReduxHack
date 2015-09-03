import React from 'react';
import createPositionItem from './createPositionItem';
import cx from 'classnames';

/**
 * This component is overkill for this scenario, but I like this approach of wrapping
 * css modules into React Components. Makes it easier for other developers
 * to look up their settings and use them. Usually fits better when
 * encapsulating more complex layouts.
 *
 * -- Charlie Rudenstål
 */
class Position extends React.Component {
	render() {
		let { className, props } = this.props;
		return (
			<div {...props} className={cx('position', className)}>
				{this.props.children}
			</div>
		)
	}
}

Position.Left = createPositionItem('left');
Position.Right = createPositionItem('right');

export default Position;
