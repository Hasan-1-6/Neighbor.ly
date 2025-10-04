const AnimatedBackground = () => {
  return (
    <>
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="bubble" />
      ))}
    </>
  );
};

export default AnimatedBackground;