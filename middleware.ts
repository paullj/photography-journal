import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@supabase/auth-helpers-shared";

import type { NextMiddleware, NextRequest } from "next/server";

const createMiddlewareSupabaseClient = (
	request: NextRequest,
	response: NextResponse
) => {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	) {
		throw new Error(
			"NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are required!"
		);
	}

	return createServerSupabaseClient({
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		getRequestHeader: (key) => request.headers.get(key) ?? undefined,
		getResponseHeader: (key) => response.headers.get(key) ?? undefined,
		setHeader: (key, value) => {
			if (Array.isArray(value)) {
				value.forEach((v) => response.headers.append(key, v));
			} else {
				response.headers.set(key, value);
			}
		},
	});
};

const PUBLIC_FILE = /\.(.*)$/;

export const middleware: NextMiddleware = async (request) => {
	const response = NextResponse.next();

	const { pathname } = request.nextUrl;
	if (
		pathname.startsWith("/welcome") ||
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/static") ||
		PUBLIC_FILE.test(pathname)
	) {
		return response;
	}

	const supabase = createMiddlewareSupabaseClient(request, response);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const id = session?.user.id;
	if (id) {
		const { data: userProfile, error } = await supabase
			.from("users")
			.select("name")
			.eq("id", id)
			.maybeSingle();

		if (!userProfile?.name) {
			const redirectUrl = request.nextUrl.clone();
			redirectUrl.pathname = "/welcome";

			return NextResponse.redirect(redirectUrl);
		}
	}

	return response;
};

export const config = {
	matcher: ["/((?!api|_next|static|welcome|[\\w-]+\\.\\w+).*)"],
};
