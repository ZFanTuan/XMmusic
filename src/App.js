import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useRoutes } from "react-router";
import routes from "./routers/index";
import AppStyle from "./App.module.less";
import imgc from "./pictures/topbar.png";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function App() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const naviget = useNavigate();
  const handleRoute = (path, index) => {
    naviget(path);
    setCurrentIndex(index);
  };

  function getRoutes(routes) {
    return routes.map((item) => {
      return (
        <Route path={item.path} element={item.element} key={item.path}>
          {item.children && item.children.length && getRoutes(item.children)}
        </Route>
      );
    });
  }
  return (
    <div className={AppStyle.app}>
      <div className={AppStyle.appHeader}>
        <div className={AppStyle.content}>
          <div className={AppStyle.icon}></div>
          <div className={AppStyle.nav}>
            {routes.map((item, index) => {
              if (item.notShow) {
                return null;
              }
              return (
                <div
                  className={AppStyle.routeItem}
                  key={item.path}
                  onClick={(e) => handleRoute(item.path, index)}
                  style={
                    currentIndex == index
                      ? {
                          backgroundColor: "#000000",
                          backgroundImage: `url(${imgc})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPositionX: "-256px",
                          backgroundPositionY: "-123px",
                          backgroundSize: "320px",
                        }
                      : {}
                  }
                >
                  <span
                    style={currentIndex == index ? { color: "#ffffff" } : {}}
                  >
                    {item.title}
                  </span>
                </div>
              );
            })}
            <a href="#" className={AppStyle.routeItem}>
              商城
            </a>
            <a href="#" className={AppStyle.routeItem}>
              音乐人
            </a>
            <a href="#" className={AppStyle.routeItem}>
              下载客户端
            </a>
          </div>
          <div className={AppStyle.search}>
            <Input
              placeholder="音乐/用户/歌手"
              prefix={<SearchOutlined />}
              size="small"
              style={{ borderRadius: "20px", width: "150px", fontSize: "14px" }}
            />
          </div>
          <div style={{ lineHeight: "70px" }}>
            <Button className={AppStyle.btn}>创作者中心</Button>
          </div>
          <div className={AppStyle.login}>
            <a href="#">登录</a>
          </div>
        </div>
      </div>
      <Routes>{getRoutes(routes)}</Routes>
    </div>
  );
}

export default App;
