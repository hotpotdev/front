import type { PropsWithChildren } from 'react';

// TheDefaultLayout
const TheDefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full overflow-auto">
      {children}
    </div>
  );
};

export default TheDefaultLayout;
