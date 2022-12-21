import { MetaData } from "@components/MetaData";
import { pageData } from "@helpers/metadata";

const isProduction = process.env.NODE_ENV === "production";

/* Make custom 500 page */
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
      <p>500</p>
    </>
  );
};

export default Custom404;
