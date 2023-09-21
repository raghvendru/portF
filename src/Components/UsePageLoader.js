import { useState } from "react";
import PageLoader from "./PageLoader";

const usePageLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <PageLoader /> : null,
    () => setLoading(true), //Show Loader
    () => setLoading(false), //Hide Loader
  ];
};

export default usePageLoader;
