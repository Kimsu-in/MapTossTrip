import { Typography } from "@mui/material";
import styles from "./List.module.scss";

type ListProps = {
  destination: string;
};

const List: React.FC<ListProps> = ({ destination }) => {
  return (
    <div className={styles.wrapper}>
      {destination ? (
        <Typography className={styles.text}>{destination}</Typography>
      ) : (
        <Typography className={styles.text}>
          랜덤으로 국내 여행지를 정해보세요 !
        </Typography>
      )}
    </div>
  );
};

export default List;
