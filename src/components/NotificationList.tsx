import React from 'react';

type Props = {
	title: string;
	description: string;
};
export function NotificationList(props: Props) {
	return (
		<div>
			<h2>{props.title}</h2>
			<h4>{props.description}</h4>
		</div>
	);
}
