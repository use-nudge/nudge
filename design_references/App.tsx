import { useMemo, useState } from "react";

type Screen =
  | "welcome" | "login" | "register" | "courses" | "join-course" | "create-course" | "course-created"
  | "student-course" | "staff-course" | "course-settings" | "topics" | "members" | "schedule" | "session" | "join-queue"
  | "queue" | "paused" | "helper-ready" | "my-sessions" | "staff-queue" | "request"
  | "reassign" | "announcements" | "session-settings" | "feedback" | "thanks" | "analytics"
  | "settings" | "account" | "notifications" | "design-system" | "checklist" | "stretch";

type IconName = "back" | "book" | "calendar" | "settings" | "bell" | "chevron" | "plus" | "people" | "clock" | "pin" | "copy" | "check" | "x" | "pause" | "play" | "megaphone" | "chart" | "lock" | "eye" | "more" | "person" | "arrow" | "spark" | "shield";

const paths: Record<IconName, React.ReactNode> = {
  back: <path d="m15 18-6-6 6-6"/>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
  calendar: <><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63 1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9c.13.62.61 1.1 1.24 1H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>, plus: <path d="M12 5v14M5 12h14"/>,
  people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  copy: <><rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  check: <path d="m5 12 4 4L19 6"/>, x: <path d="m6 6 12 12M18 6 6 18"/>,
  pause: <><rect width="4" height="14" x="6" y="5" rx="1"/><rect width="4" height="14" x="14" y="5" rx="1"/></>,
  play: <path d="m8 5 11 7-11 7Z"/>,
  megaphone: <><path d="m3 11 18-5v12L3 14v-3Z"/><path d="m11.6 16.1.8 3.2a2 2 0 0 1-3.9 1L7.2 15"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  lock: <><rect width="16" height="12" x="4" y="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  person: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  spark: <path d="m12 3 1.4 4.4L18 9l-4.6 1.6L12 15l-1.4-4.4L6 9l4.6-1.6L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/>,
  shield: <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const screenGroups: { label: string; milestone: string; screens: [Screen, string][] }[] = [
  { label: "Access & account", milestone: "Alpha", screens: [["welcome","Welcome"],["login","Log In"],["register","Create Account"],["account","Account Editing"]] },
  { label: "Courses", milestone: "Alpha", screens: [["courses","Courses Dashboard"],["join-course","Join Course"],["create-course","Create Course"],["course-created","Course Created"],["student-course","Course — Student"],["staff-course","Course — Staff"],["course-settings","Course Settings"],["topics","Manage Topics"],["members","Members & Roles"]] },
  { label: "Student queue", milestone: "Beta", screens: [["session","Session Details"],["join-queue","Join Queue"],["queue","My Queue Status"],["helper-ready","Helper Ready"],["my-sessions","My Sessions"]] },
  { label: "Staff operations", milestone: "Beta", screens: [["schedule","Schedule Office Hours"],["staff-queue","Live Queue Dashboard"],["request","Request Detail"],["reassign","Reassign Helper"],["announcements","Announcements"],["session-settings","Session Management"]] },
  { label: "Feedback & absence", milestone: "Final", screens: [["paused","Paused Queue State"],["feedback","Anonymous Feedback"],["thanks","Feedback Thanks"],["analytics","Feedback & Analytics"]] },
  { label: "Product", milestone: "Final", screens: [["settings","General Settings"],["notifications","Notifications"],["design-system","Design System"],["checklist","Feature Checklist"]] },
  { label: "Optional", milestone: "Stretch", screens: [["stretch","Stretch — Optional"]] },
];

const screenTitles = Object.fromEntries(screenGroups.flatMap(group => group.screens)) as Record<Screen, string>;

const boardGroups: { label: string; description: string; screens: { key: Screen; caption: string }[] }[] = [
  {
    label: "Authentication",
    description: "Account access, registration, validation, and onboarding.",
    screens: [
      { key: "welcome", caption: "Introduces Nudge and begins account access." },
      { key: "login", caption: "School email login with validation and recovery." },
      { key: "register", caption: "Creates an account and records participation preference." },
    ],
  },
  {
    label: "Student screens",
    description: "Course discovery, office-hours participation, queue progress, and feedback.",
    screens: [
      { key: "courses", caption: "Shows joined courses and active queue activity." },
      { key: "join-course", caption: "Previews and joins a private course space." },
      { key: "student-course", caption: "Lists open, upcoming, and completed sessions." },
      { key: "session", caption: "Explains an office-hours session before joining." },
      { key: "join-queue", caption: "Submits a private question and topic." },
      { key: "queue", caption: "Waiting state with position and private request details." },
      { key: "paused", caption: "Temporary-absence state with a resume countdown." },
      { key: "helper-ready", caption: "Turn reminder and helper-ready notification state." },
      { key: "my-sessions", caption: "Collects active, upcoming, and past sessions." },
      { key: "feedback", caption: "Collects anonymous post-session feedback." },
      { key: "thanks", caption: "Confirms completed anonymous feedback." },
    ],
  },
  {
    label: "Staff screens",
    description: "Scheduling, live queue coordination, announcements, and outcomes.",
    screens: [
      { key: "staff-course", caption: "Organizes active and scheduled staff sessions." },
      { key: "course-settings", caption: "Edits the course code, topics, and member access." },
      { key: "topics", caption: "Creates and manages reusable question topics." },
      { key: "schedule", caption: "Schedules or immediately opens office hours." },
      { key: "staff-queue", caption: "Coordinates a live, multi-helper queue." },
      { key: "request", caption: "Reviews, claims, and resolves one student request." },
      { key: "reassign", caption: "Moves a claimed request to another helper." },
      { key: "announcements", caption: "Broadcasts a session-wide location update." },
      { key: "session-settings", caption: "Edits session details and controls closure." },
      { key: "analytics", caption: "Summarizes anonymous feedback and topic demand." },
    ],
  },
  {
    label: "Course creator screens",
    description: "Course creation, private access, membership, and role permissions.",
    screens: [
      { key: "create-course", caption: "Creates a new private course space." },
      { key: "course-created", caption: "Shares the private code after creation." },
      { key: "members", caption: "Assigns Student and Course Staff roles." },
    ],
  },
  {
    label: "Settings",
    description: "Personal preferences, account details, system guidance, and documentation.",
    screens: [
      { key: "settings", caption: "Edits appearance and notification behavior." },
      { key: "notifications", caption: "Shows the complete notification history." },
      { key: "account", caption: "Updates identity, email, and password." },
      { key: "design-system", caption: "Documents reusable visual foundations." },
      { key: "checklist", caption: "Maps proposal requirements to named screens." },
    ],
  },
  {
    label: "Optional stretch features",
    description: "Future concepts intentionally separated from the core experience.",
    screens: [
      { key: "stretch", caption: "Collects all optional post-submission concepts." },
    ],
  },
];

function Button({ children, onClick, kind = "primary", icon, disabled }: { children: React.ReactNode; onClick?: () => void; kind?: "primary"|"secondary"|"plain"|"danger"; icon?: IconName; disabled?: boolean }) {
  return <button className={`btn btn-${kind}`} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size={18}/>}<span>{children}</span></button>;
}

function Badge({ children, tone = "indigo" }: { children: React.ReactNode; tone?: "indigo"|"green"|"amber"|"gray"|"red" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Field({ label, value, placeholder, error, type = "text", trailing }: { label: string; value?: string; placeholder?: string; error?: string; type?: string; trailing?: React.ReactNode }) {
  return <label className="field"><span>{label}</span><div className={`field-shell ${error ? "field-error" : ""}`}><input type={type} defaultValue={value} placeholder={placeholder}/>{trailing}</div>{error && <small>{error}</small>}</label>;
}

function NavBar({ title, back, action }: { title: string; back?: () => void; action?: React.ReactNode }) {
  return <div className="nav-bar">{back ? <button className="icon-btn" onClick={back} aria-label="Go back"><Icon name="back"/></button> : <span className="nav-spacer"/>}<strong>{title}</strong><div className="nav-action">{action}</div></div>;
}

function Meta({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return <div className="meta"><Icon name={icon} size={16}/><span>{children}</span></div>;
}

function SessionCard({ onClick, closed = false, scheduled = false }: { onClick?: () => void; closed?: boolean; scheduled?: boolean }) {
  return <button className="card session-card" onClick={onClick}>
    <div className="card-top"><div><small className="eyebrow">{scheduled ? "Tomorrow" : "Happening now"}</small><h3>iOS Project Help</h3></div><Badge tone={closed ? "gray" : scheduled ? "indigo" : "green"}>{closed ? "Closed" : scheduled ? "Scheduled" : "Open"}</Badge></div>
    <p>Get help with Project 3, Auto Layout, and table view data sources.</p>
    <div className="meta-grid"><Meta icon="clock">{scheduled ? "Tue, 3:00–5:00 PM" : "Until 5:00 PM"}</Meta><Meta icon="pin">GDC 2.210</Meta><Meta icon="people">Maya + 2 helpers</Meta><Meta icon="person">{closed ? "18 resolved" : "6 in queue"}</Meta></div>
  </button>;
}

function Announcement() {
  return <div className="announcement"><span className="announcement-icon"><Icon name="megaphone" size={18}/></span><div><strong>Location update</strong><p>Office hours have moved to GDC 2.210.</p><small>Posted by Maya Chen · 2:42 PM</small></div></div>;
}

function BottomTabs({ active, go }: { active: "courses"|"sessions"|"settings"; go: (s: Screen) => void }) {
  return <div className="tab-bar">
    <button className={active === "courses" ? "active" : ""} onClick={() => go("courses")}><Icon name="book"/><span>Courses</span></button>
    <button className={active === "sessions" ? "active" : ""} onClick={() => go("my-sessions")}><Icon name="calendar"/><span>My Sessions</span></button>
    <button className={active === "settings" ? "active" : ""} onClick={() => go("settings")}><Icon name="settings"/><span>Settings</span></button>
  </div>;
}

function ScreenBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`screen-body ${className}`}>{children}</div>;
}

function Choice({ label, sub, selected, onClick }: { label: string; sub?: string; selected?: boolean; onClick?: () => void }) {
  return <button className={`choice ${selected ? "selected" : ""}`} onClick={onClick}><span><strong>{label}</strong>{sub && <small>{sub}</small>}</span><span className="radio">{selected && <span/>}</span></button>;
}

function Toggle({ on, setOn }: { on: boolean; setOn: (value: boolean) => void }) {
  return <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)} aria-label={on ? "Turn off" : "Turn on"}><span/></button>;
}

function SettingRow({ icon, title, value, onClick, tail }: { icon?: IconName; title: string; value?: string; onClick?: () => void; tail?: React.ReactNode }) {
  const content = <>{icon && <span className="setting-icon"><Icon name={icon} size={18}/></span>}<span className="setting-label">{title}</span>{value && <span className="setting-value">{value}</span>}{tail || (onClick && <Icon name="chevron" size={17}/>)}</>;
  if (tail) return <div className="setting-row">{content}</div>;
  return <button className="setting-row" onClick={onClick}>{content}</button>;
}

function QueueRow({ name, topic, status, claimed, onClick }: { name: string; topic: string; status: string; claimed?: string; onClick?: () => void }) {
  return <button className="queue-row" onClick={onClick}><span className="avatar">{name.split(" ").map(n => n[0]).join("")}</span><span className="queue-main"><strong>{name}</strong><span>{topic} · {status}</span>{claimed && <small>{claimed}</small>}</span><Icon name="chevron" size={17}/></button>;
}

function NotificationCard({ title, detail, time, onClick }: { title: string; detail: string; time: string; onClick?: () => void }) {
  return <button className="notification-card" onClick={onClick}><span className="notification-icon"><Icon name="bell" size={17}/></span><span><strong>{title}</strong><small>{detail}</small><i>{time}</i></span><Icon name="chevron" size={16}/></button>;
}

function AppScreen({ screen, go, appearance, setAppearance }: { screen: Screen; go: (screen: Screen) => void; appearance: string; setAppearance: (v: string) => void }) {
  const [reminders, setReminders] = useState(true);
  const [threshold, setThreshold] = useState("3");
  const [copied, setCopied] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [thresholdOpen, setThresholdOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [memberRole, setMemberRole] = useState("Student");
  const [savedMemberRole, setSavedMemberRole] = useState("Student");
  const [topics, setTopics] = useState(["Auto Layout", "Delegation", "Table Views", "Debugging"]);
  const [topicDraft, setTopicDraft] = useState("");
  const [courseCode, setCourseCode] = useState("CS 314");
  const [kickConfirm, setKickConfirm] = useState(false);
  const [studentKicked, setStudentKicked] = useState(false);
  const back = () => go("courses");

  if (screen === "welcome") return <div className="welcome-screen">
    <div className="status-space"/><div className="brand-mark"><span/><span/><span/></div>
    <div className="welcome-copy"><Badge>Nudge for iOS</Badge><h1>Office hours,<br/>without the guesswork.</h1><p>Join your course queue, stay on track, and get a nudge when it’s almost your turn.</p></div>
    <div className="welcome-art"><div className="mini-card back-card"><span>CS 371p</span><Badge tone="green">Open</Badge></div><div className="mini-card front-card"><small>Your place in line</small><strong>#4</strong><div className="progress-dots"><i/><i/><i/><i className="muted"/><i className="muted"/></div></div></div>
    <div className="welcome-actions"><Button onClick={() => go("login")}>Log In</Button><Button kind="secondary" onClick={() => go("register")}>Create Account</Button><small>Built for students and teaching teams</small></div>
  </div>;

  if (screen === "login") return <><NavBar title="Log In" back={() => go("welcome")}/><ScreenBody><div className="intro"><h1>Welcome back</h1><p>Use your school email to continue to Nudge.</p></div><div className="form-stack"><Field label="Email" value="alex.rivera@utexas.edu"/><Field label="Password" type="password" value="incorrect" error="Email or password is incorrect. Try again." trailing={<Icon name="eye" size={18}/>}/><Button onClick={() => go("courses")}>Log In</Button><button className="text-link">Forgot password?</button></div><div className="bottom-prompt">New to Nudge? <button onClick={() => go("register")}>Create an account</button></div></ScreenBody></>;

  if (screen === "register") return <><NavBar title="Create Account" back={() => go("welcome")}/><ScreenBody><div className="intro"><h1>Let’s get you set up</h1><p>Create your account with your school email. Course roles are assigned inside each course.</p></div><div className="form-stack"><Field label="Full name" value="Alex Rivera"/><Field label="School email" value="alex.rivera@utexas.edu"/><Field label="Password" type="password" value="password"/><Field label="Confirm password" type="password" value="password"/><Button onClick={() => go("courses")}>Create Account</Button></div></ScreenBody></>;

  if (screen === "courses") return <><NavBar title="Courses" action={<button className="icon-btn" onClick={() => go("join-course")}><Icon name="plus"/></button>}/><ScreenBody className="with-tabs"><div className="hero-row"><div><p className="overline">Tuesday, March 4</p><h1>Good afternoon, Alex</h1></div><span className="avatar avatar-lg">AR</span></div><div className="notification-stack" aria-label="Recent notifications"><NotificationCard title="You’re #4 in CS 371p" detail="We’ll remind you at 3 positions away." time="now" onClick={() => go("queue")}/><NotificationCard title="Location updated" detail="Office hours moved to GDC 2.210." time="8m" onClick={() => go("notifications")}/><NotificationCard title="Session starts soon" detail="Project 3 Help begins at 3:00 PM." time="1h" onClick={() => go("notifications")}/></div><button className="notification-list-link" onClick={() => go("notifications")}>View all notifications <Icon name="arrow" size={16}/></button><div className="section-head"><h2>Your courses</h2><button onClick={() => go("join-course")}>Join course</button></div><button className="course-card" onClick={() => go("student-course")}><div className="course-accent">CS</div><div><span className="course-code">CS 371p · Student</span><h3>iOS Mobile Computing</h3><p>Office hours open now · 6 waiting</p></div><Icon name="chevron"/></button><button className="course-card" onClick={() => go("staff-course")}><div className="course-accent coral">CS</div><div><span className="course-code">CS 314 · Course Staff</span><h3>Data Structures</h3><p>Next session tomorrow at 3:00 PM</p></div><Icon name="chevron"/></button><div className="action-grid"><button onClick={() => go("join-course")}><Icon name="plus"/><strong>Join Course</strong><span>Enter a private code</span></button><button onClick={() => go("create-course")}><Icon name="book"/><strong>Create Course</strong><span>Start a new space</span></button></div><div className="empty-inline"><Icon name="book"/><div><strong>New account?</strong><p>Your joined and created courses will appear here.</p></div></div></ScreenBody><BottomTabs active="courses" go={go}/></>;

  if (screen === "join-course") return <><NavBar title="Join Course" back={back}/><ScreenBody><div className="intro"><span className="feature-icon"><Icon name="lock"/></span><h1>Enter your course code</h1><p>Private codes are shared by your course creator or teaching staff.</p></div><Field label="Course code" value="N4DG7K" error="Try “N4DG7K” to preview a valid course."/><div className="preview-card"><small>Course found</small><h3>iOS Mobile Computing</h3><p>CS 371p · Spring 2025</p><div className="preview-info"><span><Icon name="person" size={16}/> Dr. Lina Patel</span><span><Icon name="people" size={16}/> 84 members</span></div></div><Button onClick={() => go("student-course")}>Join Course</Button><div className="state-note"><strong>Already joined?</strong><p>Nudge will take you directly to the course instead of creating a duplicate membership.</p></div></ScreenBody></>;

  if (screen === "create-course") return <><NavBar title="Create Course" back={back}/><ScreenBody><div className="intro"><h1>Start a course space</h1><p>You’ll become the Course Creator and can assign staff roles.</p></div><div className="form-stack"><Field label="Course name" value="Human-Computer Interaction"/><Field label="Course code / title" value="CS 378"/><label className="field"><span>Description</span><textarea defaultValue="Designing useful, usable, and inclusive interactive systems."/></label><Button onClick={() => go("course-created")}>Create Course</Button></div></ScreenBody></>;

  if (screen === "course-created") return <><NavBar title="Course Created"/><ScreenBody><div className="success-hero"><span><Icon name="check" size={30}/></span><h1>Your course is ready</h1><p>Share this private code with students and staff you want to invite.</p></div><div className="join-code"><small>PRIVATE JOIN CODE</small><strong>N4DG7K</strong><button onClick={() => setCopied(true)}><Icon name={copied ? "check" : "copy"}/>{copied ? "Copied" : "Copy code"}</button></div><div className="info-card"><Icon name="shield"/><div><strong>You control course access</strong><p>New members join as students. As Course Creator, you can assign TA / Course Staff roles from Members & Roles.</p></div></div><Button onClick={() => go("staff-course")}>Go to Course</Button></ScreenBody></>;

  if (screen === "student-course") return <><NavBar title="CS 371p" back={back} action={<button className="icon-btn"><Icon name="more"/></button>}/><ScreenBody><div className="course-hero"><span>CS 371p · Spring 2025</span><h1>iOS Mobile Computing</h1><p>Build polished native iOS apps with Swift, UIKit, and thoughtful interaction design.</p><div><Badge>Student</Badge><span>Dr. Lina Patel</span></div></div><div className="section-head"><h2>Happening now</h2><Badge tone="green">1 open</Badge></div><SessionCard onClick={() => go("session")}/><div className="section-head"><h2>Upcoming</h2><button onClick={() => go("my-sessions")}>See all</button></div><SessionCard scheduled onClick={() => go("session")}/><div className="section-head"><h2>Past</h2></div><SessionCard closed/></ScreenBody></>;

  if (screen === "staff-course") return <><NavBar title={courseCode} back={back} action={<button className="icon-btn" onClick={() => go("course-settings")} aria-label="Course settings"><Icon name="settings"/></button>}/><ScreenBody><div className="course-hero staff"><span>{courseCode} · Spring 2025</span><h1>Data Structures</h1><p>Staff workspace for office hours, helpers, and course queue activity.</p><div><Badge tone="amber">Course Creator</Badge><span>24 sessions this term</span></div></div><div className="action-grid staff-actions"><button onClick={() => go("schedule")}><Icon name="calendar"/><strong>Schedule</strong><span>For later</span></button><button onClick={() => go("staff-queue")}><Icon name="play"/><strong>Open Now</strong><span>Start a queue</span></button></div><div className="section-head"><h2>Active session</h2><Badge tone="green">Live</Badge></div><button className="live-session" onClick={() => go("staff-queue")}><div><small>iOS Project Help</small><strong>6 waiting · 2 in progress</strong><span>Maya and Jordan are helping</span></div><Icon name="arrow"/></button><div className="group"><SettingRow icon="settings" title="Course Settings" onClick={() => go("course-settings")}/><SettingRow icon="people" title="Members & Roles" value="84" onClick={() => go("members")}/><SettingRow icon="megaphone" title="Announcements" onClick={() => go("announcements")}/><SettingRow icon="chart" title="Feedback & Analytics" onClick={() => go("analytics")}/></div><div className="section-head"><h2>Scheduled</h2></div><SessionCard scheduled onClick={() => go("schedule")}/></ScreenBody></>;

  if (screen === "course-settings") return <><NavBar title="Course Settings" back={() => go("staff-course")} action={<button className="nav-save" onClick={() => go("staff-course")}>Save</button>}/><ScreenBody><div className="intro"><h1>Data Structures</h1><p>Manage the course details and reusable queue setup.</p></div><label className="field"><span>Course code</span><div className="field-shell"><input value={courseCode} onChange={event => setCourseCode(event.target.value)}/></div><small>This code appears on course and queue screens.</small></label><div className="settings-section"><h2>Course management</h2><div className="group"><SettingRow icon="book" title="Question Topics" value={`${topics.length} topics`} onClick={() => go("topics")}/><SettingRow icon="people" title="Members & Roles" value="84 members" onClick={() => go("members")}/></div></div><div className="permission-note"><Icon name="shield"/><p>Only course creators and authorized teaching staff can change these settings.</p></div></ScreenBody></>;

  if (screen === "topics") return <><NavBar title="Manage Topics" back={() => go("course-settings")}/><ScreenBody><div className="intro"><h1>Question topics</h1><p>Topics created here are available when future queue sessions are scheduled.</p></div><label className="field"><span>New topic</span><div className="topic-create-row"><div className="field-shell"><input value={topicDraft} onChange={event => setTopicDraft(event.target.value)} placeholder="e.g. Graph traversal"/></div><Button icon="plus" disabled={!topicDraft.trim()} onClick={() => { const next = topicDraft.trim(); if (next && !topics.includes(next)) setTopics([...topics, next]); setTopicDraft(""); }}>Create</Button></div></label><div className="section-head"><h2>Available topics</h2><span>{topics.length}</span></div>{topics.map(topic => <div className="topic-edit" key={topic}><span>{topic}</span><button onClick={() => setTopicDraft(topic)}>Rename</button><button onClick={() => setTopics(topics.filter(item => item !== topic))} aria-label={`Remove ${topic}`}><Icon name="x" size={16}/></button></div>)}<div className="state-note"><strong>Used in new sessions</strong><p>Changes update the topic choices shown during subsequent queue setup and student requests.</p></div></ScreenBody></>;

  if (screen === "members") return <><NavBar title="Members & Roles" back={() => go("course-settings")} action={<button className="icon-btn"><Icon name="plus"/></button>}/><ScreenBody><div className="permission-note"><Icon name="shield"/><p>Select a member to review and change their course role. Only the Course Creator can save changes.</p></div><div className="search-shell"><Icon name="person" size={17}/><input placeholder="Search 84 members"/></div><div className="section-head"><h2>Teaching team</h2><span>3</span></div><div className="member-list"><QueueRow name="Lina Patel" topic="Course Creator" status="Owner"/><QueueRow name="Maya Chen" topic="TA / Course Staff" status="Helper" onClick={() => { setSelectedMember("Maya Chen"); setMemberRole("TA / Course Staff"); }}/><QueueRow name="Jordan Lee" topic="TA / Course Staff" status="Helper" onClick={() => { setSelectedMember("Jordan Lee"); setMemberRole("TA / Course Staff"); }}/></div><div className="section-head"><h2>Students</h2><span>81</span></div><div className="member-list"><QueueRow name="Alex Rivera" topic={savedMemberRole} status="Joined Jan 19" onClick={() => { setSelectedMember("Alex Rivera"); setMemberRole(savedMemberRole); }}/><QueueRow name="Sam Okafor" topic="Student" status="Joined Jan 20" onClick={() => { setSelectedMember("Sam Okafor"); setMemberRole("Student"); }}/></div>{selectedMember && <div className="role-editor"><div><span className="avatar">{selectedMember.split(" ").map(part => part[0]).join("")}</span><div><strong>{selectedMember}</strong><small>Select a course role</small></div></div><div className="choice-list"><Choice label="Student" sub="Can join sessions and queues" selected={memberRole === "Student"} onClick={() => setMemberRole("Student")}/><Choice label="TA / Course Staff" sub="Can manage sessions and requests" selected={memberRole === "TA / Course Staff"} onClick={() => setMemberRole("TA / Course Staff")}/></div><div className="button-row"><Button kind="plain" onClick={() => setSelectedMember(null)}>Cancel</Button><Button onClick={() => { if (selectedMember === "Alex Rivera") setSavedMemberRole(memberRole); setSelectedMember(null); }}>Save Role</Button></div></div>}</ScreenBody></>;

  if (screen === "schedule") return <><NavBar title="Office Hours" back={() => go("staff-course")}/><ScreenBody><div className="form-stack"><Field label="Session title" value="Project 3 Help"/><label className="field"><span>Short description</span><textarea defaultValue="Bring questions about table views, delegation, and layout."/></label><div className="two-col"><Field label="Date" value="Tue, Mar 4"/><Field label="Location" value="GDC 2.210"/></div><div className="two-col"><Field label="Starts" value="3:00 PM"/><Field label="Ends" value="5:00 PM"/></div><div className="field"><span>Available helpers</span><div className="chips"><button className="selected">Maya Chen</button><button className="selected">Jordan Lee</button><button>Priya Shah</button></div></div><div className="field"><div className="field-label-action"><span>Question topics</span><button onClick={() => go("topics")}><Icon name="settings" size={15}/> Manage Topics</button></div><div className="chips">{topics.map(topic => <button className="selected" key={topic}>{topic}</button>)}</div></div><Field label="Temporary absence limit" value="5 minutes"/><small className="helper-copy">Proposed default. Students preserve priority if they resume in time.</small><div className="sticky-actions"><Button kind="secondary">Schedule for Later</Button><Button onClick={() => go("staff-queue")}>Open Now</Button></div><div className="validation-note"><Icon name="x"/><span>Title, start time, end time, and at least one helper are required.</span></div></div></ScreenBody></>;

  if (screen === "session") return <><NavBar title="Session Details" back={() => go("student-course")}/><ScreenBody><div className="session-hero"><div><Badge tone="green">Open now</Badge><span>CS 371p</span></div><h1>iOS Project Help</h1><p>Get help with Project 3, Auto Layout, and table view data sources.</p></div><Announcement/><div className="details-card"><Meta icon="clock">Today, 3:00–5:00 PM</Meta><Meta icon="pin">GDC 2.210</Meta><Meta icon="people">Maya Chen, Jordan Lee, Priya Shah</Meta><Meta icon="person">6 students in queue</Meta></div><div className="helper-stack"><span className="avatar">MC</span><span className="avatar">JL</span><span className="avatar">PS</span><div><strong>3 helpers available</strong><small>Requests are claimed by the next available helper.</small></div></div><Button onClick={() => go("join-queue")}>Join Queue</Button><div className="state-note"><strong>Session states</strong><p>Scheduled sessions show the start time. Closed sessions disable joining and explain what happens to active requests.</p></div></ScreenBody></>;

  if (screen === "join-queue") return <><NavBar title="Join Queue" back={() => go("session")}/><ScreenBody><div className="intro"><h1>What can we help with?</h1><p>A short description helps the teaching team prepare.</p></div><label className="field"><span>Your question</span><textarea defaultValue="My custom table view cell constraints break when the Dynamic Type size changes."/><small>82 / 240 characters</small></label><div className="field"><span>Choose a topic</span><div className="choice-list">{topics.map((topic, index) => <Choice key={topic} label={topic} sub={index === 0 ? "Constraints, stacks, Dynamic Type" : "Course question topic"} selected={index === 0}/>)}</div></div><Button onClick={() => go("queue")}>Submit Request</Button><div className="permission-note"><Icon name="shield"/><p>Your full question is only visible to course staff. Students see queue order and status, but not private question details.</p></div><div className="validation-note"><Icon name="x"/><span>You can only have one active request in this session.</span></div></ScreenBody></>;

  if (screen === "queue") return <><NavBar title="My Queue Status" back={() => go("my-sessions")} action={<button className="icon-btn" onClick={() => go("notifications")} aria-label="Notifications"><Icon name="bell"/></button>}/><ScreenBody><div className="queue-position"><span>YOUR POSITION</span><strong>You are #4</strong><p>We’ll notify you when you’re within {threshold} {threshold === "1" ? "position" : "positions"} of the front.</p><div className="queue-viz"><i className="done"/><i className="done"/><i className="done"/><i className="you">You</i><i/><i/></div><small>Queue order and statuses update live.</small></div><Announcement/><div className="section-head"><h2>People in queue</h2><span className="live-status"><i/> Live</span></div><div className="student-queue-list"><div><span className="queue-number">1</span><span className="avatar">TK</span><span><strong>Taylor K.</strong><small>Waiting · Auto Layout</small></span></div><div className="paused-person"><span className="queue-number">2</span><span className="avatar">NW</span><span><strong>Noah W. <Badge tone="amber">Paused</Badge></strong><small>Temporarily away</small></span></div><div><span className="queue-number">3</span><span className="avatar">IB</span><span><strong>Imani B.</strong><small>Waiting · Table Views</small></span></div><div className="current-person"><span className="queue-number">4</span><span className="avatar">AR</span><span><strong>You</strong><small>Waiting · Auto Layout</small></span></div><div><span className="queue-number">5</span><span className="avatar">SO</span><span><strong>Sam O.</strong><small>Waiting · Debugging</small></span></div></div><div className="request-card"><div><Badge>Waiting</Badge><span>Your private request · Auto Layout</span></div><h3>My custom table view cell constraints break when the Dynamic Type size changes.</h3><Meta icon="people">Helper will be assigned when ready</Meta></div><div className="button-row"><Button kind="secondary" icon="pause" onClick={() => go("paused")}>Pause My Spot</Button><Button kind="danger">Leave Queue</Button></div></ScreenBody></>;

  if (screen === "paused") return <><NavBar title="Spot Paused" back={() => go("queue")}/><ScreenBody><div className="pause-hero"><span className="pause-ring"><Icon name="pause" size={30}/></span><Badge tone="amber">Temporarily away</Badge><h1>4:16 remaining</h1><p>Others may go ahead while you’re away. Resume within the limit to preserve your queue priority.</p></div><div className="request-card"><div><Badge tone="amber">Paused</Badge><span>Previously #4</span></div><h3>Auto Layout · Dynamic Type constraints</h3></div><Button icon="play" onClick={() => go("queue")}>Resume My Spot</Button><div className="expired-card"><strong>Pause expired</strong><p>Your spot is no longer reserved. Exact expiry behavior—removal or moving to the back—is a product decision to finalize before development.</p><Button kind="secondary">Return to Session</Button></div></ScreenBody></>;

  if (screen === "helper-ready") return <><NavBar title="Helper Ready" back={() => go("queue")}/><ScreenBody><div className="ready-hero"><div className="ready-pulse"><Icon name="spark" size={34}/></div><span>YOUR HELPER IS READY</span><h1>Meet Maya in<br/>GDC 2.210</h1><p>Maya Chen has claimed your request and is ready to help now.</p></div><div className="ios-notification"><div className="app-icon">N</div><div><strong>Nudge <small>now</small></strong><p>Your helper is ready. Meet Maya in GDC 2.210.</p></div></div><div className="steps"><div><span><Icon name="check"/></span><p>Request submitted</p></div><div><span><Icon name="check"/></span><p>Your turn is approaching</p></div><div className="active"><span><Icon name="person"/></span><p>Helper ready</p></div></div><Button onClick={() => go("feedback")}>View Active Request</Button><Button kind="plain" onClick={() => go("queue")}>Back to Queue Status</Button></ScreenBody></>;

  if (screen === "my-sessions") return <><NavBar title="My Sessions"/><ScreenBody className="with-tabs"><div className="section-head"><h2>Active request</h2><Badge tone="green">Live</Badge></div><button className="active-request" onClick={() => go("queue")}><div><span>CS 371p · iOS Project Help</span><strong>You’re #4 in line</strong><small>Auto Layout · Submitted 3:08 PM</small></div><Icon name="arrow"/></button><div className="section-head"><h2>Upcoming</h2><span>2</span></div><SessionCard scheduled onClick={() => go("session")}/><div className="section-head"><h2>Past & completed</h2></div><div className="compact-session"><div><strong>Debugging Lab</strong><span>CS 371p · Feb 27</span></div><Badge tone="gray">Resolved</Badge></div><div className="empty-inline"><Icon name="calendar"/><div><strong>No sessions yet</strong><p>Upcoming and completed sessions will appear here.</p></div></div></ScreenBody><BottomTabs active="sessions" go={go}/></>;

  if (screen === "staff-queue") return <><NavBar title="Live Queue" back={() => go("staff-course")} action={<button className="icon-btn" onClick={() => go("session-settings")}><Icon name="settings"/></button>}/><ScreenBody><div className="live-head"><div><span className="live-dot"/>LIVE · CS 314</div><h1>Project 3 Help</h1><p>GDC 2.210 · Ends at 5:00 PM</p></div><div className="stats-grid"><div><strong>6</strong><span>Waiting</span></div><div><strong>1</strong><span>Paused</span></div><div><strong>2</strong><span>In progress</span></div><div><strong>3</strong><span>Helpers online</span></div></div><div className="helper-availability"><span className="avatar">MC</span><div><strong>Maya · Assisting Alex</strong><small>Jordan · Assisting Sam</small></div><Badge tone="green">Priya available</Badge></div><Button icon="person" onClick={() => go("request")}>Claim Next Student</Button><div className="filter-scroll"><button className="active">Waiting 6</button><button>Paused 1</button><button>In Progress 2</button><button>Resolved 12</button></div><div className="member-list"><QueueRow name="Taylor Kim" topic="Auto Layout" status="8 min ago" onClick={() => go("request")}/><QueueRow name="Noah Williams" topic="Debugging" status="11 min ago" claimed="Just claimed by Priya — unavailable"/><QueueRow name="Imani Brooks" topic="Table Views" status="14 min ago" onClick={() => go("request")}/></div><button className="announce-bar" onClick={() => go("announcements")}><Icon name="megaphone"/><span>Broadcast an announcement</span><Icon name="chevron"/></button><div className="empty-inline"><Icon name="check"/><div><strong>No waiting students</strong><p>When the queue is clear, new requests will appear here live.</p></div></div></ScreenBody></>;

  if (screen === "request") return <><NavBar title="Request Detail" back={() => go("staff-queue")} action={<button className="icon-btn"><Icon name="more"/></button>}/><ScreenBody>{studentKicked ? <div className="center-state compact"><span><Icon name="check" size={28}/></span><h1>Student removed</h1><p>Taylor was removed from this queue. Their course membership was not changed.</p><Button onClick={() => go("staff-queue")}>Return to Live Queue</Button></div> : <><div className="student-profile"><span className="avatar avatar-lg">TK</span><div><h1>Taylor Kim</h1><p>Waiting 8 minutes · Position #1</p></div><Badge tone="green">Waiting</Badge></div><div className="request-card full"><div><Badge>Auto Layout</Badge><span>Submitted 3:14 PM</span></div><h3>My custom table view cell constraints break when the Dynamic Type size changes. The labels overlap after Accessibility Large.</h3></div><div className="group"><SettingRow icon="person" title="Assigned helper" value="Unassigned"/><SettingRow icon="pin" title="Meeting location" value="GDC 2.210"/></div><Button onClick={() => go("reassign")}>Claim Request</Button><Button kind="secondary" onClick={() => go("reassign")}>Reassign Helper</Button><Button kind="plain" onClick={() => go("analytics")}>Mark Resolved</Button><div className="moderation-zone"><div><Icon name="shield"/><span><strong>Moderation</strong><small>Remove this student from the active queue.</small></span></div><Button kind="danger" onClick={() => setKickConfirm(true)}>Kick Student</Button></div>{kickConfirm && <div className="confirm-card destructive-confirm"><small>Confirm removal</small><p>Kick Taylor Kim from this queue? This cannot be undone, but it will not remove them from the course.</p><div><Button kind="plain" onClick={() => setKickConfirm(false)}>Cancel</Button><Button kind="danger" onClick={() => { setStudentKicked(true); setKickConfirm(false); }}>Yes, Kick Student</Button></div></div>}<div className="transition"><span>Waiting</span><Icon name="arrow"/><span>Claimed / In progress</span><Icon name="arrow"/><span>Resolved</span></div></>}</ScreenBody></>;

  if (screen === "reassign") return <><NavBar title="Reassign Helper" back={() => go("request")}/><ScreenBody><div className="intro"><h1>Choose an available helper</h1><p>Taylor’s request is currently assigned to Maya Chen.</p></div><div className="choice-list"><Choice label="Maya Chen" sub="Currently assigned · Assisting Taylor" selected/><Choice label="Priya Shah" sub="Available now"/><Choice label="Jordan Lee" sub="Assisting Sam Okafor"/></div><div className="state-note"><strong>Preventing duplicate claims</strong><p>If another helper claims this request first, this action is disabled and the latest assignment is shown.</p></div><Button onClick={() => go("request")}>Reassign to Priya</Button><Button kind="plain" onClick={() => go("request")}>Cancel</Button></ScreenBody></>;

  if (screen === "announcements") return <><NavBar title="Announcement" back={() => go("staff-queue")}/><ScreenBody><div className="intro"><span className="feature-icon"><Icon name="megaphone"/></span><h1>Message everyone</h1><p>This appears in the active session and on every student’s queue screen.</p></div><label className="field"><span>Announcement</span><textarea defaultValue="Office hours have moved to GDC 2.210."/><small>43 / 180 characters</small></label><div className="preview-card"><small>Student preview</small><Announcement/></div><div className="confirm-card"><small>Ready to broadcast?</small><p>Everyone in “iOS Project Help” will see this update immediately. Simulated live sync in this prototype.</p><div><Button kind="plain">Cancel</Button><Button onClick={() => go("staff-queue")}>Broadcast</Button></div></div></ScreenBody></>;

  if (screen === "session-settings") return <><NavBar title="Session Management" back={() => go("staff-queue")}/><ScreenBody><div className="group"><SettingRow title="Description" value="Project 3 help"/><SettingRow title="Location" value="GDC 2.210"/><SettingRow title="Schedule" value="3:00–5:00 PM"/><SettingRow title="Available helpers" value="3"/><SettingRow title="Pause limit" value="5 min"/></div><div className="section-head"><h2>Question topics</h2><button onClick={() => go("topics")}><Icon name="settings" size={16}/> Manage</button></div>{topics.map(topic => <div className="topic-edit" key={topic}><span>{topic}</span><button onClick={() => go("topics")}>Edit</button></div>)}<div className="danger-zone"><strong>Close Session</strong><p>Students can no longer join. Active requests are marked closed and students are invited to leave anonymous feedback.</p><Button kind="danger">Close Session</Button></div><div className="confirm-card"><small>Close this session?</small><p>6 waiting requests and 2 in progress will receive the student-facing closed state.</p><div><Button kind="plain">Keep Open</Button><Button kind="danger">Close Session</Button></div></div></ScreenBody></>;

  if (screen === "feedback") return <><NavBar title="Session Feedback" back={() => go("my-sessions")}/><ScreenBody><div className="feedback-hero"><span><Icon name="check" size={28}/></span><h1>Request resolved</h1><p>How was your office-hours experience?</p></div><div className="privacy-banner"><Icon name="lock"/><p>Your rating and comments are anonymous to teaching staff.</p></div><div className="rating-row">{[1,2,3,4,5].map(n => <button key={n} className={n <= 4 ? "filled" : ""}>★</button>)}</div><label className="field"><span>Optional feedback</span><textarea placeholder="What was helpful? What could be better?"/></label><Button onClick={() => go("thanks")}>Submit Feedback</Button><Button kind="plain" onClick={() => go("thanks")}>Skip</Button></ScreenBody></>;

  if (screen === "thanks") return <><ScreenBody><div className="center-state"><span><Icon name="check" size={34}/></span><h1>Thanks for helping<br/>Nudge improve</h1><p>Your anonymous feedback has been submitted.</p><Button onClick={() => go("courses")}>Back to Courses</Button></div></ScreenBody></>;

  if (screen === "analytics") return <><NavBar title="Feedback & Analytics" back={() => go("staff-course")}/><ScreenBody><div className="sample-label">SAMPLE DATA · SPRING 2025</div><div className="analytics-hero"><div><strong>4.7</strong><span>out of 5</span><div className="stars">★★★★★</div></div><div><strong>128</strong><span>requests resolved</span><small>Across 24 sessions</small></div></div><div className="section-head"><h2>Requests by topic</h2><span>Last 30 days</span></div><div className="chart-card">{[["Auto Layout",42],["Debugging",34],["Table Views",28],["Delegation",16]].map(([label,value]) => <div className="bar-row" key={label}><span>{label}</span><div><i style={{width:`${Number(value)*2}%`}}/></div><strong>{value}</strong></div>)}</div><div className="insight-card"><Icon name="spark"/><div><strong>Frequently requested</strong><p>Auto Layout accounts for 35% of requests. Consider a constraints review before Project 3.</p></div></div><div className="section-head"><h2>Anonymous comments</h2></div><div className="comment-card"><div><span className="stars">★★★★★</span><small>Feb 27</small></div><p>“Maya explained why the constraints were ambiguous and helped me fix the root cause.”</p></div><div className="privacy-banner"><Icon name="shield"/><p>Feedback is aggregated and never connected to student identities.</p></div></ScreenBody></>;

  if (screen === "notifications") return <><NavBar title="Notifications" back={() => go("courses")} action={<button className="nav-save">Mark read</button>}/><ScreenBody><div className="intro"><h1>Recent updates</h1><p>Queue changes, session reminders, and course announcements in one place.</p></div><div className="notification-list"><NotificationCard title="You’re #4 in CS 371p" detail="Your queue position updated. Three people are ahead of you." time="Now" onClick={() => go("queue")}/><NotificationCard title="Office hours moved" detail="iOS Project Help is now in GDC 2.210." time="8 min ago" onClick={() => go("session")}/><NotificationCard title="Session starts soon" detail="Project 3 Help begins today at 3:00 PM." time="1 hour ago" onClick={() => go("session")}/><NotificationCard title="New announcement" detail="Bring your latest project build and any crash logs." time="Yesterday" onClick={() => go("session")}/></div><div className="state-note"><strong>You’re all caught up</strong><p>New notification cards will appear here as queue and session activity changes.</p></div></ScreenBody></>;

  if (screen === "settings") return <><NavBar title="Settings"/><ScreenBody className="with-tabs"><div className="profile-card static-profile"><span className="avatar avatar-lg">AR</span><div><strong>Alex Rivera</strong><span>alex.rivera@utexas.edu</span><small>Queue display name · Alex R.</small></div></div><button className="edit-account-link" onClick={() => go("account")}>Edit account details <Icon name="chevron" size={16}/></button><div className="settings-section"><h2>Appearance</h2><div className="group"><SettingRow icon="spark" title="Theme" value={appearance} onClick={() => setThemeOpen(!themeOpen)}/>{themeOpen && <div className="theme-choice expanded">{["System","Light","Dark"].map(item => <button key={item} className={appearance === item ? "active" : ""} onClick={() => setAppearance(item)}>{item}</button>)}</div>}</div></div><div className="settings-section"><h2>Notifications</h2><div className="group"><SettingRow icon="bell" title="Queue reminders" tail={<Toggle on={reminders} setOn={setReminders}/>}/><SettingRow title="Notify me when I am within" value={`${threshold} ${threshold === "1" ? "person" : "people"} away`} onClick={() => setThresholdOpen(!thresholdOpen)}/>{thresholdOpen && <div className="threshold-menu">{["1","2","3","4","5"].map(position => <button key={position} className={threshold === position ? "active" : ""} onClick={() => { setThreshold(position); setThresholdOpen(false); }}>{position} {position === "1" ? "person" : "people"} away<Icon name={threshold === position ? "check" : "chevron"} size={15}/></button>)}</div>}</div><div className="permission-warning"><Icon name="bell"/><div><strong>Notifications are off in iOS Settings</strong><p>Enable notifications in Settings → Nudge to receive queue reminders.</p></div></div></div><div className="settings-section"><h2>Account</h2><div className="group"><SettingRow icon="person" title="Account Editing" onClick={() => go("account")}/><SettingRow icon="bell" title="Notification History" onClick={() => go("notifications")}/></div></div><div className="logout-section"><Button kind="plain" onClick={() => go("welcome")}>Log Out</Button></div></ScreenBody><BottomTabs active="settings" go={go}/></>;

  if (screen === "account") return <><NavBar title="Account" back={() => go("settings")} action={<button className="nav-save">Save</button>}/><ScreenBody><div className="profile-edit"><span className="avatar avatar-xl">AR</span><button>Change Photo</button></div><div className="form-stack"><Field label="Name" value="Alex Rivera"/><Field label="Email" value="alex.rivera@utexas.edu"/><Field label="Queue display name" value="Alex R."/></div><div className="section-head"><h2>Change password</h2></div><div className="form-stack"><Field label="Current password" type="password" placeholder="Required"/><Field label="New password" type="password" placeholder="At least 8 characters"/><Field label="Confirm new password" type="password" placeholder="Re-enter password"/><div className="success-inline"><Icon name="check"/><span>Account information saved successfully.</span></div></div><div className="danger-zone"><strong>Delete account</strong><p>Permanently remove your profile, course memberships, and saved settings.</p><Button kind="danger">Delete Account</Button><small>This action requires confirmation and cannot be undone.</small></div></ScreenBody></>;

  if (screen === "design-system") return <><NavBar title="Nudge Design System"/><ScreenBody><div className="ds-hero"><span className="brand-mark small"><i/><i/><i/></span><div><h1>Friendly, focused, familiar.</h1><p>A compact system designed for native UIKit implementation.</p></div></div><div className="section-head"><h2>Color</h2></div><div className="swatches"><div className="indigo"><span>Primary</span><strong>Burnt Orange</strong></div><div className="ink"><span>Text</span><strong>Ink 900</strong></div><div className="mint"><span>Success</span><strong>Mint 600</strong></div><div className="cloud"><span>Surface</span><strong>Cloud 50</strong></div></div><div className="section-head"><h2>Typography</h2></div><div className="type-spec"><h1>Large title</h1><h2>Section heading</h2><h3>Card title</h3><p>Body text prioritizes clarity and Dynamic Type compatibility.</p><small>LABEL · 13 SEMIBOLD</small></div><div className="section-head"><h2>Spacing & shape</h2></div><div className="spacing-demo"><i/><i/><i/><i/><span>4pt base grid · 12–24pt spacing · 14–24pt radii</span></div><div className="section-head"><h2>Core components</h2></div><div className="component-stack"><Button>Primary Button</Button><Button kind="secondary">Secondary Button</Button><Field label="Form field" placeholder="Accessible label"/><Announcement/><SessionCard scheduled/></div><div className="dev-note"><Icon name="settings"/><p><strong>Developer note:</strong> Build with Auto Layout, native navigation and tab bars, reusable cell/card subclasses, semantic colors, Dynamic Type, and minimum 44pt touch targets.</p></div></ScreenBody></>;

  if (screen === "checklist") return <><NavBar title="Feature Checklist"/><ScreenBody><div className="intro"><h1>Core proposal coverage</h1><p>Every required feature is represented in a named screen or reusable state.</p></div>{screenGroups.slice(0,6).map(group => <div className="check-group" key={group.label}><div><Badge>{group.milestone}</Badge><strong>{group.label}</strong></div>{group.screens.map(([key,label]) => <button key={key} onClick={() => go(key)}><Icon name="check"/><span>{label}</span><Icon name="chevron"/></button>)}</div>)}<div className="dev-note"><Icon name="shield"/><p>Prototype interactions use local simulated state and sample content. They do not imply authentication, live synchronization, notifications, or backend persistence.</p></div></ScreenBody></>;

  return <><NavBar title="Stretch — Optional"/><ScreenBody><div className="intro"><span className="feature-icon"><Icon name="spark"/></span><h1>Future explorations</h1><p>Intentionally separated from the required core experience.</p></div><div className="stretch-grid">{[["QR check-in","Fast arrival confirmation"],["Course invitation links","Shareable, revocable invites"],["Location verification","Optional on-campus proximity"],["Topic grouping","Group similar questions"],["AI topic summaries","Anonymous aggregate insights"],["Calendar integration","Add sessions to calendars"]].map(([title,desc],i) => <div key={title}><span>0{i+1}</span><strong>{title}</strong><p>{desc}</p></div>)}</div><div className="state-note"><strong>Scope note</strong><p>These concepts are not included in the Alpha, Beta, or Final implementation scope.</p></div></ScreenBody></>;
}

function BoardPhone({ screen }: { screen: Screen }) {
  return <div className="board-device-shell">
    <div className="board-device-scale">
      <div className="phone board-phone">
        <div className="ios-status"><span>9:41</span><div className="dynamic-island"/><div className="status-icons"><i/><i/><i/></div></div>
        <div className="phone-content"><AppScreen screen={screen} go={() => undefined} appearance="System" setAppearance={() => undefined}/></div>
        <div className="home-indicator"/>
      </div>
    </div>
  </div>;
}

function AllScreensBoard({ openPrototype }: { openPrototype: (screen?: Screen) => void }) {
  const total = boardGroups.reduce((count, group) => count + group.screens.length, 0);
  return <div className="all-screens-board">
    <header className="board-header">
      <div className="board-title">
        <div className="brand-symbol"><i/><i/><i/></div>
        <div><span>Submission overview</span><h1>Nudge — All Screens</h1><p>{total} separate iPhone mockups · Core, state, documentation, and optional screens</p></div>
      </div>
      <div className="board-actions"><button onClick={() => window.print()}><Icon name="arrow" size={17}/>Print / Export PDF</button><button className="board-primary" onClick={() => openPrototype()}><Icon name="play" size={17}/>Open Prototype</button></div>
    </header>
    <div className="board-note"><Icon name="shield"/><p><strong>Submission note:</strong> Screen content uses realistic sample data and simulated interactions. The board documents the proposed product; it does not imply a connected backend or live notification service.</p></div>
    {boardGroups.map((group, groupIndex) => <section className="board-section" key={group.label}>
      <div className="board-section-heading"><span>{String(groupIndex + 1).padStart(2, "0")}</span><div><h2>{group.label}</h2><p>{group.description}</p></div><strong>{group.screens.length} {group.screens.length === 1 ? "screen" : "screens"}</strong></div>
      <div className="board-grid">
        {group.screens.map((item, index) => <article className="board-screen-card" key={item.key}>
          <div className="board-screen-label"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{screenTitles[item.key]}</h3><p>{item.caption}</p></div></div>
          <BoardPhone screen={item.key}/>
          <button className="board-open-screen" onClick={() => openPrototype(item.key)}>Open interactive screen <Icon name="arrow" size={15}/></button>
        </article>)}
      </div>
    </section>)}
    <footer className="board-footer"><div className="brand-symbol"><i/><i/><i/></div><div><strong>Nudge</strong><span>Virtual office-hours queue · iOS product prototype</span></div><p>Designed for a practical Swift + UIKit implementation</p></footer>
  </div>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [appearance, setAppearance] = useState("System");
  const [showIndex, setShowIndex] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const milestone = useMemo(() => screenGroups.find(group => group.screens.some(([key]) => key === screen))?.milestone || "Alpha", [screen]);
  const isDark = appearance === "Dark";

  if (showBoard) return <AllScreensBoard openPrototype={(target) => { if (target) setScreen(target); setShowBoard(false); }}/>;

  return <main className={`prototype ${isDark ? "dark-mode" : ""}`}>
    <aside className={`screen-index ${showIndex ? "open" : ""}`}>
      <div className="index-brand"><div className="brand-symbol"><i/><i/><i/></div><div><strong>Nudge</strong><span>iOS prototype</span></div><button onClick={() => setShowIndex(false)}><Icon name="x"/></button></div>
      <div className="index-scroll">
        {screenGroups.map(group => <section key={group.label}><div className="group-label"><span>{group.milestone}</span><strong>{group.label}</strong></div>{group.screens.map(([key,label]) => <button className={screen === key ? "active" : ""} key={key} onClick={() => { setScreen(key); setShowIndex(false); }}><span>{label}</span>{screen === key && <Icon name="chevron" size={15}/>}</button>)}</section>)}
      </div>
      <button className="index-note" onClick={() => setShowBoard(true)}><Icon name="book"/><span><strong>All Screens Board</strong><small>Submission overview</small></span></button>
    </aside>
    <section className="stage">
      <header className="prototype-header"><button className="mobile-menu" onClick={() => setShowIndex(true)}><Icon name="book"/></button><div><span>{milestone} · {screenTitles[screen]}</span><strong>Interactive prototype</strong></div><div className="header-actions"><button className="all-screens-button" onClick={() => setShowBoard(true)}>All Screens</button><button onClick={() => setScreen("design-system")}>Design System</button><button onClick={() => setScreen("checklist")}>Feature Checklist</button></div></header>
      <div className="phone-wrap">
        <div className="phone">
          <div className="ios-status"><span>9:41</span><div className="dynamic-island"/><div className="status-icons"><i/><i/><i/></div></div>
          <div className="phone-content"><AppScreen screen={screen} go={setScreen} appearance={appearance} setAppearance={setAppearance}/></div>
          <div className="home-indicator"/>
        </div>
        <div className="annotation-card">
          <span>SCREEN {screenGroups.flatMap(g => g.screens).findIndex(([key]) => key === screen) + 1} OF {screenGroups.flatMap(g => g.screens).length}</span>
          <h2>{screenTitles[screen]}</h2>
          <p>Tap highlighted actions inside the device to follow the connected student, staff, and creator journeys.</p>
          <div><Badge>{milestone}</Badge><Badge tone={screen.includes("staff") || screen === "members" || screen === "analytics" ? "amber" : "indigo"}>{screen.includes("staff") || screen === "members" || screen === "analytics" ? "Staff" : "Student / Shared"}</Badge></div>
        </div>
      </div>
    </section>
  </main>;
}
