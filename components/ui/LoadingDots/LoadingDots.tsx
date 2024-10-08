import s from "./loadingDots.module.css";

const LoadingDots: React.FC = () => {
  return (
    <span className={s.root}>
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
