
-- Create a storage bucket for videos
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true);

-- Create policies to allow public access to the videos bucket
create policy "Videos are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'videos' );

create policy "Anyone can upload videos"
  on storage.objects for insert
  with check ( bucket_id = 'videos' );

create policy "Anyone can update their videos"
  on storage.objects for update
  using ( bucket_id = 'videos' );

create policy "Anyone can delete their videos"
  on storage.objects for delete
  using ( bucket_id = 'videos' );
