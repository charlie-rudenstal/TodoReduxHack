import React from 'react';
import cx from 'classnames';

export default function(position) {
	class PositionItem extends React.Component {
		static get propTypes() {
			return {
				verticalCenter: React.PropTypes.bool,
			}
		}

		render() {
			return (
				<div className={cx(
					'position-item',
					`position-item_${position}`,
					{'position-item_vcenter': this.props.verticalCenter}
				)}>
					{this.props.children}
				</div>
			)
		}
	}
	return PositionItem;
}
