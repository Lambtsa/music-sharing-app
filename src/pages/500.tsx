import { MetaData } from "@components/MetaData";
import URL from "@constants/url";

const Custom404 = () => {
  return (
    <>
      <MetaData
        title="Charlie's Closet | Habillez votre enfant sans déshabiller la planète"
        description="Habillez votre enfant sans déshabiller la planète"
        url={URL.PROD}
      />
      <p>500</p>
    </>
  );
};

export default Custom404;
