create or replace function public.handle_auth_user_sync()
returns trigger
language plpgsql
security definer set search_path = public
as $$begin
  insert into public."User" (id, email, "updatedAt")
  values (
    new.id, 
    new.email, 
    now() 
  )
  on conflict (id) do update
  set 
    email = excluded.email,
    "updatedAt" = now();
  return new;
end;$$;

drop trigger if exists on_auth_user_sync on auth.users;

create trigger on_auth_user_sync
  after insert or update of email on auth.users
  for each row execute procedure public.handle_auth_user_sync();