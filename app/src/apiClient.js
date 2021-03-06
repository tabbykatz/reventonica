export const getUsers = () => _get("/api/users");

export const getUser = (id) => _get(`/api/users/${id}`);

export const addUser = (user) => _post("/api/users", user);

export const deleteUser = (userId) => _delete(`/api/users/${userId}`);

export const getEvents = async () => {
  const events = await _get("/api/events");
  return events.map((event) => ({ ...event, date: new Date(event.date) }));
};

export const addEvent = (event) => _post("/api/events", event);

export const deleteEvent = (eventId) => _delete(`/api/events/${eventId}`);

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

const _delete = (url) => fetch(url, { method: "DELETE" });
