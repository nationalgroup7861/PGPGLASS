"use client";

import { GlassGptContext } from "@/app/context/GlassGptContext";
import { useAppContext } from "@/context/Context";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { useContext, useState } from "react";
import SingleRightPanel from "./HeaderProps/SingleRightPanel";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);

const ServiceRightDashboardSidebar = () => {
  const { shouldCollapseRightbar } = useAppContext();
  const { chatSessionList,GetCurrentsessionMessageList,currentChatSession, setCurrentChatSession,handleNewSessionClick } = useContext(GlassGptContext);

  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');
  const sevenDaysAgo = dayjs().subtract(7, 'day');
  const startOfMonth = dayjs().startOf('month');

  const monthlySessions = {};

  const groupedSessions = {
    today: [],
    yesterday: [],
    last7Days: [],
    thisMonth: []
  };

  chatSessionList.forEach(session => {
    const createdAt = dayjs(session.created_at);
    const month = createdAt.format('MMMM YYYY'); // Format as "Month Year"

    if (createdAt.isToday()) {
      groupedSessions.today.push(session);
    } else if (createdAt.isYesterday()) {
      groupedSessions.yesterday.push(session);
    } else if (createdAt.isBetween(sevenDaysAgo, today, 'day', '[]')) {
      groupedSessions.last7Days.push(session);
    } else if (createdAt.isBetween(startOfMonth, today, 'day', '[]')) {
      groupedSessions.thisMonth.push(session);
    }
    if (!monthlySessions[month]) {
      monthlySessions[month] = [];
    }
    monthlySessions[month].push(session);
  });

  const [sectionStates, setSectionStates] = useState({
    today: true,
    yesterday: true,
    last7Days: true,
    thisMonth: true,
    ...Object.keys(monthlySessions).reduce((acc, month) => {
      acc[month] = true;
      return acc;
    }, {})
  });

  const toggleSection = (section) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleCurrentChat = (currentChat) => {
    GetCurrentsessionMessageList(currentChat.session_key)
    setCurrentChatSession(currentChat)
    // setCurrentChatSession(currentChatSessionkey);
  };


  return (
    <div
      className={`rbt-right-side-panel popup-dashboardright-section ${shouldCollapseRightbar ? "collapsed" : ""
        }`}
    >
      {/* <div className="right-side-top">
        <a
          className="btn-default bg-solid-primary"
          data-bs-toggle="modal"
          data-bs-target="#newchatModal"
        >
          <span className="icon">
            <i className="feather-plus-circle"></i>
          </span>
          <span>New Chat</span>
        </a>
      </div> */}

      <div className="right-side-top">
        <a
          className="btn-default bg-solid-primary"
          onClick={handleNewSessionClick}
        >
          <span className="icon">
            <i className="feather-plus-circle"></i>
          </span>
          <span>New Chat</span>
        </a>
      </div>
      <div className="right-side-bottom">
        <div className="small-search search-section mb--20">
          <input type="search" placeholder="Search Here..." />
          <i className="feather-search"></i>
        </div>

        {Object.entries(groupedSessions).map(([key, sessions]) => (
          sessions.length > 0 && (
            <div
              className={`chat-history-section has-show-more ${!sectionStates[key] ? "active" : ""
                }`}
              key={key}
            >
              <h6 className="title">{key.replace(/([A-Z])/g, ' $1')}</h6>
              <ul className="chat-history-list has-show-more-inner-content">
                <SingleRightPanel 
                RightPanelData={sessions}                   
                handleCurrentChat={handleCurrentChat}
                />
              </ul>
              <div
                className={`rbt-show-more-btn ${!sectionStates[key] ? "active" : ""
                  }`}
                onClick={() => toggleSection(key)}
              >
                Show More
              </div>
            </div>
          )
        ))}

        {Object.entries(monthlySessions).map(([month, sessions]) => (
          sessions.length > 0 && (
            <div
              className={`chat-history-section has-show-more ${!sectionStates[month] ? "active" : ""
                }`}
              key={month}
            >
              <h6 className="title">{month}</h6>
              <ul className="chat-history-list has-show-more-inner-content">
                <SingleRightPanel
                  RightPanelData={sessions}
                  handleCurrentChat={handleCurrentChat}
                />
              </ul>
              <div
                className={`rbt-show-more-btn mb--100 ${!sectionStates[month] ? "active" : ""
                  }`}
                onClick={() => toggleSection(month)}
              >
                Show More
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ServiceRightDashboardSidebar;
