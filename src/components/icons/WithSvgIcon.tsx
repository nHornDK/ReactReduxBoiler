import React, { PureComponent } from 'react';

export type WithSvgIconProps = React.SVGProps<SVGSVGElement>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const WithSvgIcon = <P extends React.SVGProps<SVGSVGElement>>(WrappedSvgIcon: React.ComponentType<P>, defaultProps?: WithSvgIconProps): React.ComponentType<P & WithSvgIconProps> =>
	class extends PureComponent<P & WithSvgIconProps> {
		private defaultPropValues: WithSvgIconProps = {
			width: '24px',
			height: '24px',
			focusable: false,
			fill: '#757575',
			...defaultProps,
		};

		render(): JSX.Element {
			const { props, defaultPropValues } = this;
			const { ...svgProps } = {
				...defaultPropValues,
				...props,
				className: `nui-svg-icon ${props.className}`,
			};
			return <WrappedSvgIcon {...svgProps} />;
		}
	};

export default WithSvgIcon;
