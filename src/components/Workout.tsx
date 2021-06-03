import { IWrk, IShow } from "../types";

interface IWrkProps {
  wrk: IWrk;
  handleShowMore: (id: number) => void;
  showMore: IShow;
}

const Workout = ({ wrk, handleShowMore, showMore }: IWrkProps) => (
  <tr onClick={() => handleShowMore(wrk.Id)}>
    <td>{wrk.Name}</td>
    <td>{wrk.Tss}</td>
    <td>{wrk.AverageFtpPercent}</td>
    {wrk.Zones.map((zn: string) => (
      <td>{zn}</td>
    ))}
    {showMore[wrk.Id] && (
      <>
        <td>{wrk.Description}</td>
        <td>{wrk.Duration}</td>
      </>
    )}
  </tr>
);

export default Workout;
