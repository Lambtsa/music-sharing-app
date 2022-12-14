import { MetaData } from "@components/MetaData";
import type { NextPage } from "next";
import { HomeScreen } from "@screens/home";
import { pageData } from "@helpers/metadata";

const IndexPage: NextPage = () => {
  const { index } = pageData;
  return (
    <>
      <MetaData
        title={index.title}
        description={index.description}
        url={index.url}
      />
      <HomeScreen />
    </>
  );
};

export default IndexPage;
