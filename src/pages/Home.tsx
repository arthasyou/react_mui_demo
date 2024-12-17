// import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Demo from "@/components/Demo";

function Home() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <div>Home</div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeLanguage("en")}
          style={{ marginRight: "10px" }}
        >
          English
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeLanguage("zhCN")}
        >
          中文
        </Button>
        <Demo />
      </div>
    </div>
  );
}

export default Home;
