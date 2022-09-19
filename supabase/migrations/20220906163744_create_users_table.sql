DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
	id UUID REFERENCES auth.users NOT NULL,
	username VARCHAR(32) UNIQUE NOT NULL DEFAULT substr(md5(random() :: text), 0, 16),
	name VARCHAR DEFAULT NULL,
	loggedIn BOOLEAN DEFAULT false,
	created_at timestamp WITH time zone DEFAULT timezone('utc' :: text, NOW()) NOT NULL,
	updated_at timestamp WITH time zone DEFAULT timezone('utc' :: text, NOW()) NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE
	public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON users FOR
SELECT
	USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON users FOR
INSERT
	WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON users FOR
UPDATE
	USING (auth.uid() = id);

CREATE extension IF NOT EXISTS moddatetime schema extensions;

CREATE trigger handle_updated_at before
UPDATE
	ON users FOR each ROW EXECUTE PROCEDURE moddatetime (updated_at);