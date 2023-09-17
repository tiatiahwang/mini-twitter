import Upload from '@/components/tweets/upload';

export default async function TweetUploadPage() {
  return (
    <div className='pt-4 px-4'>
      <h1 className='text-2xl md:text-4xl text-indigo-500 dark:text-gray-300 font-bold'>
        Upload Tweet
      </h1>
      <Upload />
    </div>
  );
}
