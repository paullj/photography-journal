
CREATE TABLE public.images (
	id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	owner_id UUID NOT NULL,
	post_id UUID NOT NULL,
	width SMALLINT NOT NULL,
	height SMALLINT NOT NULL,
	post_order SMALLINT,
	caption VARCHAR(100) DEFAULT NULL,
	alt_text VARCHAR(100) DEFAULT NULL,
	camera_model VARCHAR(100) DEFAULT NULL,
	lens_model VARCHAR(100) DEFAULT NULL,
	iso_number SMALLINT DEFAULT NULL,
	f_stop REAL DEFAULT NULL,
	exposure_time REAL DEFAULT NULL,
	image_url VARCHAR NOT NULL,
	created_at timestamp NOT NULL DEFAULT NOW(),
	updated_at timestamp NOT NULL DEFAULT NOW(),
	deleted_at timestamp DEFAULT NULL,
	CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES public.users(id),
	CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES public.posts(id),
	PRIMARY KEY (id)
);

ALTER TABLE
	public.images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public images are viewable by everyone" ON images FOR
SELECT
	USING (TRUE);

CREATE POLICY "Users can insert images that they create" ON images FOR
INSERT
	WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update images they made" ON images FOR
UPDATE
	USING (auth.uid() = owner_id);

CREATE extension IF NOT EXISTS moddatetime schema extensions;

CREATE trigger handle_updated_at before
UPDATE
	ON images FOR each ROW EXECUTE PROCEDURE moddatetime (updated_at);