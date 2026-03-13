const USERS_KEY = "devexpense_users_v1";
const SESSION_KEY = "devexpense_session_v1";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getSessionUser() {
  const session = readJson(SESSION_KEY, null);
  if (!session || typeof session !== "object") return null;
  if (!session.email) return null;
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function registerUser({ name, email, password }) {
  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanPassword = String(password || "");

  if (!cleanName) throw new Error("Enter your name.");
  if (!cleanEmail) throw new Error("Enter a valid email.");
  if (cleanPassword.length < 6) throw new Error("Password must be at least 6 characters.");

  const users = readJson(USERS_KEY, []);
  const safeUsers = Array.isArray(users) ? users : [];

  const exists = safeUsers.some((user) => String(user.email || "").toLowerCase() === cleanEmail);
  if (exists) throw new Error("Account already exists. Please login.");

  const newUser = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: cleanEmail,
    password: cleanPassword,
    createdAt: new Date().toISOString()
  };

  writeJson(USERS_KEY, [newUser, ...safeUsers]);
  writeJson(SESSION_KEY, { id: newUser.id, name: newUser.name, email: newUser.email });
  return { id: newUser.id, name: newUser.name, email: newUser.email };
}

export function loginUser({ email, password }) {
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanPassword = String(password || "");

  if (!cleanEmail) throw new Error("Enter your email.");
  if (!cleanPassword) throw new Error("Enter your password.");

  const users = readJson(USERS_KEY, []);
  const safeUsers = Array.isArray(users) ? users : [];

  const user = safeUsers.find((candidate) => String(candidate.email || "").toLowerCase() === cleanEmail);
  if (!user) throw new Error("No account found for this email. Please register.");
  if (String(user.password || "") !== cleanPassword) throw new Error("Incorrect password.");

  const sessionUser = { id: user.id, name: user.name, email: user.email };
  writeJson(SESSION_KEY, sessionUser);
  return sessionUser;
}

