import { css } from 'lit';

export const NARROW_WINDOW_THRESHOLD = 600;

export const narrowWindowThresholdCSS = css`${NARROW_WINDOW_THRESHOLD}px`;

export const panelCSS = css`
`; // TODO

export const cardCSS = css`
	background-color: var(--color-bg-card);
	border-radius: var(--corner-radius-card);
	margin: var(--padding-panel);
	padding: var(--padding-card);
`;
