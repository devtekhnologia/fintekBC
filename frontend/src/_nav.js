import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilDescription,
  cilNotes,
  cilFace,
  cilDollar,
  cilSpeedometer,
  cilStar,
  cilReportSlash,
  cilMoney,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/agency",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Create Member",
    to: "/agency/createmember",
    icon: <CIcon icon={cilFace} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Master Data",
    to: "/agency/masterdatatable",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Payment",
    to: "/agency/payment",
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Receipt",
    to: "/agency/receipt",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Winner",
    to: "/agency/schememonthwinner",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Report Member",
    to: "/agency/tmreport",
    icon: <CIcon icon={cilReportSlash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Help",
    to: "/agency/e",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
