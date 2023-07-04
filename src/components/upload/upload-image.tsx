import { ImageIcon, RandomIcon } from '@/assets';
import { FileToBase64 } from '@/libs/common/file';
import { RandomHash } from '@/libs/common/random';
import { GenerateGradientSVG, SVG2Base64, SVG2File } from '@/libs/common/svg';
import clsx from 'clsx';

import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';


type UploadImageProps = {
  maxSize?: number; // default 2MB
  required?: boolean;
  onChanged?: (file: File | undefined, fileData: string | undefined) => void;
  showRandom?: boolean;
} & React.HTMLAttributes<HTMLElement>;
// 上传图片
const UploadImage = ({
  required = true,
  maxSize = 2 * 1024 * 1024,
  onChanged,
  showRandom = false,
  ...attrs
}: UploadImageProps) => {
  const [url, setUrl] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setError(undefined);
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.includes('image')) {
        if (file.size > maxSize) {
          setError('File is over 2 MB.');
          return;
        }
        const result = (await FileToBase64(file)) as string;
        setUrl(result);
        onChanged?.(file, result);
      } else {
        setError('File not images.');
      }
    }
  };
  useEffect(() => {
    if (required && !url) {
      setError('Upload file.');
    } else {
      setError(undefined);
    }
  }, [required, url]);

  const clearFile = (e: MouseEvent) => {
    e.preventDefault();
    setUrl(undefined);
    onChanged?.(undefined, undefined);
  };
  const randomImage = useCallback(() => {
    setUrl(undefined);
    const randomHash = RandomHash(64);
    const svg = GenerateGradientSVG(randomHash, 100, 100)
    const file = SVG2File(svg)
    const data = SVG2Base64(svg)
    setUrl(data);
    onChanged?.(file, data);
  }, [onChanged])

  useEffect(() => {
    if (showRandom && !url && typeof window !== 'undefined') randomImage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomImage, showRandom])

  const UploadInput = () => {
    return (<div
      className={clsx(
        'w-full h-full cursor-pointer space-y-2 flex flex-col justify-center items-center rounded-xl border-2 border-dashed py-6',
        'hover:border-secondary hover:text-secondary',
        error && 'border-error text-error',
      )}
    >
      {!url && <input {...attrs} type="file" className="h-0 w-0" onChange={onChange} />}
      <ImageIcon className="w-12 h-12 fill-current" />
      {error ? <p className="text-xs">{error}</p> : <p className="text-xs">Max 10MB</p>}
    </div>
    )
  }
  const Preview = () => {
    return (
      <>
        <div className={clsx("w-full h-full overflow-scroll")}>
          <div className="relative left-0 top-0 w-full h-full rounded-full overflow-hidden">
            {url && <Image priority sizes="100vw" fill alt="upload image" src={url} className="relative object-cover" />}
          </div>
        </div>
        <button className="btn-error btn-xs btn-circle btn absolute -right-2 top-0" onClick={clearFile as any}>
          ×
        </button>
      </>
    )
  }

  return (
    <div className={clsx('relative',attrs.className)}>
      {url ? <Preview /> : <UploadInput />}
      {
        showRandom && <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            randomImage()
          }}
          className="btn btn-sm btn-circle absolute bottom-0 right-0 z-10 shadow-md"
        >
          <RandomIcon className="w-4 h-4 fill-current" />
        </button>
      }
    </div>
  );
};

export default UploadImage;
