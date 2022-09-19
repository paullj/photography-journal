import { createContext } from 'react';
import type { PropsWithChildren } from 'react';

export const GridContext = createContext({
	columnWidth: 100,
	rowHeight: 100,
	gutter: 10,
});

export const GridContextProvider = ({ children, ...props }: PropsWithChildren<{ value: any }>) => (
	<GridContext.Provider {...props}>
		{children}
	</GridContext.Provider>
);
