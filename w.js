function goToLogin() {
  document.getElementById('signupPage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
}

function goToSignup() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('signupPage').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
}

function activateSOS() {
    alert("Emergency contacts were alerted!");
}

function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('signupPage').classList.remove('hidden');
}

var signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  var name = document.getElementById('signup-name').value;
  var email = document.getElementById('signup-email').value;
  var phone = document.getElementById('signup-phone').value;
  var password = document.getElementById('signup-password').value;
  var confirm = document.getElementById('signup-confirm').value;
  
  if(password !== confirm) {
    alert("Passwords don't match!");
    return;
  }
  
  var users = JSON.parse(localStorage.getItem('users')) || [];
  
  for(var i = 0; i < users.length; i++) {
    if(users[i].email === email) {
      alert("Email already registered!");
      return;
    }
  }
  
  var newUser = {
    name: name,
    email: email,
    phone: phone,
    password: password
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  alert("Account created! Now login.");
  goToLogin();
});

var loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;
  
  var users = JSON.parse(localStorage.getItem('users')) || [];
  
  var found = false;
  for(var i = 0; i < users.length; i++) {
    if(users[i].email === email && users[i].password === password) {
      found = true;
      break;
    }
  }
  
  if(found) {
    alert("Login successful!");
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
  } else {
    alert("Invalid email or password!");
  }
});

function logout() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('signupPage').classList.remove('hidden');
}


var contactForm = document.getElementById('addContactForm');


contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var name = document.getElementById('contact-name').value;
  var phone = document.getElementById('contact-phone').value;
  var email = document.getElementById('contact-email').value;
  var relation = document.getElementById('contact-relation').value;
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
  
  var newContact = {
    id: Date.now(),
    name: name,
    phone: phone,
    email: email,
    relation: relation
  };
  
  contacts.push(newContact);
 
  localStorage.setItem('contacts', JSON.stringify(contacts));

  contactForm.reset();
  
  displayContacts();
});

function displayContacts() {
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var container = document.getElementById('contactsList');
  
  container.innerHTML = '';  // Clear previous
  
  for(var i = 0; i < contacts.length; i++) {
    var contact = contacts[i];
    
    var html = '<div class="contact-card">' +
      '<p>Name: ' + contact.name + '</p>' +
      '<p>Phone: ' + contact.phone + '</p>' +
      '<p>Email: ' + contact.email + '</p>' +
      '<p>Relation: ' + contact.relation + '</p>' +
      '<button onclick="deleteContact(' + contact.id + ')">Delete</button>' +
      '</div>';
    
    container.innerHTML += html;
  }
}

function deleteContact(id) {
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  contacts = contacts.filter(function(c) {
    return c.id !== id;
  });
  

  localStorage.setItem('contacts', JSON.stringify(contacts));
  
  displayContacts();
}

window.addEventListener('load', function() {
  displayContacts();
});

var allTips = [
  {
    id: 1,
    category: 'Travel',
    title: 'Night Travel Safety',
    content: 'Always inform someone about your route. Share your location with trusted contacts. Use well-lit routes and avoid shortcuts through isolated areas.'
  },
  {
    id: 2,
    category: 'Travel',
    title: 'Public Transport Safety',
    content: 'Sit near the driver or conductor. Avoid empty compartments. Keep your belongings close. Stay alert and trust your instincts.'
  },
  {
    id: 3,
    category: 'Home',
    title: 'Home Security Basics',
    content: 'Keep doors and windows locked. Use strong passwords. Install security cameras if possible. Know your neighbors. Keep emergency numbers visible.'
  },
  {
    id: 4,
    category: 'Home',
    title: 'Alone at Home',
    content: 'Lock doors behind you. Don\'t open door for strangers. Keep phone charged. Have trusted contacts available. Don\'t advertise that you\'re alone.'
  },
  {
    id: 5,
    category: 'Work',
    title: 'Workplace Safety',
    content: 'Know your company\'s safety protocols. Report uncomfortable behavior. Use buddy system for late hours. Trust your instincts about coworkers.'
  },
  {
    id: 6,
    category: 'Work',
    title: 'Late Night Work',
    content: 'Inform HR about late working hours. Use company transport. Stay in well-lit areas. Keep security on speed dial. Never stay alone in empty office.'
  },
  {
    id: 7,
    category: 'Online',
    title: 'Online Safety',
    content: 'Don\'t share personal information with strangers. Use strong passwords. Be cautious of links from unknown sources. Report suspicious behavior.'
  },
  {
    id: 8,
    category: 'Online',
    title: 'Social Media Safety',
    content: 'Keep your profile private. Limit location sharing. Don\'t accept friends from unknown people. Report harassment. Don\'t meet strangers alone.'
  },
  {
    id: 9,
    category: 'Self-Defense',
    title: 'Basic Self-Defense Tips',
    content: 'Stay aware of surroundings. Trust your instincts. Carry safety devices (whistle, pepper spray). Take a self-defense class. Confidence deters attackers.'
  },
  {
    id: 10,
    category: 'Self-Defense',
    title: 'What To Do If Followed',
    content: 'Go to nearest police station or crowded place. Call 100 immediately. Make noise and attract attention. Don\'t go home directly. Stay calm.'
  }
];

function displayTips(tipsToShow) {
  var container = document.getElementById('tipsList');
  container.innerHTML = '';
  
  if(tipsToShow.length === 0) {
    container.innerHTML = '<p class="no-tips">No tips found. Try a different search.</p>';
    return;
  }
  
  for(var i = 0; i < tipsToShow.length; i++) {
    var tip = tipsToShow[i];
    
    var html = '<div class="tip-card">' +
      '<span class="tip-category">' + tip.category + '</span>' +
      '<h3 class="tip-title">' + tip.title + '</h3>' +
      '<p class="tip-content">' + tip.content + '</p>' +
      '</div>';
    
    container.innerHTML += html;
  }
}

function filterTips(category) {

  var buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function(btn) {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  var filtered = allTips;
  if(category !== 'all') {
    filtered = allTips.filter(function(tip) {
      return tip.category === category;
    });
  }
  
  displayTips(filtered);
}

var searchInput = document.getElementById('searchTips');
searchInput.addEventListener('keyup', function() {
  var searchTerm = searchInput.value.toLowerCase();
  
  var filtered = allTips.filter(function(tip) {
    return tip.title.toLowerCase().includes(searchTerm) || 
           tip.content.toLowerCase().includes(searchTerm);
  });
  
  displayTips(filtered);
});

window.addEventListener('load', function() {
  displayTips(allTips);
});

function activateSOS() {

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      
      var locationText = "📍 Location: " + lat.toFixed(4) + ", " + lon.toFixed(4);
      document.getElementById('sosLocation').textContent = locationText;
      
      window.sosLocation = {lat: lat, lon: lon};
      
      document.getElementById('sosModal').classList.remove('hidden');
    }, function(error) {
      alert("Could not get location. Make sure location is enabled.");
      window.sosLocation = null;
      document.getElementById('sosModal').classList.remove('hidden');
    });
  } else {
    alert("Location not supported on this device");
    document.getElementById('sosModal').classList.remove('hidden');
  }
}

function confirmSOS() {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
  if(contacts.length === 0) {
    alert("⚠️ No emergency contacts added! Add contacts first.");
    closeSOS();
    return;
  }
  
  var location = window.sosLocation ? 
    "Location: " + window.sosLocation.lat.toFixed(4) + ", " + window.sosLocation.lon.toFixed(4) :
    "Location: Not available";
  
  var message = "🚨 EMERGENCY! " + currentUser.name + " needs help!\n" + location;
  
  console.log("SOS Alert sent to contacts:");
  for(var i = 0; i < contacts.length; i++) {
    console.log("📞 " + contacts[i].name + ": " + contacts[i].phone);
  }
  
  alert("🚨 SOS ACTIVATED!\nAlerts sent to " + contacts.length + " contacts!");
  closeSOS();
}

function closeSOS() {
  document.getElementById('sosModal').classList.add('hidden');
  window.sosLocation = null;
}

// ===== FAKE CALL - POPULATE CONTACTS =====
function populateContactSelector() {
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var select = document.getElementById('contactSelect');
  
  select.innerHTML = '<option value="">Select Emergency Contact</option>';
  
  contacts.forEach(function(contact, index) {
    var option = document.createElement('option');
    option.value = index;
    option.textContent = contact.name + ' (' + contact.relation + ')';
    select.appendChild(option);
  });
}

// ===== START FAKE CALL =====
function startFakeCall() {
  var select = document.getElementById('contactSelect');
  var selectedIndex = select.value;
  
  if(selectedIndex === '') {
    alert("Please select a contact first!");
    return;
  }
  
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var selectedContact = contacts[selectedIndex];
  
  window.selectedCaller = selectedContact;
  
  document.getElementById('callerName').textContent = selectedContact.name;
  document.getElementById('callerRelation').textContent = selectedContact.relation;
  document.getElementById('callerAvatar').textContent = getAvatarEmoji(selectedContact.relation);
  
  document.getElementById('callModal').classList.remove('hidden');
}

// ===== GET AVATAR EMOJI =====
function getAvatarEmoji(relation) {
  var emojis = {
    'Mother': '👩',
    'Father': '👨',
    'Sister': '👩',
    'Brother': '👨',
    'Friend': '👤',
    'Police': '👮',
    'Doctor': '👨‍⚕️'
  };
  
  return emojis[relation] || '👤';
}

// ===== ANSWER CALL =====
function answerCall() {
  document.getElementById('callModal').classList.add('hidden');
  document.getElementById('activeCall').classList.remove('hidden');
  
  var caller = window.selectedCaller;
  
  document.getElementById('activeCaller').textContent = caller.name;
  
  var greetings = [
    "Hi! Are you okay? Where are you right now?",
    "Hey! I'm here for you. Are you safe?",
    "Hi! I just wanted to check on you. How are you?",
    "Is everything alright? You can talk to me."
  ];
  
  var greeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  setTimeout(function() {
    addAIMessage(greeting);
    speakMessage(greeting);
  }, 500);
  
  startCallTimer();
}

// ===== REJECT CALL =====
function rejectCall() {
  document.getElementById('callModal').classList.add('hidden');
}

// ===== GET AI RESPONSE =====
function getAIResponse(userMessage) {
  var message = userMessage.toLowerCase();
  
  var allResponses = {
    greetings: {
      triggers: ['hi', 'hello', 'hey', 'namaste'],
      responses: [
        "Hi! Are you okay? Where are you right now?",
        "Hey! I'm here for you. Are you safe?",
        "Hi! I just wanted to check on you. How are you?"
      ]
    },
    danger: {
      triggers: ['danger', 'help', 'emergency', 'threat', 'unsafe', 'scared'],
      responses: [
        "I understand you're in danger. Stay calm. I'm staying on the line with you.",
        "You're safe with me on the call. Keep this line open and tell me what's happening.",
        "Your safety matters. I'm here. Can you tell me where you are?"
      ]
    },
    location: {
      triggers: ['where', 'location', 'place', 'address'],
      responses: [
        "Can you describe your location? Any landmarks nearby?",
        "Try to move to a public place if possible. Tell me where you are heading.",
        "Stay in well-lit, crowded areas if you can."
      ]
    },
    police: {
      triggers: ['police', 'call police', 'contact', 'officer'],
      responses: [
        "I can help you contact police. Stay on this call while we arrange help.",
        "Police have been notified. You're doing great. Stay calm.",
        "Help is on the way. Keep this line open."
      ]
    },
    calm: {
      triggers: ['calm', 'okay', 'alright', 'fine', 'better'],
      responses: [
        "That's good. Keep breathing deeply. You're safe now.",
        "I'm glad you're okay. Do you want to continue this call?",
        "You handled this well. Remember SafeHer is always here for you."
      ]
    }
  };
  
  for(var category in allResponses) {
    var triggers = allResponses[category].triggers;
    for(var i = 0; i < triggers.length; i++) {
      if(message.includes(triggers[i])) {
        var responses = allResponses[category].responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }
  
  var defaultResponses = [
    "I'm listening. Tell me more.",
    "I understand. What else is happening?",
    "Take your time. I'm here for you.",
    "You're doing great. Keep talking.",
    "I'm here to support you through this."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ===== SEND MESSAGE =====
function sendMessage() {
  var input = document.getElementById('userInput');
  var message = input.value.trim();
  
  if(message === '') return;
  
  addUserMessage(message);
  
  setTimeout(function() {
    var aiResponse = getAIResponse(message);
    addAIMessage(aiResponse);
    speakMessage(aiResponse);
  }, 800);
  
  input.value = '';
  input.focus();
}

// ===== ADD USER MESSAGE =====
function addUserMessage(message) {
  var conversation = document.getElementById('conversation');
  var div = document.createElement('div');
  div.className = 'message user';
  div.textContent = message;
  conversation.appendChild(div);
  conversation.scrollTop = conversation.scrollHeight;
}

// ===== ADD AI MESSAGE =====
function addAIMessage(message) {
  var conversation = document.getElementById('conversation');
  var div = document.createElement('div');
  div.className = 'message ai';
  div.textContent = message;
  conversation.appendChild(div);
  conversation.scrollTop = conversation.scrollHeight;
}

// ===== SPEAK MESSAGE =====
function speakMessage(message) {
  if('speechSynthesis' in window) {
    var utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

// ===== VOICE INPUT =====
function startVoiceInput() {
  if(!('webkitSpeechRecognition' in window)) {
    alert("Voice input not supported on your browser");
    return;
  }
  
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-IN';
  
  recognition.start();
  
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    document.getElementById('userInput').value = transcript;
  };
  
  recognition.onerror = function(event) {
    console.log("Voice error: " + event.error);
  };
}

// ===== HANDLE KEY PRESS =====
function handleKeyPress(event) {
  if(event.key === 'Enter') {
    sendMessage();
  }
}

// ===== CALL TIMER =====
var callStartTime = 0;

function startCallTimer() {
  callStartTime = Date.now();
  
  setInterval(function() {
    var elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    var mins = Math.floor(elapsed / 60);
    var secs = elapsed % 60;
    
    var time = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
    document.getElementById('callTimer').textContent = time;
  }, 1000);
}

// ===== END CALL =====
function endCall() {
  window.speechSynthesis.cancel();
  document.getElementById('activeCall').classList.add('hidden');
  document.getElementById('conversation').innerHTML = '';
  document.getElementById('userInput').value = '';
  document.getElementById('callTimer').textContent = '00:00';
  
  alert("Call ended. Stay safe! 💜");
}

// ===== SOS ACTIVATION =====
function activateSOS() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      
      var locationText = "📍 Location: " + lat.toFixed(4) + ", " + lon.toFixed(4);
      document.getElementById('sosLocation').textContent = locationText;
      
      window.sosLocation = {lat: lat, lon: lon};
      
      document.getElementById('sosModal').classList.remove('hidden');
    }, function(error) {
      alert("Could not get location. Make sure location is enabled.");
      window.sosLocation = null;
      document.getElementById('sosModal').classList.remove('hidden');
    });
  } else {
    alert("Location not supported on this device");
    document.getElementById('sosModal').classList.remove('hidden');
  }
}

// ===== CONFIRM SOS =====
function confirmSOS() {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
  if(contacts.length === 0) {
    alert("⚠️ No emergency contacts added! Add contacts first.");
    closeSOS();
    return;
  }
  
  var location = window.sosLocation ? 
    "Location: " + window.sosLocation.lat.toFixed(4) + ", " + window.sosLocation.lon.toFixed(4) :
    "Location: Not available";
  
  var message = "🚨 EMERGENCY! " + currentUser.name + " needs help!\n" + location;
  
  console.log("SOS Alert sent to contacts:");
  for(var i = 0; i < contacts.length; i++) {
    console.log("📞 " + contacts[i].name + ": " + contacts[i].phone);
  }
  
  alert("🚨 SOS ACTIVATED!\nAlerts sent to " + contacts.length + " contacts!");
  closeSOS();
}

// ===== CLOSE SOS =====
function closeSOS() {
  document.getElementById('sosModal').classList.add('hidden');
  window.sosLocation = null;
}
function logout() {
  localStorage.removeItem('currentUser');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('signupPage').classList.remove('hidden');
  alert("Logged out successfully!");
}

window.addEventListener('load', function() {
  displayTips(allTips);
  displayContacts();
  populateContactSelector();
  
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentUser) {
    document.getElementById('userName').textContent = currentUser.name;
  }
});