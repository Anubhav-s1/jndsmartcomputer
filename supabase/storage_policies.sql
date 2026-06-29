-- Allow anyone to VIEW images in the product-images bucket (needed so
-- photos actually display on the public storefront).
create policy "public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Allow only logged-in admins to upload/replace/delete images.
create policy "admins can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "admins can update product images"
  on storage.objects for update
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "admins can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');
