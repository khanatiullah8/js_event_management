const eventForm = document.forms["event-form"];
const eventDateTimeInput = eventForm["date-time"];
const eventDescription = eventForm["description"];
const eventListsContainer = document.querySelector(".event-lists-container");
const eventLists = document.querySelector(".event-lists");

const eventsAll = {};
const daysArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const monthsArr = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

const formatTime = (hours, minutes) => {
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? `${hours % 12}` : hours;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${amPm}`;
};

const checkNewEvents = (events, eventData) => {
  const { year, month, date } = eventData;
  const yearsArray = Object.keys(events);
  const yearCheck = yearsArray.find((y) => y == year);

  if (yearCheck) {
    const monthsArray = Object.keys(events[yearCheck]);
    const monthCheck = monthsArray.find((m) => m == month);
    if (monthCheck) {
      const daysArray = Object.keys(events[yearCheck][monthCheck]);
      const dayCheck = daysArray.find((d) => d == date);
      if (dayCheck) {
        events[yearCheck][monthCheck][dayCheck] = [
          ...events[yearCheck][monthCheck][dayCheck],
          eventData,
        ];
      } else {
        events[yearCheck][monthCheck][date] = [eventData];
      }
    } else {
      events[yearCheck][month] = { [date]: [eventData] };
    }
  } else {
    events[year] = { [month]: { [date]: [eventData] } };
  }

  return events;
};

const renderAllEvents = (allEvents) => {
  let lists = "";
  for (let year in allEvents) {
    for (let month in allEvents[year]) {
      for (let date in allEvents[year][month]) {
        for (let event of allEvents[year][month][date]) {
          const { date, day, month, year, time, description } = event;
          lists = `<li>
            <div>Event Date: ${date}/${month}/${year}</div>
            <div>Event Time: ${day} ${time}</div>
            <div>Event Description: ${description}</div>
          </li>`;
        }
      }
    }
  }
  eventLists.innerHTML += lists;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const dateTime = eventDateTimeInput.value;
  const description = eventDescription.value;
  if (dateTime && description) {
    const enteredDate = new Date(dateTime);
    const year = enteredDate.getFullYear();
    const month = enteredDate.getMonth();
    const date = enteredDate.getDate();
    const day = enteredDate.getDay();
    const hours = enteredDate.getHours();
    const minutes = enteredDate.getMinutes();
    const eventId = enteredDate.getTime();

    const eventData = {
      eventId,
      year,
      month: month+1,
      date,
      day: daysArr[day],
      time: formatTime(hours, minutes),
      description,
    };

    const events = await checkNewEvents(eventsAll, eventData);
    eventForm.reset();
    renderAllEvents(events);
  }
};

eventForm.addEventListener("submit", handleFormSubmit);















// // ************************************************************** //
// // ********** Extract data if stored in object format *********** //
// // ************************************************************** //

// const demo = {
//   2023: {
//     5: {
//       20: [
//         {
//           eventId: 1,
//           description: "description comes here",
//         },
//         {
//           eventId: 2,
//           description: "description comes here",
//         },
//       ],
//       22: [
//         {
//           eventId: 11,
//           description: "description comes here",
//         },
//         {
//           eventId: 22,
//           description: "description comes here",
//         },
//       ],
//     },
//     7: {
//       12: [
//         {
//           eventId: 3,
//           description: "description comes here",
//         },
//       ],
//     },
//   },
//   2024: {
//     2: {
//       22: [
//         {
//           eventId: 4,
//           description: "description comes here",
//         },
//       ],
//     },
//   },
// };

// // console.log("demo", demo);

// for(let y in demo) {
//   console.log("year", demo[y]);
//   for(let m in demo[y]) {
//     // console.log("month", demo[y][m]);
//     for(let d in demo[y][m]) {
//       // console.log("date", demo[y][m][d]);
//       for(let finalData of demo[y][m][d]) {
//         // console.log("finalData", finalData);
//       }
//     }
//   }
// }

// const yy = 2023;
// const mm = 5;
// const dd = 25;
// const eventId = new Date().getTime();
// const description = "some new event description"
// const yearsArray = Object.keys(demo);
// const yearCheck = yearsArray.find((y) => y == yy)
// const emptyEvent = { eventId, description };

// if (yearCheck) {
//   const monthsArray = Object.keys(demo[yearCheck]);
//   const monthCheck = monthsArray.find((m) => m == mm);
//   if (monthCheck) {
//     const daysArray = Object.keys(demo[yearCheck][monthCheck]);
//     const dayCheck = daysArray.find((d) => d == dd);
//     if (dayCheck) {
//       demo[yearCheck][monthCheck][dayCheck] = [
//         ...demo[yearCheck][monthCheck][dayCheck],
//         emptyEvent,
//       ];
//     } else {
//       demo[yearCheck][monthCheck][dd] = [emptyEvent];
//     }
//   } else {
//     demo[yearCheck][mm] = { [dd]: [emptyEvent] };
//   }
// } else {
//   demo[yy] = { [mm]: { [dd]: [emptyEvent] } };
// }

// // ************************************************************** //
// // *********** Extract data if stored in array format *********** //
// // ************************************************************** //

// const newEventsAll = [
//   {
//     2023: [
//       {
//         5: [
//           {
//             20: [
//               {
//                 eventId: 1,
//                 description: "description comes here",
//               },
//               {
//                 eventId: 2,
//                 description: "description comes here",
//               },
//             ],
//           },
//           {
//             22: [
//               {
//                 eventId: 11,
//                 description: "description comes here",
//               },
//               {
//                 eventId: 22,
//                 description: "description comes here",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         7: [
//           {
//             12: [
//               {
//                 eventId: 3,
//                 description: "description comes here",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// // console.log("newEventsAll", newEventsAll);

// for(let y of newEventsAll) {
//   // console.log("year", y);
//   for(let m in y) {
//     // console.log("month", y[m]);
//     for(let d of y[m]) {
//       // console.log("date", d);
//       for(let day in d) {
//         // console.log("day", d[day]);
//         for(let event of d[day]) {
//           // console.log("event", event);
//           for(let individual in event) {
//             // console.log("individualData", event[individual]);
//             for(let finalData of event[individual]) {
//               console.log("finalData", finalData);
//             }
//           }
//         }
//       }
//     }
//   }
// }
