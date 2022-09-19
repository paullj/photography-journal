import { forwardRef } from 'react'

import type { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes, } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	id: string
	label: string
	placeholder: string
	type?: "url" | "text" | "email" | "password"
	className?: string
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
	function wrappedInput({ id, label, type = "text", placeholder, className, ...props }, ref) {
		return (
			<div className="relative">
				<label className="sr-only" htmlFor={id}>{label}</label>
				<input ref={ref} id={id} className={`block w-full py-1 border-0 outline-none ring-0 focus:border-0 focus:ring-0 ${className}`}
					type={type} placeholder={placeholder} autoComplete="off"
					{...props} />
			</div>
		)
	}
);

export default TextInput;