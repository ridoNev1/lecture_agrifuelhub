import { FC } from "react";

interface ILayoutComponent {
  children: React.ReactElement;
}

const Layout: FC<ILayoutComponent> = ({ children }) => {
  return (
    <div className="bg-slate-600 min-h-screen">
      <div className="max-w-[412px] mx-auto bg-white min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
