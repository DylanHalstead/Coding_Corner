const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

const events = [
  {
    id: '1',
    category: 'Gaming',
    title: 'OW2 Diamond Climb',
    details: 'loremodwnoindoinoidnsaoi',
    host: 'DillyBags',
    start: '3/12/2023, 6:30 AM',
    end: '3/12/2023, 9:30 AM',
    location: 'Levine 220',
    imagePath: '/images/event.jpg'
  },
  {
    id: '2',
    category: 'School',
    title: 'Calc 2 Study Group',
    details: 'Id donec ultrices tincidunt arcu non sodales neque. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Varius vel pharetra vel turpis nunc eget lorem dolor.',
    host: 'Nathan',
    start: '4/18/2023, 7:00 PM',
    end: '4/18/2023, 9:00 PM',
    location: 'Woodward 130',
    imagePath: '/images/event.jpg'
  },
  {
    id: '3',
    category: 'Gaming',
    title: 'Valorant Ascendant Comp',
    details: 'Laoreet id donec ultrices tincidunt arcu non. Sed turpis tincidunt id aliquet risus feugiat. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Felis eget nunc lobortis mattis aliquam faucibus purus in massa.',
    host: 'HoneyNut',
    start: '3/28/2023, 3:50 PM',
    end: '3/28/2023, 9:50 PM',
    location: 'Atkins G38',
    imagePath: '/images/event.jpg'
  },
  {
    id: '4',
    category: 'Other',
    title: 'Super Swag Meetup',
    details: 'In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Ultrices mi tempus imperdiet nulla malesuada pellentesque.',
    host: '',
    start: '4/12/2023, 1:30 AM',
    end: '4/13/2023, 5:30 PM',
    location: 'Friday 110',
    imagePath: '/images/event.jpg'
  },
  {
    id: '5',
    category: 'Cinema',
    title: 'The Whale',
    details: 'Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis.',
    host: 'JibbleNut',
    start: '3/22/2023, 5:45 PM',
    end: '3/22/2023, 8:00 PM',
    location: 'Concord Mills',
    imagePath: '/images/event.jpg'
  },
  {
    id: '8',
    category: 'Gaming',
    title: 'Minecraft Hunger Games',
    details: 'Quis auctor elit sed vulputate mi sit amet mauris commodo. Accumsan sit amet nulla facilisi morbi tempus iaculis. ',
    host: 'LittleTimmy',
    start: '5/5/2023, 7:40 PM',
    end: '5/5/2023, 8:45 PM',
    location: 'Online',
    imagePath: '/images/event.jpg'
  },
  {
    id: '9',
    category: 'Gaming',
    title: 'LAN Meetup',
    details: 'Platea dictumst quisque sagittis purus sit amet volutpat. Neque convallis a cras semper.',
    host: 'LinusS',
    start: '4/9/2023, 4:30 AM',
    end: '4/9/2023, 10:00 AM',
    location: 'Woodward 120',
    imagePath: '/images/event.jpg'
  },
  {
    id: '10',
    category: 'Cinema',
    title: 'Beau is Afraid',
    details: 'Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Lacus viverra vitae congue eu consequat ac felis.',
    host: 'Dylan Halstead',
    start: '2/28/2023, 10:45 AM',
    end: '2/28/2023, 12:45 PM',
    location: 'Regal Birkdale',
    imagePath: '/images/event.jpg'
  },
  {
    id: '11',
    category: 'Cinema',
    title: 'Shang Chi Watch Party',
    details: 'Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Ultricies tristique nulla aliquet enim tortor. Semper viverra nam libero justo laoreet sit amet cursus. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam.',
    host: 'MarvelHead',
    start: '4/23/2023, 2:40 AM',
    end: '4/23/2023, 4:00 AM',
    location: 'Wallis 330',
    imagePath: '/images/event.jpg'
  },
  {
    id: '12',
    category: 'Gaming',
    title: 'Mario Party Meetup',
    details: 'Mario Time',
    host: 'NintendoSuperStar',
    start: '3/13/2023, 4:15 PM',
    end: '3/13/2023, 6:15 PM',
    location: 'Stanford 120',
    imagePath: '/images/event.jpg'
  },
  {
    id: '13',
    category: 'School',
    title: 'Linear Algebra Homework',
    details: 'Gravida neque convallis a cras semper auctor neque vitae. Diam maecenas ultricies mi eget mauris pharetra et ultrices.',
    host: 'Sumi Verma',
    start: '4/29/2023, 9:50 AM',
    end: '4/29/2023, 10:40 AM',
    location: 'Discord',
    imagePath: '/images/event.jpg'
  },
  {
    id: '14',
    category: 'School',
    title: '(Group 8) 3155 Spring',
    details: 'Urna id volutpat lacus laoreet non. Eros in cursus turpis massa tincidunt dui ut ornare. Velit ut tortor pretium viverra.',
    host: 'Krevats Children',
    start: '2/25/2023, 10:55 PM',
    end: '2/25/2023, 11:15 PM',
    location: 'Woodward 130',
    imagePath: '/images/event.jpg'
  },
  {
    id: '15',
    category: 'School',
    title: 'Net App Project Brainstorming',
    details: 'Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Sed nisi lacus sed viverra tellus in hac habitasse platea',
    host: 'Cao',
    start: '3/7/2023, 1:55 PM',
    end: '3/7/2023, 3:00 PM',
    location: 'Levine 243',
    imagePath: '/images/event.jpg'
  },
  {
    id: '16',
    category: 'Gaming',
    title: 'Rocket League Duo?',
    details: 'Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique.',
    host: 'Anonymous',
    start: '4/15/2023, 6:25 PM',
    end: '4/15/2023, 7:30 PM',
    location: 'Online',
    imagePath: '/images/event.jpg'
  },
  {
    id: '17',
    category: 'Gaming',
    title: 'UNCC Smash Tourney',
    details: 'Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Egestas erat imperdiet sed euismod nisi porta. Orci nulla pellentesque dignissim enim.',
    host: 'OldHead',
    start: '3/17/2023, 5:10 AM',
    end: '3/17/2023, 6:00 AM',
    location: 'Union',
    imagePath: '/images/event.jpg'
  },
  {
    id: '19',
    category: 'Cinema',
    title: 'Charlotte Cinemaholics: Thriller',
    details: 'Tellus mauris a diam maecenas sed enim ut sem. Sociis natoque penatibus et magnis dis parturient. Dolor magna eget est lorem. Sed viverra ipsum nunc aliquet bibendum.',
    host: 'SmoothCriminal',
    start: '3/31/2023, 7:30 AM',
    end: '3/31/2023, 9:30 AM',
    location: '1300 Varsity Ln, Charlotte, NC 28262',
    imagePath: '/images/event.jpg'
  },
];

exports.find = () => events;

exports.sorted = () => {
  const sortedEvents = [[],[],[],[],[]]
  // Sort events by category
  events.forEach(event => {
    switch(event.category){
      case 'School':
        sortedEvents[0].push(event);
        break;
      case 'Gaming':
        sortedEvents[1].push(event);
        break;
      case 'Event':
        sortedEvents[2].push(event);
        break;
      case 'Cinema':
        sortedEvents[3].push(event);
        break;
      default:
        sortedEvents[4].push(event);
    }
  });
  // Sort events by date
  sortedEvents.forEach(category => {
    category.sort((a, b) => {
      return DateTime.fromFormat(a.start, 'D, t').toMillis() - DateTime.fromFormat(b.start, 'D, t').toMillis();
    });
  });
  return sortedEvents;
}

exports.findById = id => events.find(event => event.id === id);

exports.save = (event, image) => {
  event.id = uuidv4();
  event.start = DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_SHORT);
  event.end = DateTime.fromISO(event.end).toLocaleString(DateTime.DATETIME_SHORT);
  event.imagePath = `/images/events/${image.name}`;
  // save event img to server
  image.mv(`${__dirname}/../public/${event.imagePath}`);
  events.push(event);
}

// creates ISO times from events times for edit form
exports.dateToISO = time => {
    return DateTime.fromFormat(time, 'D, t').toISO({ includeOffset: false });
};

exports.updateById = function(id, newEvent) {
  let event = events.find(event => event.id === id);
  if(!event) return false;
  event.category = newEvent.category;
  event.host = newEvent.host;
  event.title = newEvent.title;
  event.details = newEvent.details;
  event.start = DateTime.fromISO(newEvent.start).toLocaleString(DateTime.DATETIME_SHORT);
  event.end = DateTime.fromISO(newEvent.end).toLocaleString(DateTime.DATETIME_SHORT);
  event.location = newEvent.location;
  return true;
};

exports.deleteById = function(id) {
  let index = events.findIndex(event => event.id === id);
  if (index === -1) {
    return true;
  }
  events.splice(index, 1);
  return true;
};