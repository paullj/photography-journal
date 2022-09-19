DROP FUNCTION IF EXISTS public.create_profile_for_new_user() CASCADE;

-- inserts a row into public.users
CREATE FUNCTION public.create_profile_for_new_user() RETURNS trigger AS $$ BEGIN
INSERT INTO
	public.users (id)
VALUES
	(NEW.id);

RETURN NEW;

END;

$$ LANGUAGE plpgsql SECURITY DEFINER
SET
	search_path = public;

-- trigger the function every time a user is created
CREATE TRIGGER create_profile_on_signup
AFTER
INSERT
	ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.create_profile_for_new_user();