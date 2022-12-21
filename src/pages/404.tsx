import { MetaData } from "@components/MetaData";
import { pageData } from "@helpers/metadata";

const isProduction = process.env.NODE_ENV === "production";

const Custom404 = () => {
  const { index } = pageData;
  return (
    <>
      <MetaData
        title={index.title}
        description={index.description}
        url={index.url}
        production={isProduction}
      />
      <p>404</p>
    </>
  );
};

export default Custom404;
