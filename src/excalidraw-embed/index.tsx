import React, { useEffect } from "react";

import { InitializeApp } from "../components/InitializeApp";
import App from "../components/App";

import "../css/app.scss";
import "../css/styles.scss";

import { ExcalidrawProps } from "../types";
import { IsMobileProvider } from "../is-mobile";

const Excalidraw = React.memo(
  (props: ExcalidrawProps) => {
    const {
      width,
      height,
      onChange,
      initialData,
      user,
      onUsernameChange,
    } = props;

    useEffect(() => {
      // Block pinch-zooming on iOS outside of the content area
      const handleTouchMove = (event: TouchEvent) => {
        // @ts-ignore
        if (typeof event.scale === "number" && event.scale !== 1) {
          event.preventDefault();
        }
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });

      return () => {
        document.removeEventListener("touchmove", handleTouchMove);
      };
    }, []);

    return (
      <InitializeApp>
        <IsMobileProvider>
          <App
            width={width}
            height={height}
            onChange={onChange}
            initialData={initialData}
            user={user}
            onUsernameChange={onUsernameChange}
          />
        </IsMobileProvider>
      </InitializeApp>
    );
  },
  (prevProps: ExcalidrawProps, nextProps: ExcalidrawProps) => {
    const { initialData: prevInitialData, user: prevUser, ...prev } = prevProps;
    const { initialData: nextInitialData, user: nextUser, ...next } = nextProps;

    const prevKeys = Object.keys(prevProps) as (keyof typeof prev)[];
    const nextKeys = Object.keys(nextProps) as (keyof typeof next)[];

    return (
      prevUser?.name === nextUser?.name &&
      prevKeys.length === nextKeys.length &&
      prevKeys.every((key) => prev[key] === next[key])
    );
  },
);

export default Excalidraw;
