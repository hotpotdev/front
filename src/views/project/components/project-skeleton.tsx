import clsx from 'clsx';

type ProjectSkeletonProps = React.HTMLAttributes<HTMLElement> & {

}

const ProjectSkeleton = ({ ...attrs }: ProjectSkeletonProps) => {
  return (
    <div {...attrs} className={clsx("mx-auto w-full max-w-screen-lg lg:my-16 space-y-8 animate-twPulse", attrs.className)}>
      <div className="flex space-x-4">
        <div className="rounded-full bg-base-300 h-20 w-20"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-2 bg-base-300 rounded w-20"></div>
          <div className="h-2 bg-base-300 rounded w-40"></div>
          <div className="flex space-x-2">
            <div className="h-5 bg-base-300 rounded w-20"></div>
            <div className="h-5 bg-base-300 rounded w-20"></div>
          </div>
          <div className="h-2 bg-base-300 rounded w-1/3"></div>
          <div className="h-2 bg-base-300 rounded w-1/3"></div>
          <div className="h-2 bg-base-300 rounded w-1/3"></div>
        </div>
      </div>
      <div>
        <div className="h-2 bg-base-300 rounded w-1/3"></div>
      </div>
      <div className="flex space-x-8">
        <div className="space-y-4 flex-1">
          <div className="h-2 bg-base-300 rounded w-full"></div>
          <div className="h-2 bg-base-300 rounded w-full"></div>
          <div className="h-2 bg-base-300 rounded w-full"></div>
          <div className="h-2 bg-base-300 rounded w-full"></div>
          <div className="h-2 bg-base-300 rounded w-full"></div>
        </div>
        <div className="flex-1">
          <div className="flex h-full justify-between items-end space-x-6 pr-6">
            <div className="w-1 h-full bg-base-300"></div>
            <div className="w-1/12 h-1/2 bg-base-300"></div>
            <div className="w-1/12 h-1/3 bg-base-300"></div>
            <div className="w-1/12 h-1/4 bg-base-300"></div>
            <div className="w-1/12 h-1/5 bg-base-300"></div>
            <div className="w-1/12 h-1/6 bg-base-300"></div>
            <div className="w-1/12 h-1/2 bg-base-300"></div>
            <div className="w-1/12 h-1/3 bg-base-300"></div>
            <div className="w-1/12 h-1/4 bg-base-300"></div>
            <div className="w-1/12 h-1/5 bg-base-300"></div>
            <div className="w-1/12 h-1/6 bg-base-300"></div>
            <div className="w-1/12 h-1/2 bg-base-300"></div>
            <div className="w-1/12 h-1/3 bg-base-300"></div>
          </div>
          <div className="h-1 bg-base-300 w-full"></div>
        </div>
      </div>
      <div>
        <div className="flex space-x-4 items-center justify-between py-2 pl-4 pr-10">
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-2/12"></div>
          <div className="bg-base-300 h-4 w-2/12"></div>
        </div>
        <div className="flex space-x-4 items-center justify-between py-2 pl-4 pr-10">
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-2/12"></div>
          <div className="bg-base-300 h-4 w-2/12"></div>
        </div>
        <div className="flex space-x-4 items-center justify-between py-2 pl-4 pr-10">
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-1/12"></div>
          <div className="bg-base-300 h-4 w-2/12"></div>
          <div className="bg-base-300 h-4 w-2/12"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;
