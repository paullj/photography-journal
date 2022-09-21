import type { PropsWithChildren, ReactElement } from 'react';
import styles from '../../../styles/grid.module.css';

interface GridProps {
	children: (ReactElement)[];
}

const GridItem = ({ children }: PropsWithChildren) => {
	return (
		<div className={styles.item}>
			{children}
		</div>
	);
};

const Grid = ({ children }: PropsWithChildren<GridProps>) => {
	return (
		<div className='max-w-screen-xl mx-auto'>
			<div className='flex sm:h-[5000px] flex-col sm:flex-wrap sm:content-between sm:before:basis-full sm:after:basis-full sm:before:w-0 sm:before:order-2 sm:after:order-2 sm:after:content-[" "] sm:before:content-[" "]'>
				{children.map((child, i) => (
					<GridItem key={i}>
						{child}
					</GridItem>
				))}
			</div>
		</div>
	);
};

export default Grid;