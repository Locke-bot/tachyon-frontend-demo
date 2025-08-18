// src/WebSocketProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLastMessage, setNewMessage } from 'store/slices/webSocket';
import useWebSocket from 'react-use-websocket';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { refreshToken } from "contexts/JWTContext";
import { DOC_WS_API } from 'api';

const WebSocketContext = createContext(null);

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("");
  const [socketUrl, setSocketUrl] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");
      if (access && refresh) {
        const user = jwt_decode(access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (isExpired) {
          refreshToken().then((newAccess) => {
            setAccessToken(newAccess);
          });          
        } else {
          setAccessToken(access);
        }
      }
    };

    fetchToken().then(() => setIsInitialized(true));
  }, []);

  useEffect(() => {
    if (accessToken) {
      setSocketUrl(`${DOC_WS_API}?token=${accessToken}`);
    }
  }, [accessToken]);

  const { lastMessage, sendMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true, // Auto reconnect on close
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    onOpen: () => {
      console.log('WebSocket connection established');
      // dispatch(setCurrentChat([['summary']]));
      // sendMessage(
      //   JSON.stringify({
      //     action: "doc",
      //     question: "summary",
      //     history: "",
      //     token: accessToken,
      //     fileId: '58967353-8d0b-4aef-a0c2-3219554079d4',
      //   })
      // );
    },
    onClose: () => console.log('WebSocket connection closed'),
  });
  
  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     console.log(lastMessage)
  //     // const receivedTime = new Date();
  //     // console.log('Message received:', lastMessage.data, 'at', receivedTime);
  //     // dispatch(setLastMessage(lastMessage));
  //   }
  // }, [lastMessage, dispatch]);

  useEffect(() => {
    if (lastMessage !== null) {
      if (JSON.parse(lastMessage?.data)?.message === "token") {
        // setAnswer((answer) => answer + JSON.parse(lastMessage?.data)?.token);
        // console.log(JSON.parse(lastMessage?.data)?.token);
        // dispatch(setNewMessage(JSON.parse(lastMessage?.data)?.token))
        dispatch(setLastMessage(lastMessage))
        // dispatch(setAnswer(answer + JSON.parse(lastMessage?.data)?.token));
      }
    }
  }, [lastMessage]);

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
      {isInitialized ? children : <div>Loading...</div>}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;