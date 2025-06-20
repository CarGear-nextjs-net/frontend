// import { postS3PresignedUrl } from '@/generated/bff/s3/s3';

// export const uploadFileS3 = async (file: File): Promise<string> => {
//   const data = await postS3PresignedUrl({
//     file_name: file.name,
//   });

//   if (!data?.data.presigned_url || !data?.data.url) {
//     throw new Error('Invalid presigned URL response');
//   }

//   const response = await fetch(data.data.presigned_url, {
//     method: 'PUT',
//     body: file,
//     headers: { 'Content-Type': file.type },
//   });

//   if (!response.ok) {
//     throw new Error(`Upload failed: ${response.statusText}`);
//   }

//   return data.data.url;
// };
