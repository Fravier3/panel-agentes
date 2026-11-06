export const scene = '<canvas id="pixel-lab" width="480" height="280" role="img" aria-label="Oficina pixel art animada: Petro y Maduro caminan, programan y escriben en la pizarra"></canvas><div class="pixel-caption"><label class="motion-control"><input id="office-motion" type="checkbox" checked> Movimiento automático</label><span>Petro · Programador &nbsp; / &nbsp; Maduro · QA</span></div>';
export function startOffice(){
const canvas=document.getElementById('pixel-lab'),ctx=canvas.getContext('2d'),room=document.getElementById('scene');ctx.imageSmoothingEnabled=false;
const motion=document.getElementById('office-motion');let previous=performance.now(),clock=0;
const people=[{id:'petro',name:'Petro',x:146,y:204,tx:231,ty:194,color:'#7ed9b3',skin:'#d8a17c',hair:'#343240',action:'mirar',until:8,flip:1},{id:'maduro',name:'Maduro',x:350,y:157,tx:435,ty:215,color:'#e6a15b',skin:'#bd8a62',hair:'#323244',action:'cafe',until:9,flip:-1}];
const stations={programar:{x:146,y:204},pizarra:{x:350,y:157},cafe:{x:423,y:215},servidor:{x:430,y:145},mirar:{x:243,y:194},planta:{x:53,y:210}};
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
function text(s,x,y,c='#a4bdc8',size=5){ctx.fillStyle=c;ctx.font=`${size}px monospace`;ctx.fillText(s,Math.round(x),Math.round(y))}
function line(x,y,w,c){rect(x,y,w,2,c)}
function screen(x,y,w,h){rect(x,y,w,h,'#080f21');rect(x+2,y+2,w-4,h-5,'#233d52');rect(x+w/2-2,y+h,4,7,'#8293a1');rect(x+w/2-9,y+h+7,18,2,'#516477');for(let i=0;i<4;i++){line(x+7+(i%2)*4,y+8+i*6,10+((i*13+Math.floor(clock/2))%Math.max(11,w-23)),i%2?'#95abdd':'#72ddba')}if(Math.floor(clock*2)%2)rect(x+8,y+h-7,3,2,'#c3eed5')}
function plant(x,y){rect(x-6,y,13,13,'#9f807b');rect(x-8,y,17,3,'#c4a293');rect(x,y-24,3,25,'#53856f');rect(x-10,y-20,11,7,'#6cae81');rect(x-14,y-26,8,7,'#74bd88');rect(x+3,y-14,11,6,'#548d76');rect(x+9,y-21,8,8,'#67a67e')}
function background(){
rect(0,0,480,280,'#182133');rect(0,0,480,164,'#252d46');rect(0,164,480,116,'#3c4358');for(let y=167;y<280;y+=17){rect(0,y,480,1,'#49516a');for(let x=(y%34?0:24);x<480;x+=48)rect(x,y,1,17,'#323b50')}
rect(0,159,480,5,'#111c30');rect(14,16,452,3,'#4f747f');rect(18,17,444,1,'#99f2d5');
rect(22,35,133,103,'#111d33');rect(26,39,125,94,'#344562');rect(29,42,119,88,'#243651');for(let i=0;i<9;i++){const x=31+i*13,h=25+(i*19)%54;rect(x,130-h,11,h,'#2b4761');for(let j=0;j<Math.floor(h/10);j++)rect(x+3,133-h+j*9,3,3,(i+j)%3?'#65939a':'#d8bc79')}
rect(86,39,3,94,'#65768a');rect(26,86,125,3,'#65768a');rect(19,136,139,5,'#74829b');text('AGENT LAB / 02',185,43,'#b6c2d6',8);text('BUILD · TEST · REPEAT',190,55,'#698ba4',5);
// QA board
rect(283,71,103,70,'#101a2d');rect(286,74,97,64,'#789e9b');rect(289,77,91,58,'#cee3c8');text('QA / TEST PLAN',295,88,'#426558',6);for(let i=0;i<3;i++){rect(296,96+i*11,5,5,'#658779');rect(297,97+i*11,3,3,'#cee3c8');line(308,98+i*11,48-i*8,'#7b9d85');if(i<Math.floor(clock/3)%4){rect(296,98+i*11,2,2,'#337a64');rect(299,96+i*11,2,3,'#337a64')}}rect(284,140,101,3,'#809b9f');rect(294,139,9,2,'#e7aa65');
// rack
rect(407,69,52,91,'#101a2d');rect(410,72,46,86,'#334358');for(let i=0;i<5;i++){rect(413,77+i*15,40,12,'#1b2a41');rect(417,81+i*15,3,3,Math.floor(clock*3+i)%3?'#79e1ad':'#416f66');for(let j=0;j<4;j++)rect(427+j*5,81+i*15,2,5,'#4a6178')}
// rug
rect(96,185,160,63,'#263e4c');rect(100,189,152,55,'#2c4856');rect(104,193,144,47,'#314d58');
// desk
rect(67,192,157,9,'#15263b');rect(72,201,7,32,'#15263b');rect(211,201,7,32,'#15263b');rect(64,178,162,15,'#b3a18f');rect(64,178,162,3,'#d3b89d');rect(66,193,160,4,'#776e76');screen(85,134,62,43);screen(153,137,48,37);rect(104,185,45,5,'#4c5b6b');for(let i=0;i<8;i++)rect(107+i*5,186,3,1,'#a8aab4');rect(160,185,6,4,'#c3c4ba');rect(207,168,7,10,'#eacba0');rect(214,170,3,5,'#b79980');
// coffee station
rect(394,203,66,9,'#aa8d83');rect(397,212,6,31,'#283348');rect(451,212,6,31,'#283348');rect(400,179,22,24,'#25374a');rect(402,181,18,8,'#6b7887');rect(405,193,11,7,'#111c31');rect(407,197,6,5,'#deb787');rect(435,195,8,8,'#d1ded0');rect(444,197,3,4,'#a8b8b7');const steam=Math.floor(clock*2)%3;rect(437,190-steam,1,3,'#9aa8b4');text('COFFEE',427,185,'#aab6c6',5);
plant(37,208);plant(256,147);rect(235,144,39,5,'#745f65');
// ceiling clock
rect(194,75,23,23,'#101b31');rect(197,78,17,17,'#8ba4b4');rect(204,81,2,7,'#31415b');rect(205,86,6,2,'#31415b');
// little floor lights
for(let x=23;x<480;x+=49)rect(x,259,20,1,'#66817f');text('PETRO + MADURO / TECHNOLOGY LAB',147,273,'#8d9eae',5);
}
function person(p){const walk=Math.hypot(p.x-p.tx,p.y-p.ty)>1;const moving=walk&&motion.checked;const gait=Math.floor(clock*8)%4;const bob=moving?(gait%2):Math.floor(clock*1.5)%2;const x=Math.round(p.x),y=Math.round(p.y)-bob;const working=(p.action==='programar'||p.action==='pizarra')&&!walk;const f=p.flip;rect(x-9,y+2,20,3,'#263348'); // shadow
const seated=working&&p.action==='programar';if(seated){rect(x-8,y-12,17,15,'#1b293e');rect(x-5,y+3,3,6,'#8792a1');rect(x-11,y+8,18,2,'#1e2c3e')}
const stride=moving?(gait<2?3:-3):0;
rect(x-5,y-8,4,9+(seated?-4:0),'#273247');rect(x+2,y-8,4,9+(seated?-4:0),'#273247');rect(x-6+stride,y,6,3,'#101c31');rect(x+2-stride,y,6,3,'#101c31');
rect(x-7,y-25,15,18,p.color);rect(x-5,y-28,11,4,p.color);rect(x-1,y-28,3,3,p.skin);
const arm=working?Math.floor(clock*8)%2*2:0;
if(working&&p.action==='pizarra'){rect(x-11,y-29-arm,4,14,p.color);rect(x-12,y-33-arm,4,6,p.skin);rect(x-11,y-36-arm,2,4,'#24394b');rect(x+8,y-22,4,12,p.color);rect(x+8,y-11,4,4,p.skin)}else if(seated){rect(x-12,y-22,6,5,p.color);rect(x-15,y-24-arm,5,4,p.skin);rect(x+7,y-22,5,5,p.color);rect(x+9,y-24+arm,4,4,p.skin)}else{const swing=moving?stride:0;rect(x-11,y-23+swing,4,12,p.color);rect(x-11,y-12+swing,4,4,p.skin);rect(x+8,y-23-swing,4,12,p.color);rect(x+8,y-12-swing,4,4,p.skin)}
rect(x-7,y-43,15,15,p.skin);rect(x-9,y-39,2,6,p.skin);rect(x+8,y-39,2,6,p.skin);rect(x-7,y-46,15,6,p.hair);rect(x-9,y-43,5,8,p.hair);rect(x+5,y-43,5,5,p.hair);rect(x-5,y-45,10,3,p.hair);
if(p.id==='petro'){rect(x-6,y-37,6,3,'#324155');rect(x+2,y-37,5,3,'#324155');rect(x,y-36,2,1,'#324155')}else{rect(x-4,y-36,2,2,'#243347');rect(x+4,y-36,2,2,'#243347');rect(x-3,y-32,8,2,'#383342')}
rect(x,y-30,3,1,'#875d53');
// label follows character
const label=p.name;rect(x-15,y+13,31,9,'#152637');text(label,x-12,y+19,p.color,6);
const labels={programar:'CODING',pizarra:'QA CHECK',cafe:'CAFÉ',servidor:'SISTEMAS',mirar:'PENSANDO',planta:'PAUSA'};if(!walk){rect(x-20,y-59,43,9,'#d5dfcd');text(labels[p.action],x-17,y-53,'#304657',5)}else{rect(x-10,y-56,22,8,'#1b3044');text('···',x-6,y-50,'#b6dccc',6)}
}
function choose(p){const active=room.classList.contains(p.id+'-working');const own=p.id==='petro'?'programar':'pizarra';const choices=active?[own,own,own,'cafe','servidor']:[own,'cafe','mirar','servidor','planta'];let next=choices[Math.floor(Math.random()*choices.length)];if(next===p.action)next=p.action==='cafe'?'mirar':'cafe';const s=stations[next];p.action=next;p.tx=s.x+(next===own?0:p.id==='petro'?-12:12);p.ty=s.y+(p.id==='petro'?0:3);p.until=clock+4+Math.random()*6;}
function frame(){const t=performance.now();const dt=Math.min(.25,Math.max(0,(t-previous)/1000));previous=t;const paused=room.classList.contains('paused')||document.hidden||!motion.checked;if(!paused){clock+=dt;for(const p of people){const dx=p.tx-p.x,dy=p.ty-p.y,d=Math.hypot(dx,dy);if(d>1){const speed=48*dt;p.x+=dx/d*Math.min(speed,d);p.y+=dy/d*Math.min(speed,d);p.flip=dx<0?-1:1;}else if(clock>p.until)choose(p);}}background();for(const p of [...people].sort((a,b)=>a.y-b.y))person(p);canvas.dataset.motion=paused?'paused':'running';canvas.dataset.positions=people.map(p=>Math.round(p.x)+','+Math.round(p.y)).join(';');}
frame();let interval=setInterval(frame,50);window.addEventListener('pagehide',()=>{clearInterval(interval);interval=null;});window.addEventListener('pageshow',()=>{previous=performance.now();if(!interval)interval=setInterval(frame,50);});
}
