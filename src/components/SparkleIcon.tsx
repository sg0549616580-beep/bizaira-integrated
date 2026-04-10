interface SparkleIconProps {
  size?: number;
}

const SparkleIcon = ({ size = 20 }: SparkleIconProps) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "0.75rem",
      background: "linear-gradient(135deg, #f59e0b, #8b5cf6)",
      color: "white",
      fontSize: size * 0.7,
    }}
  >
    ✨
  </span>
);

export default SparkleIcon;
