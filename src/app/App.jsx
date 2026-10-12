import React, { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { MobileHeader } from "./components/layout/MobileHeader";
import { BottomNav } from "./components/layout/BottomNav";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./pages/LandingPage";
import { SearchPage } from "./pages/student/SearchPage";
import { DetailsPage } from "./pages/student/DetailsPage";
import { StudentHome } from "./pages/student/StudentHome";
import { StudentProfile } from "./pages/student/StudentProfile";
import { PublicStudentProfile } from "./pages/student/PublicStudentProfile";
import { ApplicationsPage } from "./pages/student/ApplicationsPage";
import { CompanyPortal } from "./pages/company/CompanyPortal";
import { CareerResources } from "./pages/student/CareerResources";
import { AuthPage } from "./pages/AuthPage";
import { CompaniesPage } from "./pages/student/CompaniesPage";
import { ProfileSetupPage } from "./pages/ProfileSetupPage";
import { CompanyProfilePage } from "./pages/student/CompanyProfilePage";
import { SettingsPrivacyPage } from "./pages/student/SettingsPrivacyPage";
import { HelpPage } from "./pages/student/HelpPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ResumeBuilder } from "./pages/student/ResumeBuilder";
import { api, saveCsrfToken } from "./api";
import { Toaster } from "sonner";
const EMPTY_USER_INFO = { firstName: "", lastName: "", email: "" };
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function App() {
  const publicProfileId = new URLSearchParams(window.location.search).get("profile");
  const [userRole, setUserRoleState] = useState(() => loadFromStorage("id_role", null));
  const [sessionReady, setSessionReady] = useState(() => loadFromStorage("id_role", null) === null);
  const [userInfo, setUserInfoState] = useState(() => loadFromStorage("id_info", EMPTY_USER_INFO));
  const [view, setViewRaw] = useState(() => {
    if (new URLSearchParams(window.location.search).has("profile")) return "public-profile";
    const role = loadFromStorage("id_role", null);
    if (role === "student") return "student-home";
    if (role === "company") return "company-portal";
    return "landing";
  });
  const [authParams, setAuthParams] = useState({ mode: "login", role: "student" });
  const [portalSection, setPortalSection] = useState("dashboard");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const setView = (v) => {
    setViewRaw(v);
  };
  const setUserRole = (role) => {
    setUserRoleState(role);
    try {
      if (role) localStorage.setItem("id_role", JSON.stringify(role));
      else localStorage.removeItem("id_role");
    } catch {
    }
  };
  const setUserInfo = (info) => {
    setUserInfoState(info);
    try {
      localStorage.setItem("id_info", JSON.stringify(info));
    } catch {
    }
  };
  const logout = () => {
    api.logout().catch(() => {}).finally(() => saveCsrfToken(null));
    setUserRoleState(null);
    setUserInfoState(EMPTY_USER_INFO);
    setViewRaw("landing");
    try {
      localStorage.removeItem("id_role");
      localStorage.removeItem("id_info");
    } catch {
    }
  };
  const showFooter = view !== "company-portal" && view !== "auth" && view !== "profile-setup" && view !== "resume-builder";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);
  useEffect(() => {
    if (publicProfileId) { setSessionReady(true); return; }
    let active = true;
    api.me().then(({ user, profile }) => {
      if (!active) return;
      const nextUser = { ...userInfo, ...user, ...(profile || {}), profileComplete: Boolean(user.profileComplete) };
      setUserRoleState(user.role);
      setUserInfoState(nextUser);
      try { localStorage.setItem("id_role", JSON.stringify(user.role)); localStorage.setItem("id_info", JSON.stringify(nextUser)); } catch {}
    }).catch(() => {
      if (!active) return;
      setUserRoleState(null);
      setUserInfoState(EMPTY_USER_INFO);
      setViewRaw("landing");
      saveCsrfToken(null);
      try { localStorage.removeItem("id_role"); localStorage.removeItem("id_info"); } catch {}
    }).finally(() => { if (active) setSessionReady(true); });
    return () => { active = false; };
  }, []);
  if (!sessionReady) return null;
  return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen bg-background md:pb-0 ${userRole !== "company" ? "pb-[calc(68px+env(safe-area-inset-bottom))]" : ""}` }, view !== "auth" && view !== "profile-setup" && view !== "public-profile" && /* @__PURE__ */ React.createElement(MobileHeader, { setView, userRole, setAuthParams, portalSection, setPortalSection, userInfo, logout }), view !== "auth" && view !== "profile-setup" && view !== "public-profile" && /* @__PURE__ */ React.createElement(Navbar, { view, setView, userRole, setUserRole, setAuthParams, userInfo, logout }), view === "auth" && /* @__PURE__ */ React.createElement(AuthPage, { setView, setUserRole, setUserInfo, initialMode: authParams.mode, initialRole: authParams.role }), view === "profile-setup" && /* @__PURE__ */ React.createElement(ProfileSetupPage, { userRole, userInfo, setUserInfo, setView }), view === "public-profile" && /* @__PURE__ */ React.createElement(PublicStudentProfile, { id: publicProfileId }), view === "landing" && /* @__PURE__ */ React.createElement(LandingPage, { setView, setAuthParams }), view === "search" && /* @__PURE__ */ React.createElement(SearchPage, { setView, userRole, onSelectInternship: setSelectedInternship }), view === "details" && /* @__PURE__ */ React.createElement(DetailsPage, { setView, internship: selectedInternship, userInfo }), view === "student-home" && /* @__PURE__ */ React.createElement(StudentHome, { setView, userInfo, onSelectInternship: setSelectedInternship }), view === "profile" && /* @__PURE__ */ React.createElement(StudentProfile, { setView, userInfo }), view === "applications" && /* @__PURE__ */ React.createElement(ApplicationsPage, { setView, userInfo, onSelectInternship: setSelectedInternship }), view === "company-portal" && /* @__PURE__ */ React.createElement(CompanyPortal, { section: portalSection, setSection: setPortalSection, userInfo, logout }), view === "career-resources" && /* @__PURE__ */ React.createElement(CareerResources, { setView }), view === "companies" && /* @__PURE__ */ React.createElement(CompaniesPage, { setView, setSelectedCompany }), view === "company-profile" && selectedCompany && /* @__PURE__ */ React.createElement(CompanyProfilePage, { company: selectedCompany, setView, userInfo }), view === "settings-privacy" && /* @__PURE__ */ React.createElement(SettingsPrivacyPage, { setView, userInfo, logout }), view === "help" && /* @__PURE__ */ React.createElement(HelpPage, { setView }), view === "notifications" && React.createElement(NotificationsPage, { userRole }), view === "resume-builder" && /* @__PURE__ */ React.createElement(ResumeBuilder, { setView, userInfo }), showFooter && /* @__PURE__ */ React.createElement(Footer, { setView, setAuthParams, userRole }), showFooter && /* @__PURE__ */ React.createElement("div", { className: "md:hidden text-center py-3 text-xs text-muted-foreground bg-card border-t border-border" }, "Powered By SYNTIARO"), view !== "auth" && view !== "profile-setup" && view !== "public-profile" && /* @__PURE__ */ React.createElement(BottomNav, { view, setView, userRole, setAuthParams, logout }), React.createElement(Toaster, { position: "top-center", richColors: true }));
}
export {
  App as default
};
