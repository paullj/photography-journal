import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	className?: string
}

type ButtonPropsWithChildren = PropsWithChildren<ButtonProps>;

const Button = forwardRef<HTMLButtonElement, ButtonPropsWithChildren>(
	function wrappedButton({ className, children, ...props }, ref) {
		const buttonClass = `flex items-center space-x-1 p-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md hover:text-black ${className}`;

		return (
			<button ref={ref} type="button" className={buttonClass} {...props}> {children}</button >
		);
	});
export default Button;