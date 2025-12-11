import './Statistics.css';

const Statistics = ({ technologies }: any) => {
  const statusCounts = technologies.reduce((acc: any, tech: any) => {
    acc[tech.status] = (acc[tech.status] || 0) + 1;
    return acc;
  }, {});

  const totalTechnologies = technologies.length;

  const completedCount = statusCounts['completed'] || 0;
  const inProgressCount = statusCounts['in-progress'] || 0;
  const notStartedCount = statusCounts['not-started'] || 0;

  const completionPercentage =
    totalTechnologies > 0
      ? Math.round(
          ((completedCount + inProgressCount * 0.5) / totalTechnologies) * 100
        )
      : 0;

  const progressBarWidth = totalTechnologies > 0 ? completionPercentage : 0;

  return (
    <>
      {totalTechnologies !== 0 && (
        <div className='statistics'>
          <div className='progress-section'>
            <div className='progress-header'>
              <span>Completion: {completionPercentage}%</span>
              <span>
                {completedCount + inProgressCount}/{totalTechnologies}{' '}
                technologies
              </span>
            </div>
            <div className='progress-bar'>
              <div
                className='progress-fill'
                style={{ width: `${progressBarWidth}%` }}
              ></div>
            </div>
          </div>

          <div className='status-stats'>
            <div className='stat-item completed'>
              <span className='stat-label'>
                Completed: <span className='stat-count'>{completedCount}</span>
              </span>
              <span className='stat-percentage'>
                (
                {totalTechnologies > 0
                  ? Math.round((completedCount / totalTechnologies) * 100)
                  : 0}
                %)
              </span>
            </div>

            <div className='stat-item in-progress'>
              <span className='stat-label'>
                In Progress:{' '}
                <span className='stat-count'>{inProgressCount}</span>
              </span>
              <span className='stat-percentage'>
                (
                {totalTechnologies > 0
                  ? Math.round((inProgressCount / totalTechnologies) * 100)
                  : 0}
                %)
              </span>
            </div>

            <div className='stat-item not-started'>
              <span className='stat-label'>
                Not Started:{' '}
                <span className='stat-count'>{notStartedCount}</span>
              </span>
              <span className='stat-percentage'>
                (
                {totalTechnologies > 0
                  ? Math.round((notStartedCount / totalTechnologies) * 100)
                  : 0}
                %)
              </span>
            </div>
          </div>

          <div className='distribution-chart'>
            <div className='chart-bars'>
              <div
                className='chart-bar completed'
                style={{
                  width: `${(completedCount / totalTechnologies) * 100}%`,
                }}
                title={`Completed: ${completedCount}`}
              ></div>
              <div
                className='chart-bar in-progress'
                style={{
                  width: `${(inProgressCount / totalTechnologies) * 100}%`,
                }}
                title={`In Progress: ${inProgressCount}`}
              ></div>
              <div
                className='chart-bar not-started'
                style={{
                  width: `${(notStartedCount / totalTechnologies) * 100}%`,
                }}
                title={`Not Started: ${notStartedCount}`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;
