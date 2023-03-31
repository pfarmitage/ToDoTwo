const DateList = () => {
  const sortedDates = dates.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {sortedDates.map((dateObj) => (
        <DateCard
          key={dateObj.id}
          date={dateObj.date}
          velocity={dateObj.velocity}
          totalPointsCompleted={dateObj.totalPointsCompleted}
          tasksCompleted={dateObj.tasksCompleted}
        />
      ))}
    </div>
  );
};
