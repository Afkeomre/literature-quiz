const Layout = ({ children, sectionClass, containerClass, contentClass }) => {
  return (
    <section className={`section ${sectionClass}`}>
      <div className={`container ${containerClass}`}>
        <div className={`content ${contentClass}`}>{children}</div>
      </div>
    </section>
  );
};

export default Layout;
