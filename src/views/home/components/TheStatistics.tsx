export type TheStatisticsProps = {
  items: { title: string; text: string }[];
};

const TheStatistics = ({ items }: TheStatisticsProps) => {
  return (
    <div className="flex flex-col space-y-12 md:flex-row md:space-y-0">
      {items && items.length > 0 && typeof items === 'object'
        ? items.map(item => {
            return (
              <div key={item.title} className="space-y-3 flex-1 text-center">
                <h3 className="font-bold text-primary text-4xl">{item.title}</h3>
                <p className="text-xl">{item.text}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default TheStatistics;
