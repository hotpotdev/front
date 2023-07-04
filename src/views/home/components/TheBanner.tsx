import type { LocaleLinkProps } from '@/components/locale-link';
import LocaleLink from '@/components/locale-link';

export type TheBannerProps = {
  item: {
    title: string;
    subtitle: string;
    text: string;
    create: { text: string } & LocaleLinkProps;
  };
};

const TheBanner = ({ item: { title, subtitle, text, create } }: TheBannerProps) => {
  return (
    <>
      <div className="space-y-12 container pt-20">
        <div className="space-y-4 md:space-y-6 mx-auto w-full max-w-[80.5rem]">
          <div className="font-bold text-3xl lg:text-5xl w-full space-y-12">
            <div className="flex">
              <h2 className="flex-1 text-right">{title}</h2>
              <div className="flex-1"></div>
            </div>
            <div className="flex">
              <div className="flex-1"></div>
              <h2 className="flex-1 text-left">{subtitle}</h2>
            </div>
          </div>
          <p
            className="leading-6 break-words font-medium text-right"
            dangerouslySetInnerHTML={{ __html: text }}
          ></p>
        </div>
        <div className="flex justify-center">
          <LocaleLink href={create ? create.href : ''} className="btn btn-primary normal-case btn-outline w-full max-w-xs">
            {create ? create.text : ''}
          </LocaleLink>
        </div>
      </div>
    </>
  );
};

export default TheBanner;
