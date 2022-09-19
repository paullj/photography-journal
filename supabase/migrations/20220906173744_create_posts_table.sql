DROP TABLE IF EXISTS public.posts CASCADE;

CREATE TYPE UPLOADSTATUS AS ENUM ('uploading', 'error', 'done');

CREATE TABLE public.posts (
	id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	author_id UUID NOT NULL,
	upload_status UPLOADSTATUS NOT NULL DEFAULT 'uploading',
	title VARCHAR(50) DEFAULT NULL,
	created_at timestamp NOT NULL DEFAULT NOW(),
	updated_at timestamp NOT NULL DEFAULT NOW(),
	deleted_at timestamp DEFAULT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES public.users(id)
);

ALTER TABLE
	public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public posts are viewable by everyone" ON posts FOR
SELECT
	USING (TRUE);

CREATE POLICY "Users can insert posts that they create" ON posts FOR
INSERT
	WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update posts they made" ON posts FOR
UPDATE
	USING (auth.uid() = author_id);

CREATE extension IF NOT EXISTS moddatetime schema extensions;

CREATE trigger handle_updated_at before
UPDATE
	ON posts FOR each ROW EXECUTE PROCEDURE moddatetime (updated_at);