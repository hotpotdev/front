import clsx from 'clsx';

type ProjectSkeletonProps = React.HTMLAttributes<HTMLElement> & {

}

const ChartSkeleton = ({ ...attrs }: ProjectSkeletonProps) => {
    return (
        <div {...attrs} className={clsx('flex h-full justify-between items-end space-x-6 pr-6', attrs.className)}>
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
    )
};

export default ChartSkeleton;
