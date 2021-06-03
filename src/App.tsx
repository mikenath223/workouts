import React, { useEffect, useState, useCallback } from "react";
import { getWorkoutIds, getWorkouts } from "./utils/request";
import Workout from "./components/Workout";
import { IWrkIds, IWrk, IShow } from "./types";

const App = () => {
  const [workouts, setWorkouts] = useState<IWrk[]>([]);
  const [showMore, setShowMore] = useState<IShow>({});

  const runPromises = useCallback(
    async (idArr: string[], next: number = 0, res: IWrk[]) => {
      let queryStr = idArr.slice(next, next + 10).join(",");
      setWorkouts(res);
      const retWorkouts: IWrk[] = await getWorkouts(queryStr);
      if (next < 100) {
        runPromises(idArr, next + 10, [...res, ...retWorkouts]);
      }
    },
    []
  );

  const fetchWorkouts = useCallback(async () => {
    try {
      const workout = await getWorkoutIds();
      const workouts = workout.slice(0, 101);
      const workoutIds = workouts.map((item: IWrkIds) => item.Id);
      runPromises(workoutIds, 0, []);
    } catch (error) {}
  }, [runPromises]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleShowMore = (id: number): void => {
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
            <Workout
              key={wrk.Id}
              wrk={wrk}
              showMore={showMore}
              handleShowMore={handleShowMore}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
