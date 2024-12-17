// import React from "react";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <div>Home</div>
      <div>{t("welcome")}</div>
    </div>
  );
}

export default Home;
