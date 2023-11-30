import React from "react";

import { Watch } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className=" flex justify-center items-center min-h-screen bg-white dark:bg-slate-700">
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
