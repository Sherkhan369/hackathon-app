// // ============================================================
// // API CONFIGURATION
// // ============================================================
// const API_BASE = 'https://hackathon-setup.vercel.app/api';

// function getToken() { return ls('hh_token'); }
// function setToken(token) { lsSet('hh_token', token); }
// function removeToken() { try { localStorage.removeItem('hh_token'); } catch(e) {} }

// async function apiCall(endpoint, options = {}) {
//   const token = getToken();
//   const headers = { 'Content-Type': 'application/json', ...options.headers };
//   if (token) headers['Authorization'] = `Bearer ${token}`;

//   try {
//     const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

//     if (!res.ok) {
//       let errorMsg = 'Request failed';
//       try {
//         const data = await res.json();
//         errorMsg = data.msg || errorMsg;
//       } catch (e) {
//         errorMsg = `Server error: ${res.status}`;
//       }

//       if (res.status === 401) {
//         removeToken();
//         isLoggedIn = false;
//         lsSet('hh_loggedIn', 'false');
//         currentUser = null;
//         navigate('login');
//         throw new Error('Session expired. Please login again.');
//       }
//       throw new Error(errorMsg);
//     }

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     if (err.message.includes('fetch')) {
//       throw new Error('Network error. Please check your connection.');
//     }
//     throw err;
//   }
// }

// // ============================================================
// // DATA
// // ============================================================
// const USERS = [
//   { id:'u1', name:'Ayesha Khan', email:'ayesha@helphub.ai', role:'both', skills:['Figma','UI/UX','HTML/CSS','Career Guidance'], interests:['Hackathons','UI/UX','Community Building'], location:'Karachi', trustScore:100, contributions:35, badges:['Design Ally','Fast Responder','Top Mentor'], joinedDate:'2025-09-01' },
//   { id:'u2', name:'Hassan Ali', email:'hassan@helphub.ai', role:'can-help', skills:['JavaScript','React','Git/GitHub'], interests:['Open Source','Web Dev','Teaching'], location:'Karachi', trustScore:88, contributions:24, badges:['Code Rescuer','Bug Hunter'], joinedDate:'2025-10-01' },
//   { id:'u3', name:'Sara Noor', email:'sara@helphub.ai', role:'need-help', skills:['Python','Data Analysis'], interests:['Machine Learning','Statistics'], location:'Lahore', trustScore:74, contributions:11, badges:['Community Voice'], joinedDate:'2025-11-01' },
//   { id:'u4', name:'Bilal Ahmed', email:'bilal@helphub.ai', role:'both', skills:['Node.js','MongoDB','Express'], interests:['Backend Dev','APIs'], location:'Islamabad', trustScore:82, contributions:19, badges:['Backend Pro'], joinedDate:'2025-10-15' },
//   { id:'u5', name:'Fatima Zahra', email:'fatima@helphub.ai', role:'can-help', skills:['React','TypeScript','Tailwind CSS'], interests:['Frontend Dev','Design Systems'], location:'Remote', trustScore:91, contributions:28, badges:['Frontend Master','Mentor Star'], joinedDate:'2025-09-15' },
// ];

// const BASE_REQUESTS = [
//   { id:'r1', title:'Need help', description:'Help needed with a coding problem.', status:'solved', urgency:'high', category:'Web Development', tags:[], createdBy:'u1', helpers:['u2'], location:'Karachi', createdAt:'2026-04-18T08:00:00Z', updatedAt:'2026-04-18T14:00:00Z' },
//   { id:'r2', title:'Need help making my portfolio responsive before demo day', description:'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.', status:'solved', urgency:'high', category:'Web Development', tags:['HTML/CSS','Responsive','Portfolio'], createdBy:'u3', helpers:['u1'], location:'Karachi', createdAt:'2026-04-17T10:00:00Z', updatedAt:'2026-04-18T09:00:00Z' },
//   { id:'r3', title:'Looking for Figma feedback on a volunteer event poster', description:'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.', status:'open', urgency:'medium', category:'Design', tags:['Figma','Poster','Design Review'], createdBy:'u1', helpers:['u2'], location:'Lahore', createdAt:'2026-04-16T14:00:00Z', updatedAt:'2026-04-17T11:00:00Z' },
//   { id:'r4', title:'Need mock interview support for internship applications', description:'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.', status:'solved', urgency:'low', category:'Career', tags:['Interview Prep','Career','Frontend'], createdBy:'u3', helpers:['u1','u2'], location:'Remote', createdAt:'2026-04-15T09:00:00Z', updatedAt:'2026-04-18T12:00:00Z' },
//   { id:'r5', title:'Need review on my JavaScript quiz app before submission', description:'Built a quiz app using vanilla JS and localStorage. Need someone to check logic, UI, and edge cases before I submit.', status:'open', urgency:'high', category:'Web Development', tags:['JavaScript','Debugging','Review'], createdBy:'u4', helpers:[], location:'Islamabad', createdAt:'2026-04-18T06:00:00Z', updatedAt:'2026-04-18T06:00:00Z' },
//   { id:'r6', title:'Help with Python data visualization for class project', description:'Need help creating matplotlib charts from CSV data for my data science class presentation.', status:'open', urgency:'medium', category:'Data Science', tags:['Python','Matplotlib','Data Viz'], createdBy:'u3', helpers:[], location:'Lahore', createdAt:'2026-04-17T16:00:00Z', updatedAt:'2026-04-17T16:00:00Z' },
//   { id:'r7', title:'Setting up Git workflow for team project', description:'Our group project needs proper branching strategy. Looking for someone experienced with Git/GitHub collaboration.', status:'in-progress', urgency:'medium', category:'DevOps', tags:['Git','GitHub','Collaboration'], createdBy:'u4', helpers:['u2'], location:'Islamabad', createdAt:'2026-04-16T11:00:00Z', updatedAt:'2026-04-18T10:00:00Z' },
// ];

// const BASE_MESSAGES = [
//   { id:'cm1', fromUserId:'u1', toUserId:'u3', content:'I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.', timestamp:'2026-04-18T09:45:00Z' },
//   { id:'cm2', fromUserId:'u2', toUserId:'u1', content:'Your event poster concept is solid. I would tighten the CTA and reduce the background texture.', timestamp:'2026-04-18T11:10:00Z' },
//   { id:'cm3', fromUserId:'u3', toUserId:'u1', content:'Thanks for the mock interview help! The behavioral tips were really useful.', timestamp:'2026-04-18T13:00:00Z' },
//   { id:'cm4', fromUserId:'u1', toUserId:'u2', content:'Can you also review the mobile nav on my portfolio? It collapses weirdly.', timestamp:'2026-04-18T14:30:00Z' },
// ];

// const BASE_NOTIFS = [
//   { id:'n1', type:'status', title:'"Need help" was marked as solved', timestamp:'2026-04-18T14:00:00Z', read:false },
//   { id:'n2', type:'match', title:'Ayesha Khan offered help on "Need help"', timestamp:'2026-04-18T13:55:00Z', read:false },
//   { id:'n3', type:'request', title:'Your request "Need help" is now live in the community feed', timestamp:'2026-04-18T13:50:00Z', read:false },
//   { id:'n4', type:'status', title:'"Need help making my portfolio responsive" was marked as solved', timestamp:'2026-04-18T13:00:00Z', read:false },
//   { id:'n5', type:'reputation', title:'Your trust score increased after a solved request', timestamp:'2026-04-18T10:00:00Z', read:false },
//   { id:'n6', type:'insight', title:'AI Center detected rising demand for interview prep', timestamp:'2026-04-18T08:00:00Z', read:true },
//   { id:'n7', type:'match', title:'Fatima Zahra wants to help with your quiz app review', timestamp:'2026-04-17T18:00:00Z', read:true },
// ];

// const CATEGORIES = ['All','Web Development','Design','Career','Data Science','Mobile Development','DevOps','Community'];

// const CATEGORY_BADGE = { 'Web Development':'badge-teal','Design':'badge-violet','Career':'badge-teal','Data Science':'badge-blue','Mobile Development':'badge-amber','DevOps':'badge-slate','Community':'badge-stone' };
// const URGENCY_BADGE = { 'low':'badge-blue','medium':'badge-amber','high':'badge-red' };
// const STATUS_BADGE = { 'open':'badge-stone','in-progress':'badge-amber','solved':'badge-green' };
// const STATUS_LABEL = { 'open':'Open','in-progress':'In Progress','solved':'Solved' };
// const AVATAR_COLORS = ['av-teal','av-orange','av-pink','av-blue','av-violet'];
// const BADGE_COLORS = { 'Design Ally':'badge-teal','Fast Responder':'badge-amber','Top Mentor':'badge-blue','Code Rescuer':'badge-green','Bug Hunter':'badge-red','Community Voice':'badge-amber','Backend Pro':'badge-violet','Frontend Master':'badge-teal','Mentor Star':'badge-amber' };

// // ============================================================
// // STATE
// // ============================================================
// let currentUser = null;
// let isLoggedIn = !!getToken();
// let allRequests = [];
// let customRequests = lsJSON('hh_custom_requests') || [];
// let messages = lsJSON('hh_messages') || BASE_MESSAGES;
// let notifications = lsJSON('hh_notifications') || BASE_NOTIFS;

// function ls(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
// function lsSet(k,v) { try { localStorage.setItem(k,v); } catch(e) {} }
// function lsJSON(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch(e) { return null; } }
// function lsSetJSON(k,v) { try { localStorage.setItem(k,JSON.stringify(v)); } catch(e) {} }

// function getAllRequests() { return allRequests; }
// function getCurrentUser() { return currentUser; }
// function getUserById(id) { return USERS.find(u => u.id === id); }
// function getInitials(name) { return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

// // ============================================================
// // NAVIGATION
// // ============================================================
// const PAGES = ['home','login','signup','dashboard','explore','create','messages','leaderboard','ai-center','notifications','profile'];
// const PROTECTED_PAGES = ['dashboard','create','messages','notifications','profile'];
// let currentPage = 'home';

// function navigate(page) {
//   if (PROTECTED_PAGES.includes(page) && !isLoggedIn) {
//     alert('Please login to access this page');
//     navigate('login');
//     return;
//   }

//   PAGES.forEach(p => {
//     const el = document.getElementById('page-'+p);
//     if(el) el.classList.toggle('active', p===page);
//   });
//   currentPage = page;
//   updateNav();
//   if(page==='home') renderHome();
//   if(page==='dashboard') renderDashboard();
//   if(page==='explore') renderExplore();
//   if(page==='create') renderCreate();
//   if(page==='messages') renderMessages();
//   if(page==='leaderboard') renderLeaderboard();
//   if(page==='ai-center') renderAICenter();
//   if(page==='notifications') renderNotifications();
//   if(page==='profile') renderProfile();
//   window.scrollTo({top:0,behavior:'smooth'});
// }

// function updateNav() {
//   const loggedIn = isLoggedIn;
//   const publicLinks = [{l:'Home',p:'home'},{l:'Explore',p:'explore'},{l:'Leaderboard',p:'leaderboard'},{l:'AI Center',p:'ai-center'}];
//   const authLinks = [{l:'Dashboard',p:'dashboard'},{l:'Explore',p:'explore'},{l:'Create',p:'create'},{l:'Messages',p:'messages'},{l:'Leaderboard',p:'leaderboard'},{l:'AI Center',p:'ai-center'},{l:'Notifications',p:'notifications'},{l:'Profile',p:'profile'}];
//   const links = loggedIn ? authLinks : publicLinks;
//   const navLinks = document.getElementById('navLinks');
//   navLinks.innerHTML = links.map(({l,p})=>`<button class="nav-link${currentPage===p?' active':''}" onclick="navigate('${p}')">${l}</button>`).join('');
//   const navActions = document.getElementById('navActions');
//   if(!loggedIn) {
//     navActions.innerHTML = `<button class="btn-outline" onclick="navigate('explore')">Live signals</button><button class="btn-primary-sm" onclick="navigate('signup')">Join the platform</button>`;
//   } else {
//     navActions.innerHTML = `<button class="btn-outline" onclick="handleLogout()">Sign out</button>`;
//   }
// }

// // ============================================================
// // AUTH
// // ============================================================
// async function handleLogin() {
//   try {
//     const email = document.getElementById('loginEmail')?.value || 'ayesha@helphub.ai';
//     const password = document.getElementById('loginPassword')?.value || 'password123';

//     const data = await apiCall('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password })
//     });

//     setToken(data.token);
//     currentUser = data.user;
//     isLoggedIn = true;
//     lsSet('hh_loggedIn', 'true');

//     await loadUserProfile();
//     navigate('dashboard');
//   } catch (err) {
//     alert(err.message || 'Login failed. Please try again.');
//   }
// }

// async function handleRegister() {
//   try {
//     const name = document.getElementById('signupName')?.value;
//     const email = document.getElementById('signupEmail')?.value;
//     const password = document.getElementById('signupPassword')?.value;
//     const role = document.getElementById('signupRole')?.value;

//     if (!name || !email || !password) {
//       alert('Please fill all fields');
//       return;
//     }

//     const data = await apiCall('/auth/signup', {
//       method: 'POST',
//       body: JSON.stringify({ name, email, password, role })
//     });

//     setToken(data.token);
//     currentUser = data.user;
//     isLoggedIn = true;
//     lsSet('hh_loggedIn', 'true');

//     alert('Registration successful! Welcome to HelpHub AI.');
//     navigate('dashboard');
//   } catch (err) {
//     alert(err.message || 'Registration failed. Please try again.');
//   }
// }

// async function handleSignup() {
//   await handleRegister();
// }

// function handleLogout() {
//   removeToken();
//   currentUser = null;
//   isLoggedIn = false;
//   allRequests = [];
//   lsSet('hh_loggedIn', 'false');
//   navigate('home');
// }

// async function loadUserProfile() {
//   try {
//     const user = await apiCall('/user/me');
//     currentUser = user;
//   } catch (err) {
//     console.error('Failed to load profile:', err);
//   }
// }

// async function loadRequests() {
//   try {
//     const requests = await apiCall('/requests');
//     allRequests = requests;
//   } catch (err) {
//     console.error('Failed to load requests:', err);
//     allRequests = [];
//   }
// }

// // ============================================================
// // RENDER HELPERS
// // ============================================================
// function feedCard(req) {
//   const catClass = CATEGORY_BADGE[req.category] || 'badge-stone';
//   const urgClass = URGENCY_BADGE[req.urgency] || 'badge-stone';
//   const statClass = STATUS_BADGE[req.status] || 'badge-stone';
//   const creator = req.user || { name: 'Unknown', _id: null };
//   const tags = req.tags && req.tags.length ? `<div class="feed-tags">${req.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>` : '';
//   const helpersCount = req.helpers ? req.helpers.length : 0;
//   const location = req.location || 'Remote';

//   return `<div class="glass-hover feed-card">
//     <div class="flex gap-2 flex-wrap">
//       <span class="badge ${catClass}">${req.category}</span>
//       <span class="badge ${urgClass}">${cap(req.urgency)}</span>
//       <span class="badge ${statClass}">${STATUS_LABEL[req.status]||req.status}</span>
//     </div>
//     <h3>${req.title}</h3>
//     <p class="feed-desc">${req.description}</p>
//     ${tags}
//     <div class="feed-footer">
//       <div>
//         <p class="feed-author">${creator.name}</p>
//         <p class="feed-meta">${location} • ${helpersCount} helper${helpersCount!==1?'s':''} interested</p>
//       </div>
//       <button class="btn-secondary" style="font-size:13px;padding:7px 14px;">Open details</button>
//     </div>
//   </div>`;
// }

// function cap(s) { return s.charAt(0).toUpperCase()+s.slice(1); }

// function statCard(label, value, sub) {
//   return `<div class="glass p-6"><p class="label mb-2">${label}</p><p class="stat-num">${value}</p><p style="font-size:13px;color:var(--text-400);margin-top:6px;">${sub}</p></div>`;
// }

// // ============================================================
// // HOME
// // ============================================================
// async function renderHome() {
//   await loadRequests();
//   const reqs = getAllRequests();
//   const solved = reqs.filter(r=>r.status==='solved').length;
//   const total = Math.max(reqs.length, 72);
//   document.getElementById('homeStats').innerHTML = `
//     <div><p class="hero-stat-label">Members</p><p class="hero-stat-num">384+</p><p class="hero-stat-desc">Students, mentors, and helpers in the loop.</p></div>
//     <div><p class="hero-stat-label">Requests</p><p class="hero-stat-num">${total}+</p><p class="hero-stat-desc">Support posts shared across learning journeys.</p></div>
//     <div><p class="hero-stat-label">Solved</p><p class="hero-stat-num">${Math.max(solved,69)}+</p><p class="hero-stat-desc">Problems resolved through fast community action.</p></div>
//   `;
//   document.getElementById('homeFeaturedCards').innerHTML = reqs.slice(0,3).map(feedCard).join('');
// }

// // ============================================================
// // DASHBOARD
// // ============================================================
// async function renderDashboard() {
//   const user = getCurrentUser();
//   if (!user) {
//     navigate('login');
//     return;
//   }

//   await loadRequests();
//   const reqs = getAllRequests();

//   document.getElementById('dashWelcome').textContent = `Welcome back, ${user.name}.`;
//   const myReqs = reqs.filter(r=>r.user?._id === user._id);
//   const urgentCount = reqs.filter(r=>r.urgency==='high').length;
//   const solvedCount = reqs.filter(r=>r.status==='solved').length;

//   document.getElementById('dashStats').innerHTML = [
//     statCard('MY REQUESTS', myReqs.length, 'Requests you posted'),
//     statCard('HELPING ON', 0, 'Requests you offered to help'),
//     statCard('URGENT', urgentCount, 'High priority requests active'),
//     statCard('COMMUNITY SOLVED', solvedCount, 'Problems resolved by the community'),
//   ].join('');

//   const trustScore = user.trustScore || 50;
//   document.getElementById('dashInsights').innerHTML = `
//     <div class="insight-teal" style="padding:1rem;border-radius:12px;"><p style="font-size:14px;font-weight:700;color:var(--text-700);">Trending: Web Development</p><p style="font-size:13px;color:var(--text-500);margin-top:4px;">Most active support area this week based on community requests.</p></div>
//     <div class="insight-amber" style="padding:1rem;border-radius:12px;"><p style="font-size:14px;font-weight:700;color:var(--text-700);">${urgentCount} urgent requests need attention</p><p style="font-size:13px;color:var(--text-500);margin-top:4px;">Flagged by the urgency detector for quick community response.</p></div>
//     <div class="insight-blue" style="padding:1rem;border-radius:12px;"><p style="font-size:14px;font-weight:700;color:var(--text-700);">Your trust score: ${trustScore}%</p><p style="font-size:13px;color:var(--text-500);margin-top:4px;">Keep contributing to maintain your top mentor status.</p></div>
//   `;
//   document.getElementById('dashRecentCards').innerHTML = reqs.slice(0,3).map(feedCard).join('');
// }

// // ============================================================
// // EXPLORE
// // ============================================================
// async function renderExplore() {
//   await loadRequests();
//   const catSel = document.getElementById('filterCat');
//   catSel.innerHTML = CATEGORIES.map(c=>`<option value="${c}">${c==='All'?'All categories':c}</option>`).join('');
//   filterRequests();
// }
// function filterRequests() {
//   const cat = document.getElementById('filterCat').value;
//   const urg = document.getElementById('filterUrg').value;
//   const skills = document.getElementById('filterSkills').value.toLowerCase();
//   const loc = document.getElementById('filterLoc').value.toLowerCase();
//   const reqs = getAllRequests().filter(r=>{
//     const matchCat = cat==='All' || r.category===cat;
//     const matchUrg = urg==='All urgency levels' || r.urgency.toLowerCase()===urg.toLowerCase();
//     const matchSkills = !skills || (r.tags && r.tags.some(t=>t.toLowerCase().includes(skills)));
//     const matchLoc = !loc || (r.location && r.location.toLowerCase().includes(loc));
//     return matchCat && matchUrg && matchSkills && matchLoc;
//   });
//   const container = document.getElementById('exploreCards');
//   container.innerHTML = reqs.length
//     ? reqs.map(feedCard).join('')
//     : `<div class="glass empty-state"><h3>No requests found</h3><p>Try adjusting your filters to see more results.</p></div>`;
// }

// // ============================================================
// // CREATE REQUEST
// // ============================================================
// function renderCreate() {
//   const catSel = document.getElementById('createCat');
//   catSel.innerHTML = CATEGORIES.filter(c=>c!=='All').map(c=>`<option>${c}</option>`).join('');
//   document.getElementById('createTitle').value = '';
//   document.getElementById('createDesc').value = '';
//   document.getElementById('createTags').value = '';
//   document.getElementById('publishBtn').disabled = true;
//   updateAI();
// }
// function getAI() {
//   const title = document.getElementById('createTitle').value;
//   const desc = document.getElementById('createDesc').value;
//   const text = (title + ' ' + desc).toLowerCase();
//   let category = 'Community', urgency = 'Low';
//   const tags = [];
//   if(/html|css|javascript|react|web|portfolio/.test(text)) category = 'Web Development';
//   else if(/figma|design|poster|ui/.test(text)) category = 'Design';
//   else if(/interview|career|internship/.test(text)) category = 'Career';
//   else if(/python|data|ml/.test(text)) category = 'Data Science';
//   if(/urgent|deadline|tomorrow|asap/.test(text)) urgency = 'High';
//   else if(/help|need|review/.test(text)) urgency = 'Medium';
//   if(text.length>20) {
//     const words = text.split(/\s+/).filter(w=>w.length>4);
//     [...new Set(words)].slice(0,3).forEach(w=>tags.push(w.charAt(0).toUpperCase()+w.slice(1)));
//   }
//   const rewrite = desc.length>30 ? `Rewritten: "${title}" — ${desc.slice(0,80)}... (AI-enhanced version with clearer structure)` : 'Start describing the challenge to generate a stronger version.';
//   return { category, urgency, tags, rewrite };
// }
// function updateAI() {
//   const title = document.getElementById('createTitle').value;
//   document.getElementById('publishBtn').disabled = !title.trim();
//   const ai = getAI();
//   document.getElementById('aiCat').textContent = ai.category;
//   document.getElementById('aiUrg').textContent = ai.urgency;
//   document.getElementById('aiTags').textContent = ai.tags.length ? ai.tags.join(', ') : 'Add more detail for smarter tags';
//   document.getElementById('aiRewrite').textContent = ai.rewrite;
// }
// function applyAI() {
//   const ai = getAI();
//   document.getElementById('createCat').value = ai.category;
//   document.getElementById('createUrg').value = ai.urgency;
//   if(ai.tags.length) document.getElementById('createTags').value = ai.tags.join(', ');
// }
// async function handlePublish() {
//   const title = document.getElementById('createTitle').value.trim();
//   if(!title) return;

//   try {
//     const newReq = {
//       title,
//       description: document.getElementById('createDesc').value,
//       urgency: document.getElementById('createUrg').value.toLowerCase(),
//       category: document.getElementById('createCat').value,
//       tags: document.getElementById('createTags').value.split(',').map(t=>t.trim()).filter(Boolean),
//       location: currentUser?.location || 'Remote',
//     };

//     await apiCall('/requests', {
//       method: 'POST',
//       body: JSON.stringify(newReq)
//     });

//     alert('Request published successfully!');
//     navigate('explore');
//   } catch (err) {
//     alert(err.message || 'Failed to publish request');
//   }
// }

// // ============================================================
// // MESSAGES
// // ============================================================
// function renderMessages() {
//   const user = getCurrentUser();
//   if (!user) {
//     navigate('login');
//     return;
//   }

//   const msgTo = document.getElementById('msgTo');
//   msgTo.innerHTML = USERS.filter(u=>u.email!==user.email).map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
//   renderMsgStream();
// }
// function renderMsgStream() {
//   const user = getCurrentUser();
//   if (!user) return;

//   const msgs = messages.filter(m=>m.fromUserId===user._id||m.toUserId===user._id);
//   const container = document.getElementById('msgStream');
//   if(!msgs.length) {
//     container.innerHTML = '<p style="font-size:14px;color:var(--text-400);padding:2rem 0;text-align:center;">No messages yet. Start a conversation!</p>';
//     return;
//   }
//   container.innerHTML = msgs.map(m=>{
//     const sender = getUserById(m.fromUserId);
//     const receiver = getUserById(m.toUserId);
//     return `<div class="msg-card">
//       <div class="msg-header">
//         <p class="msg-name">${sender?.name||'Unknown'} → ${receiver?.name||'Unknown'}</p>
//         <span class="msg-time">${formatTime(m.timestamp)}</span>
//       </div>
//       <p class="msg-text">${m.content}</p>
//     </div>`;
//   }).join('');
// }
// function toggleSendBtn() {
//   const val = document.getElementById('msgBody').value.trim();
//   document.getElementById('sendBtn').disabled = !val;
// }
// function sendMessage() {
//   const user = getCurrentUser();
//   if (!user) return;

//   const body = document.getElementById('msgBody').value.trim();
//   if(!body) return;
//   const toUser = document.getElementById('msgTo').value;
//   const msg = { id:'cm_'+Date.now(), fromUserId:user._id, toUserId:toUser, content:body, timestamp:new Date().toISOString() };
//   messages = [...messages, msg];
//   lsSetJSON('hh_messages', messages);
//   document.getElementById('msgBody').value = '';
//   document.getElementById('sendBtn').disabled = true;
//   renderMsgStream();
// }

// // ============================================================
// // LEADERBOARD
// // ============================================================
// function renderLeaderboard() {
//   const sorted = [...USERS].sort((a,b)=>b.trustScore-a.trustScore);
//   document.getElementById('lbRankings').innerHTML = sorted.map((u,i)=>`
//     <div class="rank-row">
//       <div class="avatar ${AVATAR_COLORS[i%AVATAR_COLORS.length]}">${getInitials(u.name)}</div>
//       <div class="rank-info">
//         <p class="rank-name">#${i+1} ${u.name}</p>
//         <p class="rank-skills">${u.skills.join(', ')}</p>
//       </div>
//       <div class="rank-score">
//         <p class="rank-pct">${u.trustScore}%</p>
//         <p class="rank-contribs">${u.contributions} contributions</p>
//       </div>
//     </div>
//   `).join('');
//   document.getElementById('lbBadges').innerHTML = sorted.slice(0,3).map(u=>`
//     <div style="padding:1rem;border-radius:12px;background:#f9f8f6;border:1px solid #e7e5e4;">
//       <div class="trust-bar-wrap mb-3"><div class="trust-bar-fill" style="width:${u.trustScore}%"></div></div>
//       <p style="font-size:16px;font-weight:800;color:var(--text-900);margin-bottom:8px;">${u.name}</p>
//       <div class="flex flex-wrap gap-2">${u.badges.map(b=>`<span class="badge ${BADGE_COLORS[b]||'badge-stone'}">${b}</span>`).join('')}</div>
//     </div>
//   `).join('');
// }

// // ============================================================
// // AI CENTER
// // ============================================================
// async function renderAICenter() {
//   await loadRequests();
//   const reqs = getAllRequests();
//   const catCount = {};
//   reqs.forEach(r=>{ catCount[r.category]=(catCount[r.category]||0)+1; });
//   const topCat = Object.entries(catCount).sort(([,a],[,b])=>b-a)[0]?.[0]||'Web Development';
//   const urgentCount = reqs.filter(r=>r.urgency==='high').length;
//   document.getElementById('aiStats').innerHTML = [
//     statCard('TREND PULSE', topCat, 'Most common support area based on active community requests.'),
//     statCard('URGENCY WATCH', urgentCount, 'Requests currently flagged high priority by the urgency detector.'),
//     statCard('MENTOR POOL', 2, 'Trusted helpers with strong response history and contribution signals.'),
//   ].join('');
//   const summaries = { 'high':'Best suited for members with relevant expertise.', 'medium':'Best helpers are frontend mentors comfortable with CSS grids and media queries.', 'low':'Coaching request focused on confidence-building and behavioral answers.' };
//   document.getElementById('aiRecoCards').innerHTML = reqs.map(r=>{
//     const catClass = CATEGORY_BADGE[r.category]||'badge-stone';
//     const urgClass = URGENCY_BADGE[r.urgency]||'badge-stone';
//     return `<div class="ai-row">
//       <h4>${r.title}</h4>
//       <p>${r.category} request with ${r.urgency} urgency. ${summaries[r.urgency]||''}</p>
//       <div class="flex gap-2 flex-wrap">
//         <span class="badge ${catClass}">${r.category}</span>
//         <span class="badge ${urgClass}">${cap(r.urgency)}</span>
//       </div>
//     </div>`;
//   }).join('');
// }

// // ============================================================
// // NOTIFICATIONS
// // ============================================================
// function renderNotifications() {
//   const container = document.getElementById('notifList');
//   container.innerHTML = notifications.map(n=>`
//     <div class="notif-row" onclick="markRead('${n.id}')">
//       <div>
//         <p class="${n.read?'notif-title-read':'notif-title-unread'}">${n.title}</p>
//         <p class="notif-meta">${typeLabel(n.type)} • ${timeAgo(n.timestamp)}</p>
//       </div>
//       <span class="${n.read?'notif-badge-read':'notif-badge-unread'}">${n.read?'Read':'Unread'}</span>
//     </div>
//   `).join('');
// }
// function markRead(id) {
//   notifications = notifications.map(n=>n.id===id?{...n,read:true}:n);
//   lsSetJSON('hh_notifications', notifications);
//   renderNotifications();
// }
// function markAllRead() {
//   notifications = notifications.map(n=>({...n,read:true}));
//   lsSetJSON('hh_notifications', notifications);
//   renderNotifications();
// }
// function typeLabel(t) { return {status:'Status',match:'Match',request:'Request',reputation:'Reputation',insight:'Insight'}[t]||t; }

// // ============================================================
// // PROFILE
// // ============================================================
// async function renderProfile() {
//   const user = getCurrentUser();
//   if (!user) {
//     navigate('login');
//     return;
//   }

//   const name = user.name || '';
//   const loc = user.location || '';
//   const skills = user.skills ? user.skills.join(', ') : '';
//   const interests = user.interests ? user.interests.join(', ') : '';
//   const trustScore = user.trustScore || 50;

//   document.getElementById('profileHeroName').textContent = name;
//   document.getElementById('profileHeroSub').textContent = `Member • ${loc}`;
//   document.getElementById('profilePublic').innerHTML = `
//     <div>
//       <div class="flex justify-between" style="padding:12px 0;border-bottom:1px solid #f0ebe5;"><span class="text-14" style="color:var(--text-500);">Trust score</span><span class="text-14 font-bold">${trustScore}%</span></div>
//       <div class="flex justify-between" style="padding:12px 0;border-bottom:1px solid #f0ebe5;"><span class="text-14" style="color:var(--text-500);">Contributions</span><span class="text-14 font-bold">0</span></div>
//       <div style="padding-top:12px;margin-top:4px;">
//         <p class="text-14 font-bold mb-2">Skills</p>
//         <div class="flex flex-wrap gap-2">${skills ? skills.split(',').map(s=>s.trim()).filter(Boolean).map(s=>`<span class="skill-pill">${s}</span>`).join('') : '<span class="text-14" style="color:var(--text-400);">No skills added</span>'}</div>
//       </div>
//       <div style="padding-top:12px;margin-top:8px;">
//         <p class="text-14 font-bold mb-2">Badges</p>
//         <div class="flex flex-wrap gap-2"><span class="badge badge-stone">New Member</span></div>
//       </div>
//     </div>
//   `;
//   document.getElementById('editName').value = name;
//   document.getElementById('editLoc').value = loc;
//   document.getElementById('editSkills').value = skills;
//   document.getElementById('editInterests').value = interests;
// }

// async function saveProfile() {
//   try {
//     const updatedData = {
//       name: document.getElementById('editName').value,
//       location: document.getElementById('editLoc').value,
//       skills: document.getElementById('editSkills').value.split(',').map(s=>s.trim()).filter(Boolean),
//       interests: document.getElementById('editInterests').value.split(',').map(s=>s.trim()).filter(Boolean),
//     };

//     const user = await apiCall('/user/me', {
//       method: 'PUT',
//       body: JSON.stringify(updatedData)
//     });

//     currentUser = user;
//     alert('Profile saved successfully!');
//     renderProfile();
//   } catch (err) {
//     alert(err.message || 'Failed to save profile');
//   }
// }

// // ============================================================
// // TIME UTILS
// // ============================================================
// function formatTime(ts) {
//   const d = new Date(ts);
//   return d.toLocaleTimeString('en-PK',{hour:'2-digit',minute:'2-digit'});
// }
// function timeAgo(ts) {
//   const diff = Date.now() - new Date(ts).getTime();
//   const mins = Math.floor(diff/60000);
//   if(mins<1) return 'Just now';
//   if(mins<60) return `${mins}m ago`;
//   const hrs = Math.floor(mins/60);
//   if(hrs<24) return `${hrs}h ago`;
//   return `${Math.floor(hrs/24)}d ago`;
// }

// // ============================================================
// // INIT
// // ============================================================
// async function init() {
//   updateNav();

//   if (isLoggedIn && getToken()) {
//     try {
//       await loadUserProfile();
//       navigate('dashboard');
//     } catch (err) {
//       console.error('Auto-login failed:', err);
//       removeToken();
//       isLoggedIn = false;
//       navigate('home');
//     }
//   } else {
//     navigate('home');
//   }
// }

// init();




// ============================================================
// DATA
// ============================================================
const USERS = [
  { id:'u1', name:'Ayesha Khan', email:'ayesha@helphub.ai', role:'both', skills:['Figma','UI/UX','HTML/CSS','Career Guidance'], interests:['Hackathons','UI/UX','Community Building'], location:'Karachi', trustScore:100, contributions:35, badges:['Design Ally','Fast Responder','Top Mentor'], joinedDate:'2025-09-01' },
  { id:'u2', name:'Hassan Ali', email:'hassan@helphub.ai', role:'can-help', skills:['JavaScript','React','Git/GitHub'], interests:['Open Source','Web Dev','Teaching'], location:'Karachi', trustScore:88, contributions:24, badges:['Code Rescuer','Bug Hunter'], joinedDate:'2025-10-01' },
  { id:'u3', name:'Sara Noor', email:'sara@helphub.ai', role:'need-help', skills:['Python','Data Analysis'], interests:['Machine Learning','Statistics'], location:'Lahore', trustScore:74, contributions:11, badges:['Community Voice'], joinedDate:'2025-11-01' },
  { id:'u4', name:'Bilal Ahmed', email:'bilal@helphub.ai', role:'both', skills:['Node.js','MongoDB','Express'], interests:['Backend Dev','APIs'], location:'Islamabad', trustScore:82, contributions:19, badges:['Backend Pro'], joinedDate:'2025-10-15' },
  { id:'u5', name:'Fatima Zahra', email:'fatima@helphub.ai', role:'can-help', skills:['React','TypeScript','Tailwind CSS'], interests:['Frontend Dev','Design Systems'], location:'Remote', trustScore:91, contributions:28, badges:['Frontend Master','Mentor Star'], joinedDate:'2025-09-15' },
];

const BASE_REQUESTS = [
  { id:'r1', title:'Need help', description:'Help needed with a coding problem.', status:'solved', urgency:'high', category:'Web Development', tags:[], createdBy:'u1', helpers:['u2'], location:'Karachi', createdAt:'2026-04-18T08:00:00Z', updatedAt:'2026-04-18T14:00:00Z' },
  { id:'r2', title:'Need help making my portfolio responsive before demo day', description:'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.', status:'solved', urgency:'high', category:'Web Development', tags:['HTML/CSS','Responsive','Portfolio'], createdBy:'u3', helpers:['u1'], location:'Karachi', createdAt:'2026-04-17T10:00:00Z', updatedAt:'2026-04-18T09:00:00Z' },
  { id:'r3', title:'Looking for Figma feedback on a volunteer event poster', description:'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.', status:'open', urgency:'medium', category:'Design', tags:['Figma','Poster','Design Review'], createdBy:'u1', helpers:['u2'], location:'Lahore', createdAt:'2026-04-16T14:00:00Z', updatedAt:'2026-04-17T11:00:00Z' },
  { id:'r4', title:'Need mock interview support for internship applications', description:'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.', status:'solved', urgency:'low', category:'Career', tags:['Interview Prep','Career','Frontend'], createdBy:'u3', helpers:['u1','u2'], location:'Remote', createdAt:'2026-04-15T09:00:00Z', updatedAt:'2026-04-18T12:00:00Z' },
  { id:'r5', title:'Need review on my JavaScript quiz app before submission', description:'Built a quiz app using vanilla JS and localStorage. Need someone to check logic, UI, and edge cases before I submit.', status:'open', urgency:'high', category:'Web Development', tags:['JavaScript','Debugging','Review'], createdBy:'u4', helpers:[], location:'Islamabad', createdAt:'2026-04-18T06:00:00Z', updatedAt:'2026-04-18T06:00:00Z' },
  { id:'r6', title:'Help with Python data visualization for class project', description:'Need help creating matplotlib charts from CSV data for my data science class presentation.', status:'open', urgency:'medium', category:'Data Science', tags:['Python','Matplotlib','Data Viz'], createdBy:'u3', helpers:[], location:'Lahore', createdAt:'2026-04-17T16:00:00Z', updatedAt:'2026-04-17T16:00:00Z' },
  { id:'r7', title:'Setting up Git workflow for team project', description:'Our group project needs proper branching strategy. Looking for someone experienced with Git/GitHub collaboration.', status:'in-progress', urgency:'medium', category:'DevOps', tags:['Git','GitHub','Collaboration'], createdBy:'u4', helpers:['u2'], location:'Islamabad', createdAt:'2026-04-16T11:00:00Z', updatedAt:'2026-04-18T10:00:00Z' },
];

const BASE_MESSAGES = [
  { id:'cm1', fromUserId:'u1', toUserId:'u3', content:'I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.', timestamp:'2026-04-18T09:45:00Z' },
  { id:'cm2', fromUserId:'u2', toUserId:'u1', content:'Your event poster concept is solid. I would tighten the CTA and reduce the background texture.', timestamp:'2026-04-18T11:10:00Z' },
  { id:'cm3', fromUserId:'u3', toUserId:'u1', content:'Thanks for the mock interview help! The behavioral tips were really useful.', timestamp:'2026-04-18T13:00:00Z' },
  { id:'cm4', fromUserId:'u1', toUserId:'u2', content:'Can you also review the mobile nav on my portfolio? It collapses weirdly.', timestamp:'2026-04-18T14:30:00Z' },
];

const BASE_NOTIFS = [
  { id:'n1', type:'status', title:'"Need help" was marked as solved', timestamp:'2026-04-18T14:00:00Z', read:false },
  { id:'n2', type:'match', title:'Ayesha Khan offered help on "Need help"', timestamp:'2026-04-18T13:55:00Z', read:false },
  { id:'n3', type:'request', title:'Your request "Need help" is now live in the community feed', timestamp:'2026-04-18T13:50:00Z', read:false },
  { id:'n4', type:'status', title:'"Need help making my portfolio responsive" was marked as solved', timestamp:'2026-04-18T13:00:00Z', read:false },
  { id:'n5', type:'reputation', title:'Your trust score increased after a solved request', timestamp:'2026-04-18T10:00:00Z', read:false },
  { id:'n6', type:'insight', title:'AI Center detected rising demand for interview prep', timestamp:'2026-04-18T08:00:00Z', read:true },
  { id:'n7', type:'match', title:'Fatima Zahra wants to help with your quiz app review', timestamp:'2026-04-17T18:00:00Z', read:true },
];

const CATEGORIES = ['All','Web Development','Design','Career','Data Science','Mobile Development','DevOps','Community'];

const CATEGORY_BADGE = { 'Web Development':'badge-teal','Design':'badge-violet','Career':'badge-teal','Data Science':'badge-blue','Mobile Development':'badge-amber','DevOps':'badge-slate','Community':'badge-stone' };
const URGENCY_BADGE = { 'low':'badge-blue','medium':'badge-amber','high':'badge-red' };
const STATUS_BADGE = { 'open':'badge-stone','in-progress':'badge-amber','solved':'badge-green' };
const STATUS_LABEL = { 'open':'Open','in-progress':'In Progress','solved':'Solved' };
const AVATAR_COLORS = ['av-teal','av-orange','av-pink','av-blue','av-violet'];
const BADGE_COLORS = { 'Design Ally':'badge-teal','Fast Responder':'badge-amber','Top Mentor':'badge-blue','Code Rescuer':'badge-green','Bug Hunter':'badge-red','Community Voice':'badge-amber','Backend Pro':'badge-violet','Frontend Master':'badge-teal','Mentor Star':'badge-amber' };

// ============================================================
// STATE
// ============================================================
let currentUserId = ls('hh_currentUser') || 'u1';
let isLoggedIn = ls('hh_loggedIn') === 'true';
let customRequests = lsJSON('hh_custom_requests') || [];
let messages = lsJSON('hh_messages') || BASE_MESSAGES;
let notifications = lsJSON('hh_notifications') || BASE_NOTIFS;

function ls(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function lsSet(k,v) { try { localStorage.setItem(k,v); } catch(e) {} }
function lsJSON(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch(e) { return null; } }
function lsSetJSON(k,v) { try { localStorage.setItem(k,JSON.stringify(v)); } catch(e) {} }

function getAllRequests() { return [...customRequests, ...BASE_REQUESTS]; }
function getCurrentUser() { return USERS.find(u => u.id === currentUserId) || USERS[0]; }
function getUserById(id) { return USERS.find(u => u.id === id); }
function getInitials(name) { return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

// ============================================================
// NAVIGATION
// ============================================================
const PAGES = ['home','login','dashboard','explore','create','messages','leaderboard','ai-center','notifications','profile'];
let currentPage = 'home';

function navigate(page) {
  PAGES.forEach(p => {
    const el = document.getElementById('page-'+p);
    if(el) el.classList.toggle('active', p===page);
  });
  currentPage = page;
  updateNav();
  if(page==='home') renderHome();
  if(page==='dashboard') renderDashboard();
  if(page==='explore') renderExplore();
  if(page==='create') renderCreate();
  if(page==='messages') renderMessages();
  if(page==='leaderboard') renderLeaderboard();
  if(page==='ai-center') renderAICenter();
  if(page==='notifications') renderNotifications();
  if(page==='profile') renderProfile();
  window.scrollTo({top:0,behavior:'smooth'});
}

function updateNav() {
  const loggedIn = isLoggedIn;
  const publicLinks = [{l:'Home',p:'home'},{l:'Explore',p:'explore'},{l:'Leaderboard',p:'leaderboard'},{l:'AI Center',p:'ai-center'}];
  const authLinks = [{l:'Dashboard',p:'dashboard'},{l:'Explore',p:'explore'},{l:'Create',p:'create'},{l:'Messages',p:'messages'},{l:'Leaderboard',p:'leaderboard'},{l:'AI Center',p:'ai-center'},{l:'Notifications',p:'notifications'},{l:'Profile',p:'profile'}];
  const links = loggedIn ? authLinks : publicLinks;
  const navLinks = document.getElementById('navLinks');
  navLinks.innerHTML = links.map(({l,p})=>`<button class="nav-link${currentPage===p?' active':''}" onclick="navigate('${p}')">${l}</button>`).join('');
  const navActions = document.getElementById('navActions');
  if(!loggedIn) {
    navActions.innerHTML = `<button class="btn-outline" onclick="navigate('explore')">Live signals</button><button class="btn-primary-sm" onclick="navigate('login')">Join the platform</button>`;
  } else {
    navActions.innerHTML = `<button class="btn-outline" onclick="handleLogout()">Sign out</button>`;
  }
}

// ============================================================
// AUTH
// ============================================================
function handleLogin() {
  const sel = document.getElementById('loginUser');
  currentUserId = sel.value;
  isLoggedIn = true;
  lsSet('hh_currentUser', currentUserId);
  lsSet('hh_loggedIn', 'true');
  navigate('dashboard');
}
function handleLogout() {
  isLoggedIn = false;
  lsSet('hh_loggedIn', 'false');
  navigate('home');
}

// ============================================================
// RENDER HELPERS
// ============================================================
function feedCard(req) {
  const catClass = CATEGORY_BADGE[req.category] || 'badge-stone';
  const urgClass = URGENCY_BADGE[req.urgency] || 'badge-stone';
  const statClass = STATUS_BADGE[req.status] || 'badge-stone';
  const creator = getUserById(req.createdBy);
  const tags = req.tags.length ? `<div class="feed-tags">${req.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>` : '';
  return `<div class="glass-hover feed-card">
    <div class="flex gap-2 flex-wrap">
      <span class="badge ${catClass}">${req.category}</span>
      <span class="badge ${urgClass}">${cap(req.urgency)}</span>
      <span class="badge ${statClass}">${STATUS_LABEL[req.status]||req.status}</span>
    </div>
    <h3>${req.title}</h3>
    <p class="feed-desc">${req.description}</p>
    ${tags}
    <div class="feed-footer">
      <div>
        <p class="feed-author">${creator?.name||'Unknown'}</p>
        <p class="feed-meta">${req.location} • ${req.helpers.length} helper${req.helpers.length!==1?'s':''} interested</p>
      </div>
      <button class="btn-secondary" style="font-size:13px;padding:7px 14px;">Open details</button>
    </div>
  </div>`;
}

function cap(s) { return s.charAt(0).toUpperCase()+s.slice(1); }

function statCard(label, value, sub) {
  return `<div class="glass p-6"><p class="label mb-2">${label}</p><p class="stat-num">${value}</p><p style="font-size:13px;color:var(--text-400);margin-top:6px;">${sub}</p></div>`;
}

// ============================================================
// HOME
// ============================================================
function renderHome() {
  const reqs = getAllRequests();
  const solved = reqs.filter(r=>r.status==='solved').length;
  const total = Math.max(reqs.length, 72);
  document.getElementById('homeStats').innerHTML = `
    <div><p class="hero-stat-label">Members</p><p class="hero-stat-num">384+</p><p class="hero-stat-desc">Students, mentors, and helpers in the loop.</p></div>
    <div><p class="hero-stat-label">Requests</p><p class="hero-stat-num">${total}+</p><p class="hero-stat-desc">Support posts shared across learning journeys.</p></div>
    <div><p class="hero-stat-label">Solved</p><p class="hero-stat-num">${Math.max(solved,69)}+</p><p class="hero-stat-desc">Problems resolved through fast community action.</p></div>
  `;
  document.getElementById('homeFeaturedCards').innerHTML = reqs.slice(0,3).map(feedCard).join('');
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const user = getCurrentUser();
  const reqs = getAllRequests();
  document.getElementById('dashWelcome').textContent = `Welcome back, ${user.name}.`;
  const myReqs = reqs.filter(r=>r.createdBy===currentUserId);
  const helpingOn = reqs.filter(r=>r.helpers.includes(currentUserId));
  const urgentCount = reqs.filter(r=>r.urgency==='high').length;
  const solvedCount = reqs.filter(r=>r.status==='solved').length;
  document.getElementById('dashStats').innerHTML = [
    statCard('MY REQUESTS', myReqs.length, 'Requests you posted'),
    statCard('HELPING ON', helpingOn.length, 'Requests you offered to help'),
    statCard('URGENT', urgentCount, 'High priority requests active'),
    statCard('COMMUNITY SOLVED', solvedCount, 'Problems resolved by the community'),
  ].join('');
  document.getElementById('dashInsights').innerHTML = `
    <div class="insight-teal" style="padding:1rem;border-radius:12px;"><p style="font-size:14px;font-weight:700;color:var(--text-700);">Trending: Web Development</p><p style="font-size:13px;color:var(--text-500);margin-top:4px;">Most active support area this week based on community requests.</p></div>
    <div class="insight-amber" style="padding:1rem;border-radius:12px;"><p style="font-size:14px;font-weight:700;color:var(--text-700);">${urgentCount} urgent requests need attention</p><p style="font-size:13px;color:var(--text-500);margin-top:4px;">Flagged by the urgency detector for quick community response.</p></div>
    <div class="insight-blue" style="padding:1rem;border-radius:12px;"><p style="font-size:14px;font-weight:700;color:var(--text-700);">Your trust score: ${user.trustScore}%</p><p style="font-size:13px;color:var(--text-500);margin-top:4px;">Keep contributing to maintain your top mentor status.</p></div>
  `;
  document.getElementById('dashRecentCards').innerHTML = reqs.slice(0,3).map(feedCard).join('');
}

// ============================================================
// EXPLORE
// ============================================================
function renderExplore() {
  const catSel = document.getElementById('filterCat');
  catSel.innerHTML = CATEGORIES.map(c=>`<option value="${c}">${c==='All'?'All categories':c}</option>`).join('');
  filterRequests();
}
function filterRequests() {
  const cat = document.getElementById('filterCat').value;
  const urg = document.getElementById('filterUrg').value;
  const skills = document.getElementById('filterSkills').value.toLowerCase();
  const loc = document.getElementById('filterLoc').value.toLowerCase();
  const reqs = getAllRequests().filter(r=>{
    const matchCat = cat==='All' || r.category===cat;
    const matchUrg = urg==='All urgency levels' || r.urgency.toLowerCase()===urg.toLowerCase();
    const matchSkills = !skills || r.tags.some(t=>t.toLowerCase().includes(skills));
    const matchLoc = !loc || r.location.toLowerCase().includes(loc);
    return matchCat && matchUrg && matchSkills && matchLoc;
  });
  const container = document.getElementById('exploreCards');
  container.innerHTML = reqs.length
    ? reqs.map(feedCard).join('')
    : `<div class="glass empty-state"><h3>No requests found</h3><p>Try adjusting your filters to see more results.</p></div>`;
}

// ============================================================
// CREATE REQUEST
// ============================================================
function renderCreate() {
  const catSel = document.getElementById('createCat');
  catSel.innerHTML = CATEGORIES.filter(c=>c!=='All').map(c=>`<option>${c}</option>`).join('');
  document.getElementById('createTitle').value = '';
  document.getElementById('createDesc').value = '';
  document.getElementById('createTags').value = '';
  document.getElementById('publishBtn').disabled = true;
  updateAI();
}
function getAI() {
  const title = document.getElementById('createTitle').value;
  const desc = document.getElementById('createDesc').value;
  const text = (title + ' ' + desc).toLowerCase();
  let category = 'Community', urgency = 'Low';
  const tags = [];
  if(/html|css|javascript|react|web|portfolio/.test(text)) category = 'Web Development';
  else if(/figma|design|poster|ui/.test(text)) category = 'Design';
  else if(/interview|career|internship/.test(text)) category = 'Career';
  else if(/python|data|ml/.test(text)) category = 'Data Science';
  if(/urgent|deadline|tomorrow|asap/.test(text)) urgency = 'High';
  else if(/help|need|review/.test(text)) urgency = 'Medium';
  if(text.length>20) {
    const words = text.split(/\s+/).filter(w=>w.length>4);
    [...new Set(words)].slice(0,3).forEach(w=>tags.push(w.charAt(0).toUpperCase()+w.slice(1)));
  }
  const rewrite = desc.length>30 ? `Rewritten: "${title}" — ${desc.slice(0,80)}... (AI-enhanced version with clearer structure)` : 'Start describing the challenge to generate a stronger version.';
  return { category, urgency, tags, rewrite };
}
function updateAI() {
  const title = document.getElementById('createTitle').value;
  document.getElementById('publishBtn').disabled = !title.trim();
  const ai = getAI();
  document.getElementById('aiCat').textContent = ai.category;
  document.getElementById('aiUrg').textContent = ai.urgency;
  document.getElementById('aiTags').textContent = ai.tags.length ? ai.tags.join(', ') : 'Add more detail for smarter tags';
  document.getElementById('aiRewrite').textContent = ai.rewrite;
}
function applyAI() {
  const ai = getAI();
  document.getElementById('createCat').value = ai.category;
  document.getElementById('createUrg').value = ai.urgency;
  if(ai.tags.length) document.getElementById('createTags').value = ai.tags.join(', ');
}
function handlePublish() {
  const title = document.getElementById('createTitle').value.trim();
  if(!title) return;
  const newReq = {
    id: 'r_'+Date.now(),
    title,
    description: document.getElementById('createDesc').value,
    status: 'open',
    urgency: document.getElementById('createUrg').value.toLowerCase(),
    category: document.getElementById('createCat').value,
    tags: document.getElementById('createTags').value.split(',').map(t=>t.trim()).filter(Boolean),
    createdBy: currentUserId,
    helpers: [],
    location: 'Remote',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  customRequests = [newReq, ...customRequests];
  lsSetJSON('hh_custom_requests', customRequests);
  navigate('explore');
}

// ============================================================
// MESSAGES
// ============================================================
function renderMessages() {
  const msgTo = document.getElementById('msgTo');
  const user = getCurrentUser();
  msgTo.innerHTML = USERS.filter(u=>u.id!==currentUserId).map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
  renderMsgStream();
}
function renderMsgStream() {
  const msgs = messages.filter(m=>m.fromUserId===currentUserId||m.toUserId===currentUserId);
  const container = document.getElementById('msgStream');
  if(!msgs.length) {
    container.innerHTML = '<p style="font-size:14px;color:var(--text-400);padding:2rem 0;text-align:center;">No messages yet. Start a conversation!</p>';
    return;
  }
  container.innerHTML = msgs.map(m=>{
    const sender = getUserById(m.fromUserId);
    const receiver = getUserById(m.toUserId);
    return `<div class="msg-card">
      <div class="msg-header">
        <p class="msg-name">${sender?.name||'Unknown'} → ${receiver?.name||'Unknown'}</p>
        <span class="msg-time">${formatTime(m.timestamp)}</span>
      </div>
      <p class="msg-text">${m.content}</p>
    </div>`;
  }).join('');
}
function toggleSendBtn() {
  const val = document.getElementById('msgBody').value.trim();
  document.getElementById('sendBtn').disabled = !val;
}
function sendMessage() {
  const body = document.getElementById('msgBody').value.trim();
  if(!body) return;
  const toUser = document.getElementById('msgTo').value;
  const msg = { id:'cm_'+Date.now(), fromUserId:currentUserId, toUserId:toUser, content:body, timestamp:new Date().toISOString() };
  messages = [...messages, msg];
  lsSetJSON('hh_messages', messages);
  document.getElementById('msgBody').value = '';
  document.getElementById('sendBtn').disabled = true;
  renderMsgStream();
}

// ============================================================
// LEADERBOARD
// ============================================================
function renderLeaderboard() {
  const sorted = [...USERS].sort((a,b)=>b.trustScore-a.trustScore);
  document.getElementById('lbRankings').innerHTML = sorted.map((u,i)=>`
    <div class="rank-row">
      <div class="avatar ${AVATAR_COLORS[i%AVATAR_COLORS.length]}">${getInitials(u.name)}</div>
      <div class="rank-info">
        <p class="rank-name">#${i+1} ${u.name}</p>
        <p class="rank-skills">${u.skills.join(', ')}</p>
      </div>
      <div class="rank-score">
        <p class="rank-pct">${u.trustScore}%</p>
        <p class="rank-contribs">${u.contributions} contributions</p>
      </div>
    </div>
  `).join('');
  document.getElementById('lbBadges').innerHTML = sorted.slice(0,3).map(u=>`
    <div style="padding:1rem;border-radius:12px;background:#f9f8f6;border:1px solid #e7e5e4;">
      <div class="trust-bar-wrap mb-3"><div class="trust-bar-fill" style="width:${u.trustScore}%"></div></div>
      <p style="font-size:16px;font-weight:800;color:var(--text-900);margin-bottom:8px;">${u.name}</p>
      <div class="flex flex-wrap gap-2">${u.badges.map(b=>`<span class="badge ${BADGE_COLORS[b]||'badge-stone'}">${b}</span>`).join('')}</div>
    </div>
  `).join('');
}

// ============================================================
// AI CENTER
// ============================================================
function renderAICenter() {
  const reqs = getAllRequests();
  const catCount = {};
  reqs.forEach(r=>{ catCount[r.category]=(catCount[r.category]||0)+1; });
  const topCat = Object.entries(catCount).sort(([,a],[,b])=>b-a)[0]?.[0]||'Web Development';
  const urgentCount = reqs.filter(r=>r.urgency==='high').length;
  document.getElementById('aiStats').innerHTML = [
    statCard('TREND PULSE', topCat, 'Most common support area based on active community requests.'),
    statCard('URGENCY WATCH', urgentCount, 'Requests currently flagged high priority by the urgency detector.'),
    statCard('MENTOR POOL', 2, 'Trusted helpers with strong response history and contribution signals.'),
  ].join('');
  const summaries = { 'high':'Best suited for members with relevant expertise.', 'medium':'Best helpers are frontend mentors comfortable with CSS grids and media queries.', 'low':'Coaching request focused on confidence-building and behavioral answers.' };
  document.getElementById('aiRecoCards').innerHTML = reqs.map(r=>{
    const catClass = CATEGORY_BADGE[r.category]||'badge-stone';
    const urgClass = URGENCY_BADGE[r.urgency]||'badge-stone';
    return `<div class="ai-row">
      <h4>${r.title}</h4>
      <p>${r.category} request with ${r.urgency} urgency. ${summaries[r.urgency]||''}</p>
      <div class="flex gap-2 flex-wrap">
        <span class="badge ${catClass}">${r.category}</span>
        <span class="badge ${urgClass}">${cap(r.urgency)}</span>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function renderNotifications() {
  const container = document.getElementById('notifList');
  container.innerHTML = notifications.map(n=>`
    <div class="notif-row" onclick="markRead('${n.id}')">
      <div>
        <p class="${n.read?'notif-title-read':'notif-title-unread'}">${n.title}</p>
        <p class="notif-meta">${typeLabel(n.type)} • ${timeAgo(n.timestamp)}</p>
      </div>
      <span class="${n.read?'notif-badge-read':'notif-badge-unread'}">${n.read?'Read':'Unread'}</span>
    </div>
  `).join('');
}
function markRead(id) {
  notifications = notifications.map(n=>n.id===id?{...n,read:true}:n);
  lsSetJSON('hh_notifications', notifications);
  renderNotifications();
}
function markAllRead() {
  notifications = notifications.map(n=>({...n,read:true}));
  lsSetJSON('hh_notifications', notifications);
  renderNotifications();
}
function typeLabel(t) { return {status:'Status',match:'Match',request:'Request',reputation:'Reputation',insight:'Insight'}[t]||t; }

// ============================================================
// PROFILE
// ============================================================
function renderProfile() {
  const user = getCurrentUser();
  const name = ls('hh_profile_name')||user.name;
  const loc = ls('hh_profile_loc')||user.location;
  const skills = ls('hh_profile_skills')||user.skills.join(', ');
  const interests = ls('hh_profile_interests')||user.interests.join(', ');
  const roleLabel = {both:'Both','can-help':'Can Help','need-help':'Need Help'}[user.role]||'Both';
  document.getElementById('profileHeroName').textContent = name;
  document.getElementById('profileHeroSub').textContent = `${roleLabel} • ${loc}`;
  document.getElementById('profilePublic').innerHTML = `
    <div>
      <div class="flex justify-between" style="padding:12px 0;border-bottom:1px solid #f0ebe5;"><span class="text-14" style="color:var(--text-500);">Trust score</span><span class="text-14 font-bold">${user.trustScore}%</span></div>
      <div class="flex justify-between" style="padding:12px 0;border-bottom:1px solid #f0ebe5;"><span class="text-14" style="color:var(--text-500);">Contributions</span><span class="text-14 font-bold">${user.contributions}</span></div>
      <div style="padding-top:12px;margin-top:4px;">
        <p class="text-14 font-bold mb-2">Skills</p>
        <div class="flex flex-wrap gap-2">${skills.split(',').map(s=>s.trim()).filter(Boolean).map(s=>`<span class="skill-pill">${s}</span>`).join('')}</div>
      </div>
      <div style="padding-top:12px;margin-top:8px;">
        <p class="text-14 font-bold mb-2">Badges</p>
        <div class="flex flex-wrap gap-2">${user.badges.map(b=>`<span class="badge ${BADGE_COLORS[b]||'badge-stone'}">${b}</span>`).join('')}</div>
      </div>
    </div>
  `;
  document.getElementById('editName').value = name;
  document.getElementById('editLoc').value = loc;
  document.getElementById('editSkills').value = skills;
  document.getElementById('editInterests').value = interests;
}
function saveProfile() {
  lsSet('hh_profile_name', document.getElementById('editName').value);
  lsSet('hh_profile_loc', document.getElementById('editLoc').value);
  lsSet('hh_profile_skills', document.getElementById('editSkills').value);
  lsSet('hh_profile_interests', document.getElementById('editInterests').value);
  renderProfile();
  alert('Profile saved!');
}

// ============================================================
// TIME UTILS
// ============================================================
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-PK',{hour:'2-digit',minute:'2-digit'});
}
function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff/60000);
  if(mins<1) return 'Just now';
  if(mins<60) return `${mins}m ago`;
  const hrs = Math.floor(mins/60);
  if(hrs<24) return `${hrs}h ago`;
  return `${Math.floor(hrs/24)}d ago`;
}

// ============================================================
// INIT
// ============================================================
function init() {
  // Populate login user selector
  const loginUser = document.getElementById('loginUser');
  if(loginUser) loginUser.innerHTML = USERS.map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
  
  updateNav();
  navigate('home');
}

init();
