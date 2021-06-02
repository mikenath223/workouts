import React, { useEffect, useState, useCallback } from "react";
import { getWorkoutIds, getWorkouts } from "./utils/request";
import { IWrkIds, IWrk } from "./types";

interface IShow {
  [key: string]: boolean | string;
}

const App = () => {
  const [workouts, setWorkouts] = useState<IWrk[]>([]);
  const [showMore, setShowMore] = useState<IShow>({});

  const runPromises = useCallback(
    async (idArr: string[], next: number = 0, res: IWrk[]) => {
      let queryStr = idArr.slice(next, next + 10).join(",");
      const retWorkouts: IWrk[] = await getWorkouts(queryStr);
      if (next < 101) {
        console.log({ next, queryStr, res });
        runPromises(idArr, next + 10, [...res, ...retWorkouts]);
        setWorkouts(res);
      }
    },
    []
  );

  const fetchWorkouts = useCallback(async () => {
    try {
      const workout = await getWorkoutIds();
      const workouts = workout.slice(99);
      const workoutIds = workouts.map((item: IWrkIds) => item.Id);
      runPromises(workoutIds, 0, []);
    } catch (error) {}
  }, [runPromises]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleShowMore = (id: number) => {
    if (showMore[String(id)]) {
      return setShowMore({ ...showMore, [id]: false });
    }
    setShowMore({ ...showMore, [id]: true });
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>TSS</td>
            <td>average FTP%</td>
            <td>zones</td>
            <td>Description</td>
            <td>Duration</td>
          </tr>
        </thead>
        <tbody>
          {workouts.map((wrk: IWrk) => (
            <tr key={wrk.Id} onClick={() => handleShowMore(wrk.Id)}>
              <td>{wrk.Name}</td>
              <td>{wrk.Tss}</td>
              <td>{wrk.AverageFtpPercent}</td>
              {wrk.Zones.map((zn) => (
                <td>{zn}</td>
              ))}
              {showMore[wrk.Id] && (
                <>
                  <td>{wrk.Description}</td>
                  <td>{wrk.Duration}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
