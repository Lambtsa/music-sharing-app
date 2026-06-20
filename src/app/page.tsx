import type { Metadata } from "next";
import { ReactElement, use } from "react";

import { getUserGeolocation } from "@/hooks/user-data/utils";
import { HomeScreen } from "@/screens/home";
import { createMetadata, pageData } from "@/utils/metadata";

const { index } = pageData;

export const metadata: Metadata = createMetadata({
  title: index.title,
  description: index.description,
  url: index.url,
});

const Home = (): ReactElement => {

  const userData = use(getUserGeolocation());

  return <HomeScreen userData={userData} />;
};

export default Home;

