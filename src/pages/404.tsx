import { MetaData } from "@components/MetaData";
import { pageData } from "@helpers/metadata";
import { FourOhFour } from "@screens/fourOhFour";

const isProduction = process.env.NODE_ENV === "production";

/* TODO: make custom 404 page */
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
      <FourOhFour />
    </>
  );
};

export default Custom404;
