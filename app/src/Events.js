import * as React from "react";

import { format } from "date-fns";

import * as apiClient from "./apiClient";

const Events = () => {
  const [events, setEvents] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState();
  const [categoryFilter, setCategoryFilter] = React.useState();

  const categories = [...new Set(events.map((e) => e.category))];

  const filteredEvents =
    dateFilter === undefined && categoryFilter === undefined
      ? events
      : events.filter(
          dateFilter
            ? (event) => format(event.date, "yyyy-MM-dd") === dateFilter
            : (event) => event.category === categoryFilter,
        );

  const getEvents = () => apiClient.getEvents().then(setEvents);

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <section>
      <SearchByDate {...{ setDateFilter }} />
      <SearchByCategory
        categories={categories}
        setCategoryFilter={setCategoryFilter}
      />
      <ul>
        {filteredEvents.map(({ id, name, date, category }) => (
          <li key={id}>
            <dl>
              <dd>{name}</dd>
              <dd>{date.toDateString()}</dd>
              <dd>{category}</dd>
            </dl>
            <button onClick={() => apiClient.deleteEvent(id).then(getEvents)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <AddEventForm {...{ getEvents }} />
    </section>
  );
};

const SearchByDate = ({ setDateFilter }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    setDateFilter(e.currentTarget.elements.date.value);
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Search by date
        <input name="date" type="date" />
      </label>
      <button>Search by date</button>
      <button type="reset" onClick={() => setDateFilter()}>
        Clear date
      </button>
    </form>
  );
};

const SearchByCategory = ({ categories, setCategoryFilter }) => {
  const onSubmit = (e) => {
    const {
      category: { value: category },
    } = e.currentTarget.elements;
    console.log(category);
    e.preventDefault();
    setCategoryFilter(category);
  };

  return (
    <>
      <form {...{ onSubmit }}>
        <label>
          Search by category
          <select name="category">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button>Search by category</button>
        <button type="reset" onClick={() => setCategoryFilter()}>
          Clear category
        </button>
      </form>
    </>
  );
};

const AddEventForm = ({ getEvents }) => {
  const onSubmit = (event) => {
    const {
      name: { value: name },
      date: { value: date },
      category: { value: category },
    } = event.currentTarget.elements;

    event.preventDefault();
    apiClient.addEvent({ name, date, category }).then(getEvents);
    [...event.currentTarget.elements].map((element) => (element.value = ""));
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Date
        <input name="date" type="date" required />
      </label>
      <label>
        Category
        <input name="category" required />
      </label>
      <button>Add event</button>
    </form>
  );
};

export default Events;
