import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type TemplateProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{

}>;
// Template
const Template = ({ children, ...attrs }: TemplateProps) => {
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      {children}
    </div>
  );
};

export default Template;
