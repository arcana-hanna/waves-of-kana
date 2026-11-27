const $=s=>document.querySelector(s),A=$('#app'),h=s=>{A.innerHTML=s;const t=$('#tabs');if(t)t.hidden=true};
const GR=[['あいうえお','a i u e o'],['かきくけこ','ka ki ku ke ko'],['さしすせそ','sa shi su se so'],['たちつてと','ta chi tsu te to'],['なにぬねの','na ni nu ne no'],['はひふへほ','ha hi fu he ho'],['まみむめも','ma mi mu me mo'],['やゆよ','ya yu yo'],['らりるれろ','ra ri ru re ro'],['わをん','wa wo n'],['っゃゅょ','small_tsu small_ya small_yu small_yo'],['がぎぐげご','ga gi gu ge go'],['ざじずぜぞ','za ji zu ze zo'],['だぢづでど','da ji zu de do'],['ばびぶべぼ','ba bi bu be bo'],['ぱぴぷぺぽ','pa pi pu pe po']];
GR.slice().forEach(([k,r])=>GR.push([[...k].map(c=>String.fromCharCode(c.charCodeAt(0)+96)).join(''),r]));GR.push(['ー','long_mark']);
const RO={},ALL=[];GR.forEach(([k,r])=>[...k].forEach((c,i)=>{RO[c]=r.split(' ')[i].replace('_',' ');ALL.push(c)}));
const W=`あい|love;いえ|house;うえ|above;あお|blue;いい|good;あう|to meet;あか|red;かお|face;いけ|pond;こえ|voice;きく|to listen;あき|autumn;さけ|sake;すし|sushi;せかい|world;そら|sky;たこ|octopus;つき|moon;ねこ|cat;いぬ|dog;さかな|fish;おかね|money;はな|flower;ひと|person;ふね|ship;へや|room;ほし|star;みず|water;むし|insect;めがね|glasses;もも|peach;やま|mountain;ゆき|snow;よる|night;くるま|car;さくら|cherry blossom;りんご|apple;わたし|I, me;ほん|book;たまご|egg;ことば|word;かばん|bag;でんわ|phone;ぱん|bread;ごはん|rice, meal;えき|station;あさ|morning;なつ|summer;ふゆ|winter;はる|spring;あめ|rain;うみ|sea;かわ|river;て|hand;め|eye;みみ|ear;くち|mouth;ゆめ|dream;あいます|to meet;いきます|to go;ともだち|friend;まいにち|every day;たのしい|fun;よみます|to read;たかい|tall, high;ながい|long;きれい|pretty;あつい|hot;すずしい|cool;さむい|cold;あに|older brother;あね|older sister;あかい|red (adj);あおい|blue (adj);これ|this;しろい|white;すき|to like;のみます|to drink;たべます|to eat;がっこう|school;きょう|today;せんせい|teacher;おちゃ|tea;しゃしん|photo;みます|to look;ありがとう|thank you;おはよう|good morning;こんにちは|hello;おかあさん|mother;おとうさん|father;りょこう|trip;びょういん|hospital;ぎゅうにゅう|milk;ひゃく|hundred;ざっし|magazine;きって|stamp;コーヒー|coffee;パン|bread;ミルク|milk;ケーキ|cake;ホテル|hotel;テレビ|TV;ビール|beer;ラーメン|ramen;カメラ|camera;ピアノ|piano;タクシー|taxi;レストラン|restaurant;アイス|ice cream;ペン|pen;ノート|notebook;メール|email;ゲーム|game;サッカー|soccer;バス|bus`.split(';').map(x=>x.split('|'));
const MEAN=Object.fromEntries(W);
const STORY=[
{id:'s1',q:[['What color is the house?','あかい'],['What color is the pond?','あおい']],t:'Colors',n:['あかい','あおい'],l:[['#','A small red house stands beside a blue pond.'],['あかい いえ。','A red house.'],['あおい いけ。','A blue pond.'],['あかい いえ。 いい いえ。','A red house. A nice house.'],['あおい いけ。 いい いけ。','A blue pond. A nice pond.'],['あかい。 あおい。 あかい。 あおい。','Red. Blue. Red. Blue.']]},
{id:'s2',q:[['What does the cat like?','さかな'],['What color is the cat?','しろい']],t:'The cat',n:['これ','しろい','すき'],note:'は is read “wa”. です is a polite “is/am”.',l:[['#','A white cat sits next to a fish on a plate.'],['これは ねこです。','This is a cat.'],['ねこは {白|しろ}いです。','The cat is white.'],['これは {魚|さかな}です。','This is a fish.'],['{魚|さかな}も {白|しろ}いです。','The fish is white too.'],['ねこは {魚|さかな}が すきです。','The cat likes fish.'],['わたしは ねこが すきです。','I like cats.'],['わたしは {魚|さかな}も すきです。','I like fish too.'],['これは わたしの ねこです。','This is my cat.'],['わたしは {白|しろ}い ねこが すきです。','I like white cats.']]},
{id:'s3',q:[['What do people drink?','みず'],['What does the cat eat?','さかな']],t:'Morning',n:['のみます','たべます','すき'],note:'を is read “o”.',l:[['#','Morning light. A person sits at a table with water and rice.'],['{朝|あさ}です。','It is morning.'],['わたしは {水|みず}を のみます。','I drink water.'],['わたしは ごはんを たべます。','I eat rice.'],['ねこも {水|みず}を のみます。','The cat drinks water too.'],['ねこは {魚|さかな}を たべます。','The cat eats fish.'],['{人|ひと}は ごはんを たべます。','People eat rice.'],['{人|ひと}は {水|みず}を のみます。','People drink water.'],['わたしは ごはんが すきです。','I like rice.'],['わたしは {水|みず}も すきです。','I like water too.']]},
{id:'s4',q:[['What does the teacher drink?','おちゃ'],['What does the teacher look at?','しゃしん']],t:'School',n:['きょう','せんせい','おちゃ','しゃしん','みます'],note:'Small っ doubles the next sound; small ゃ joins the kana before it (しゃ = sha).',l:[['#','In the classroom, the teacher holds a cup of tea and a photo.'],['{今日|きょう}は {学校|がっこう}です。','Today is school.'],['{先生|せんせい}も {学校|がっこう}です。','The teacher is at school too.'],['{先生|せんせい}は おちゃを のみます。','The teacher drinks tea.'],['わたしも おちゃを のみます。','I drink tea too.'],['{先生|せんせい}は しゃしんを みます。','The teacher looks at a photo.'],['わたしも しゃしんを みます。','I look at the photo too.'],['{今日|きょう}は しゃしんです。','Today is photo day.'],['{今日|きょう}は おちゃが すきです。','Today I like tea.'],['ありがとう。','Thank you.']]},
{id:'s5',q:[['What do people drink?','コーヒー'],['What does the cat drink?','ミルク']],t:'Café',n:['コーヒー','ミルク','パン','ケーキ'],note:'Loanwords are written in katakana. ー lengthens the vowel.',l:[['#','A small café table with coffee, milk, bread and cake.'],['{人|ひと}は コーヒーを のみます。','People drink coffee.'],['わたしも コーヒーを のみます。','I drink coffee too.'],['ねこは ミルクを のみます。','The cat drinks milk.'],['{人|ひと}は パンを たべます。','People eat bread.'],['わたしは ケーキを たべます。','I eat cake.'],['ケーキは すきです。','I like cake.'],['コーヒーも すきです。','I like coffee too.'],['ミルクも パンも すきです。','I like milk and bread too.'],['これは ケーキです。','This is cake.']]},
{id:'s6',q:[['Where do I go every day?','がっこう'],['What does my friend read?','ほん']],t:'Going to school',n:['いきます','ともだち','まいにち','たのしい','よみます','あいます'],note:'へ is read “e” and を “o”. と means “and”. も means “also”.',l:[['#','Every day a student walks to school. A friend and the teacher are waiting at the gate.'],['{毎日|まいにち}、 わたしは {学校|がっこう}へ いきます。','Every day I go to school.'],['{学校|がっこう}で {友達|ともだち}に あいます。','At school I meet my friend.'],['{友達|ともだち}も {毎日|まいにち} {学校|がっこう}へ いきます。','My friend goes to school every day too.'],['{友達|ともだち}は {本|ほん}を よみます。','My friend reads books.'],['わたしも {本|ほん}を よみます。','I read books too.'],['{先生|せんせい}も {学校|がっこう}へ いきます。','The teacher goes to school too.'],['{先生|せんせい}も {本|ほん}を よみます。','The teacher reads books too.'],['{毎日|まいにち}、 {学校|がっこう}で {本|ほん}を よみます。','Every day we read books at school.'],['{友達|ともだち}と わたしは たのしいです。','My friend and I are having fun.'],['{先生|せんせい}も たのしいです。','The teacher is having fun too.'],['{毎日|まいにち} たのしいです。','Every day is fun.'],['わたしは {学校|がっこう}が すきです。','I like school.']]},
{id:'s7',q:[['What is tall?','やま'],['What is long?','かわ']],t:'Nature',n:['たかい','ながい','きれい'],l:[['#','A tall mountain, a long river below it, and flowers under a blue sky.'],['{山|やま}は たかいです。','The mountain is tall.'],['{川|かわ}は ながいです。','The river is long.'],['{空|そら}は {青|あお}いです。','The sky is blue.'],['{空|そら}は きれいです。','The sky is pretty.'],['{川|かわ}も きれいです。','The river is pretty too.'],['{花|はな}も きれいです。','The flowers are pretty too.'],['たかい {山|やま}、 ながい {川|かわ}、 きれい {花|はな}。','A tall mountain, a long river, pretty flowers.'],['{山|やま}は たかい、 {川|かわ}は ながい。','The mountain is high, the river is long.'],['{空|そら}も たかいです。','The sky is high too.'],['ながい {川|かわ}です。','It is a long river.'],['{今日|きょう}は {雨|あめ}です。','Today is rainy.']]},
{id:'s8',q:[['What is cold?','ふゆ'],['What is hot?','なつ']],t:'Seasons',n:['あつい','すずしい','さむい'],l:[['#','Four small scenes: spring blossoms, summer sun, red autumn leaves, winter snow.'],['{春|はる}は {花|はな}が きれいです。','In spring the flowers are pretty.'],['{夏|なつ}は あついです。','Summer is hot.'],['{夏|なつ}は {海|うみ}が すきです。','In summer I like the sea.'],['{秋|あき}は すずしいです。','Autumn is cool.'],['{秋|あき}は {山|やま}が すきです。','In autumn I like the mountains.'],['{冬|ふゆ}は さむいです。','Winter is cold.'],['{冬|ふゆ}は {雪|ゆき}が すきです。','In winter I like snow.'],['{夏|なつ}は あつい、 {冬|ふゆ}は さむい。','Summer is hot, winter is cold.'],['{秋|あき}も {春|はる}も すずしいです。','Autumn and spring are cool.'],['{冬|ふゆ}も さむいです。','Winter is cold too.'],['あつい {夏|なつ}です。','It is a hot summer.'],['あつい、 すずしい、 さむい。','Hot, cool, cold.']]},
{id:'s9',q:[['Who likes soccer?','あに'],['Who likes books?','あね']],t:'Family',n:['あに','あね'],l:[['#','A family at home: father, mother, older brother and older sister.'],['{お父|おとう}さんは {先生|せんせい}です。','My father is a teacher.'],['{お母|おかあ}さんは コーヒーが すきです。','My mother likes coffee.'],['{兄|あに}は サッカーが すきです。','My older brother likes soccer.'],['{姉|あね}は {本|ほん}が すきです。','My older sister likes books.'],['{兄|あに}も コーヒーを のみます。','My older brother drinks coffee too.'],['{姉|あね}も コーヒーを のみます。','My older sister drinks coffee too.'],['{兄|あに}は {姉|あね}が すきです。','My older brother likes my older sister.'],['{兄|あに}と {姉|あね}は {家|いえ}です。','My older brother and sister are at home.'],['わたしは {家|いえ}が すきです。','I like home.']]}];
const unl=(s,f)=>s.l.map(x=>x[0]).join('').split('').filter(c=>RO[c]).every(f);
let S;try{S=JSON.parse(localStorage.wk)}catch(e){}S=S||{k:{},w:{},ov:[],tol:.16,ord:1,set:0};S.st=S.st||{};S.a=S.a||{};S.j=S.j||{};
const TMR=[],clrT=()=>{TMR.forEach(clearTimeout);TMR.length=0},later=(f,ms)=>TMR.push(setTimeout(f,ms));
const DP=[['tol','Shape tolerance (size and place ignored)',.05,.4,.01],['pt','Allowed offset of a stroke from its place',.05,.5,.01],['idle','Idle ms before auto-check with strokes missing (0 = off)',0,15000,500],['okMs','Pause after a correct drawing (ms)',500,6000,100],['failMs','Delay before showing what is wrong (ms)',0,6000,100],['n','Points per stroke when comparing',8,48,2]];
const D=()=>({tol:.18,pt:.22,idle:5000,okMs:2000,failMs:2000,n:16,...S.d});
const dbg=()=>DP.map(([k,l,a,b,st])=>`<label>${l}: <b id=v_${k}>${D()[k]}</b><input type=range min=${a} max=${b} step=${st} value=${D()[k]} oninput="S.d=S.d||{};S.d['${k}']=+this.value;$('#v_${k}').textContent=this.value;save()"></label>`).join('')+`<button onclick="S.d={};save();home()">Reset to defaults</button>`;
const save=()=>{try{localStorage.wk=JSON.stringify(S)}catch(e){}},day=()=>Math.floor(Date.now()/864e5),IV=[0,1,2,4,8,16,32];
let PM=0,TO={r:[]},ST={},Q=[],qi=0,P,PS={},sel=new Set,KJ=[],KR={};
const say=t=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(KR[t]||t);u.lang='ja-JP';u.rate=.8;speechSynthesis.speak(u)}catch(e){}};
const shuf=a=>{for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const SM='ゃゅょャュョ',rom=w=>{const a=[...w];let o='';a.forEach((c,i)=>{const n=a[i+1],y=SM.indexOf(n);if(c=='っ'||c=='ッ'){const q=RO[n]||'';o+=q.startsWith('ch')?'t':q[0]||'';return}if(SM.includes(c))return;if(c=='ー'){o+=o.slice(-1);return}let b=RO[c];if(y>=0){const v='auo'[y%3];b=/(shi|chi|ji)$/.test(b)?b.slice(0,-1)+v:b.slice(0,-1)+'y'+v}o+=b});return o};
const TIP={'っ':'Small っ doubles the next consonant: がっこう = gakkō.','ゃ':'Small ゃ ゅ ょ join the kana before them: き+ゃ = kya, し+ゃ = sha.'};TIP['ゅ']=TIP['ょ']=TIP['ゃ'];
const SH='シ (shi) and ツ (tsu) look alike: シ’s strokes are more horizontal, ツ’s more vertical.',SO='ソ (so) and ン (n) look alike: ソ’s first stroke is a short one at the top, ン’s strokes sit lower and sweep up.';
Object.assign(TIP,{'ッ':TIP['っ'],'ャ':TIP['ゃ'],'ュ':TIP['ゃ'],'ョ':TIP['ゃ'],'ー':'ー lengthens the vowel before it: コーヒー = kōhī.','シ':SH,'ツ':SH,'ソ':SO,'ン':SO});
const hint=t=>t.ty=='kana'?(TIP[t.id]?`<br><small>${TIP[t.id]}</small>`:''):/aa|ii|uu|ee|oo|ou|ei/.test(rom(KR[t.id]||t.id))?'<br><small>Long vowel: hold it about twice as long.</small>':'';
// ---- handwriting checker
function nz(ss){const a=ss.flat(),xs=a.map(p=>p[0]),ys=a.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),s=Math.max(x1-x0,y1-y0)||1,cx=(x0+x1)/2,cy=(y0+y1)/2;return ss.map(t=>t.map(p=>[(p[0]-cx)/s,(p[1]-cy)/s]))}
function rs(p,N=16){const L=[0];for(let i=1;i<p.length;i++)L.push(L[i-1]+Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]));const T=L.at(-1),o=[];let j=1;for(let k=0;k<N;k++){const d=T*k/(N-1);while(j<p.length-1&&L[j]<d)j++;const f=(d-L[j-1])/(L[j]-L[j-1]||1),a=p[j-1],b=p[j];o.push([a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f])}return o}
const dist=(a,b)=>a.reduce((s,p,i)=>s+Math.hypot(p[0]-b[i][0],p[1]-b[i][1]),0)/a.length;
const LB={dir:'goes the wrong way',shape:'has the wrong shape',pos:'has the right shape but sits too far from its place',order:'is right but belongs at a different step'};
function check(user,ref,d,ord){
  if(!ref)return{ok:true,v:'ok',det:[],msg:'No stroke data loaded, so this one is not checked.'};
  if(!user.length)return{ok:false,v:'bad',det:[],msg:'Draw the character first.'};
  const nU=user.length,nR=ref.length;
  if(nU!==nR)return{ok:false,v:'bad',det:[],msg:`<b>Stroke count:</b> you drew ${nU}, but it has ${nR}. ${nU<nR?'Something is missing.':'Something is extra.'}`};
  const U=nz(user).map(s=>rs(s,d.n)),R=nz(ref).map(s=>rs(s,d.n)),rv=a=>[...a].reverse();
  const cen=s=>[s.reduce((a,p)=>a+p[0],0)/s.length,s.reduce((a,p)=>a+p[1],0)/s.length],ext=s=>{const x=s.map(p=>p[0]),y=s.map(p=>p[1]);return Math.max(Math.max(...x)-Math.min(...x),Math.max(...y)-Math.min(...y))};
  const mv=(s,c,k)=>s.map(p=>[(p[0]-c[0])*k,(p[1]-c[1])*k]);
  const cls=(u,q)=>{const cu=cen(u),cq=cen(q),eu=ext(u),eq=ext(q),k=eu>.1&&eq>.1?Math.min(1.6,Math.max(.6,eq/eu)):1,a=mv(u,cu,k),b=mv(q,cq,1),off=Math.hypot(cu[0]-cq[0],cu[1]-cq[1]),sz=!(eu>.1&&eq>.1)||(eu/eq>.45&&eu/eq<2.2);
    if(sz&&dist(a,b)<=d.tol)return off<=d.pt?'ok':'pos';if(sz&&dist(a,rv(b))<=d.tol)return'dir';return'shape'};
  const used=new Set(),det=[];
  U.forEach((u,i)=>{let j=i;if(!ord){j=-1;let bd=9;R.forEach((q,k)=>{if(used.has(k))return;const e=Math.min(dist(u,q),dist(u,rv(q)));if(e<bd){bd=e;j=k}})}
    used.add(j);let c=cls(u,R[j]);if(ord&&c!='ok'&&R.some((q,k)=>k!=i&&cls(u,q)=='ok'))c='order';det.push(c)});
  const bad=det.filter(d=>d!='ok').length,n=det.length;
  const hard=det.filter(d=>d=='shape').length;return{ok:!bad,v:!bad?'ok':hard<=Math.floor(n/4)&&bad<=Math.ceil(n/2)?'near':'bad',det,msg:bad?`<b>${bad==n?'None of the strokes match.':bad==1?'One stroke is off.':bad+' of '+n+' strokes are off.'}</b><ul>${det.map((d,i)=>d=='ok'?'':`<li>Stroke ${i+1} ${LB[d]}.</li>`).join('')}</ul>`:'<b>✓ Nice!</b>'}}
function brush(x,st){const n0=st.length,p=n0<3?st:st.map((q,i)=>i&&i<n0-1?[(st[i-1][0]+q[0]*2+st[i+1][0])/4,(st[i-1][1]+q[1]*2+st[i+1][1])/4]:q),n=p.length;
  if(n<2){x.beginPath();x.arc(p[0][0],p[0][1],6,0,7);x.fill();return}
  const L=[],R=[];p.forEach((q,i)=>{const a=p[Math.max(0,i-1)],b=p[Math.min(n-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1,w=2+7*Math.sqrt(Math.sin(Math.PI*(.08+.84*i/(n-1))));L.push([q[0]-dy/d*w,q[1]+dx/d*w]);R.push([q[0]+dy/d*w,q[1]-dx/d*w])});
  x.beginPath();L.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));R.reverse().forEach(q=>x.lineTo(q[0],q[1]));x.closePath();x.fill();
  [p[0],p[n-1]].forEach(q=>{x.beginPath();x.arc(q[0],q[1],4.5,0,7);x.fill()})}
function pad(cv){const x=cv.getContext('2d'),o={s:[],lock:0};let c=null;const C={ok:'#2a9d4a',dir:'#e08a1e',pos:'#e08a1e',order:'#d9a21e',shape:'#d33'};
  const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*320/r.width,(e.clientY-r.top)*320/r.height]};
  o.show=det=>{if(det!==undefined)o.det=det;det=o.det;x.clearRect(0,0,320,320);x.setLineDash([]);x.lineWidth=1;x.strokeStyle='#8885';x.beginPath();x.moveTo(160,0);x.lineTo(160,320);x.moveTo(0,160);x.lineTo(320,160);x.stroke();
    if(o.showRef&&o.ref){const k=320/109;x.strokeStyle='#4a90e2aa';x.lineWidth=5;x.lineCap='round';x.setLineDash([8,6]);o.ref.forEach(s=>{x.beginPath();s.forEach(([a,b],j)=>j?x.lineTo(a*k,b*k):x.moveTo(a*k,b*k));x.stroke()});x.setLineDash([])}
    const ink=getComputedStyle(cv).color;o.s.forEach((s,i)=>{x.fillStyle=det&&det.length?C[det[i]]||ink:ink;brush(x,s)})};
  o.clear=()=>{o.s.length=0;o.det=null;o.show()};
  cv.onpointerdown=e=>{if(o.lock)return;if(o.down)o.down();cv.setPointerCapture(e.pointerId);c=[pt(e)];o.s.push(c);o.show()};
  cv.onpointermove=e=>{if(c){c.push(pt(e));o.show()}};
  cv.onpointerup=e=>{if(c){c.push(pt(e));c=null;o.show();if(o.cb)o.cb()}};
  o.show();return o}
function anim(cv,ref){const x=cv.getContext('2d'),k=cv.width/109;ref.forEach((s,i)=>setTimeout(()=>{x.strokeStyle='#4a90e2';x.lineWidth=5;x.lineCap='round';x.setLineDash([8,6]);x.beginPath();s.forEach(([a,b],j)=>j?x.lineTo(a*k,b*k):x.moveTo(a*k,b*k));x.stroke();x.setLineDash([])},i*500))}
// ---- screens
function home(){clrT();TO.on=0;if(!S.set)return first();const due=dueL().length,nl=nextL(),unread=nl!=null&&LS[nl].every(c=>S.k[c]),nj=Object.keys(S.j).length,hd=LS.slice(0,nh).every((_,x)=>lDone(x)),
  hero=nl!=null?`<section class=card><h3>Next step</h3><div class=chips>${LS[nl].map(c=>`<span class=gl>${c}</span>`).join('')}</div>${unread?'<p class=s>You can read these. This lesson adds writing and their words.</p>':''}<button class=big onclick="lesson(${nl})">Start this lesson</button></section>`:`<section class=card><h3>All kana learned</h3><button class=big onclick="lesson(-1)">Start a kanji lesson</button></section>`,
  cuc=cuWords().length?`<section class=card><h3>Catch-up</h3><p class=s>${cuWords().length} words use kana you already know and haven’t been covered yet.</p><button class=big onclick=catchup()>Check them</button></section>`:'',
  kjc=nl!=null&&hd&&lp(-1,'std').j.length?`<section class=card><h3>Kanji ready</h3><p class=s>${lp(-1,'std').j.length} kanji for words you can already read.</p><button class=big onclick="lesson(-1)">Start a kanji lesson</button></section>`:'';
  h(`<div class=hd><b>Waves of Kana</b></div>${hero}${cuc}${kjc}<section class=card><h3>Reviews</h3>${due?`<p class=s>${due} waiting</p><button class=big onclick=rstart()>Review now</button>`:'<p class=s style="margin:0">Nothing is waiting.</p>'}</section>
  <section class=card><h3>Path</h3><div class=chips>${LO().map(i=>`<button class="chip pc" aria-label="Unit ${LS[i][0]}: kana, words, story" onclick="lesson(${i})"><span class=jp>${LS[i][0]}</span><small>${unitMarks(i)}</small></button>`).join('')}</div><p class=s>Under each unit: kana · words · story. ● done, ◐ partly, ○ not yet, – none. Every unit is open, and each offers a short test if you already know it.</p></section>`);tab('path')}
const sk=(c,on)=>{if(on){if(!S.k[c])S.k[c]={b:1,d:day()+1+(Math.random()*5|0),wr:PM}}else delete S.k[c]};
const prow=gi=>{const cs=[...GR[gi][0]],all=cs.every(c=>S.k[c]);cs.forEach(c=>sk(c,!all));save();place()};
const pall=m=>{ALL.forEach(c=>{if(m=='n'||(m=='h'&&c<'ァ')||(m=='k'&&c>='ァ'))sk(c,m!='n')});save();place()};
function place(){const kg=GR.findIndex(g=>g[0][0]>='ァ');
  h(`<h2>Which kana do you already know?</h2><p class=s>${Object.keys(S.k).length} selected. Tap “Row” to select a whole row, or use the shortcuts.</p><div class=chips><button class=chip aria-pressed="${!PM}" onclick="PM=0;place()">Mark as: can read</button><button class=chip aria-pressed="${!!PM}" onclick="PM=1;place()">Mark as: can read and write</button></div><p class=s>Kana marked “can read” still get a writing lesson. Everything you mark comes back in an early review to confirm it.</p><div class=chips><button class=chip onclick="pall('h')">All hiragana</button><button class=chip onclick="pall('k')">All katakana</button><button class=chip onclick="pall('n')">Clear all</button></div>${GR.map(([k],gi)=>`${gi==0?'<h3>Hiragana</h3>':gi==kg?'<h3>Katakana</h3>':''}<div class=pr><button class=rl onclick="prow(${gi})">Row</button>${[...k].map(c=>`<button class="k ${S.k[c]?'on':''}" onclick="tg('${c}',this)">${c}</button>`).join('')}</div>`).join('')}<button class=big onclick="S.set=1;save();placeSum()">Done</button>`)}
const tg=(c,e)=>{if(S.k[c])delete S.k[c];else S.k[c]={b:1,d:day()+1+(Math.random()*5|0),wr:PM};e.classList.toggle('on');save()};
const exp=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)]));a.download='waves-of-kana-progress.json';a.click()};
const imp=i=>i.files[0].text().then(t=>{S=JSON.parse(t);save();home()});
const LS=(()=>{const a=GR.map(g=>[...g[0]]),l=a.pop();a[a.length-1].push(...l);return a})(),nh=GR.findIndex(g=>g[0][0]>='ァ');
const LO=()=>{const h=[...Array(nh).keys()],k=LS.map((_,i)=>i).slice(nh);if(!S.kt)return[...h,...k];const o=[];for(let i=0;i<Math.max(h.length,k.length);i++){if(h[i]!=null)o.push(h[i]);if(k[i]!=null)o.push(k[i])}return o};
const lDone=i=>LS[i].every(c=>S.k[c]&&S.k[c].wr!==0),nextL=()=>LO().find(i=>!lDone(i));
const dueL=()=>[...Object.entries(S.k).map(([id,v])=>['kana',id,v]),...Object.entries(S.w).map(([id,v])=>['word',id,v]),...Object.entries(S.j).map(([id,v])=>['kanji',id,v])].filter(x=>x[2].d<=day()).sort((a,b)=>a[2].d-b[2].d);
const rq1=([ty,id,v])=>({ty,id,v:Math.random()<.5,m:ty=='kana'?(v.b<2&&!RO[id].includes(' ')?'type':'write'):ty=='word'?(v.b<2?'mean':v.b%2?'dict':'write'):(v.b<2?'type':'write')});
function rstart(){PS.on=0;Q=dueL().slice(0,12).map(rq1);qi=0;next()}
function lp(i,len){const kana=i>=0?LS[i]:[],kn=new Set([...Object.keys(S.k),...kana]),pool=W.map(w=>w[0]).filter(w=>!S.w[w]&&[...w].every(c=>kn.has(c)));
  const wn=pool.filter(w=>[...w].some(c=>kana.includes(c))),wo=pool.filter(w=>!wn.includes(w)),ns=STORY.find(s=>!S.st[s.id]&&unl(s,c=>kn.has(c))),need=new Set(ns?ns.n:[]),by=a=>a.sort((x,y)=>need.has(y)-need.has(x));
  const w=by(wn).slice(0,len=='short'?1:len=='long'?8:6),w2=len=='long'?by(wo).slice(0,6):[],kw=new Set([...Object.keys(S.w),...w,...w2]),KC=kc(),j=[],hd=LS.slice(0,nh).every((_,x)=>lDone(x)),lim=i<0?5:hd?(len=='short'?0:len=='long'?3:2):(len=='long'?2:0);
  for(const pass of[0,1])for(const x of KJ){if(j.length>=lim)break;if(S.j[x.k]||j.includes(x.k)||(pass==0&&!kw.has(x.w||x.r)))continue;if(x.w?kw.has(x.w):[...x.r].every(c=>kn.has(c))&&(x.d||[]).every(c=>KC.has(c))){j.push(x.k);[...x.k].forEach(c=>KC.add(c))}}
  const sty=len=='long'?STORY.find(s=>!S.st[s.id]&&unl(s,c=>kn.has(c))&&s.n.every(x=>S.w[x]||w.includes(x)||w2.includes(x))):null;
  return{kana,w,w2,j,sty}}
const cuWords=()=>W.map(w=>w[0]).filter(w=>!S.w[w]&&[...w].every(c=>S.k[c]));
const KU=i=>{const k=new Set();for(const j of LO()){LS[j].forEach(c=>k.add(c));if(j==i)break}return k};
const uWords=i=>{const k=KU(i);return W.map(w=>w[0]).filter(w=>[...w].every(c=>k.has(c))&&[...w].some(c=>LS[i].includes(c)))};
const dot=(a,t)=>!t?'–':a==t?'●':a?'◐':'○';
function unitMarks(i){const ws=uWords(i),k=KU(i),ss=STORY.filter(s=>LO().find(j=>unl(s,c=>KU(j).has(c)))==i);
  return dot(LS[i].filter(c=>S.k[c]&&S.k[c].wr!==0).length,LS[i].length)+dot(ws.filter(w=>S.w[w]).length,ws.length)+dot(ss.filter(x=>S.st[x.id]).length,ss.length)}
function catchup(){const all=cuWords(),ws=all.slice(0,8),n=all.length;
  h(`<div class=top><button class=x aria-label=Back onclick=home()>←</button><h2 style="margin:0">Catch-up</h2></div><section class=card><p>${n} word${n>1?'s':''} use kana you already know and haven’t been covered yet. For each one, type its meaning. If you don’t know it, the app teaches it to you.</p><div class=chips>${ws.map(w=>`<span class=gl>${w}</span>`).join('')}</div>${n>8?`<p class=s>${n-8} more after these.</p>`:''}</section><button class=big onclick=cstart()>Check these ${ws.length}</button>`)}
function cstart(){PS.on=0;Q=cuWords().slice(0,8).map(w=>({ty:'word',id:w,m:'mean',v:true,cu:1,nw:1}));qi=0;next()}
function toStart(i){PS.on=0;TO={on:1,r:[]};const p=lp(i,'std');Q=i>=0?[...LS[i].map(c=>({ty:'kana',id:c,m:'write',to:1,nw:1})),...uWords(i).filter(w=>!S.w[w]).map(w=>({ty:'word',id:w,m:'mean',v:true,to:1,nw:1}))]:p.j.map(k=>({ty:'kanji',id:k,m:'type',to:1,nw:1}));qi=0;next()}
function tres(){const ok=TO.r.filter(x=>x[2]),no=TO.r.filter(x=>!x[2]);ok.forEach(([ty,id])=>{if(ty=='kana')S.k[id]={b:3,d:day()+4,wr:1};else if(ty=='word')S.w[id]={b:3,d:day()+4};else S.j[id]={b:3,d:day()+4,r:KR[id],m:MEAN[id]}});save();TO.on=0;
  h(`<h2>Test result</h2><section class=card><p><b>${ok.length}</b> item${ok.length==1?'':'s'} counted as known. They come back for review in a few days.</p>${no.length?`<p><b>${no.length}</b> still need learning: <span class=jp>${no.map(x=>x[1]).join(' ')}</span>. They stay on your path.</p>`:''}</section><button class=big onclick=home()>Back to the path</button>`)}
function first(){h(`<h2>Welcome to Waves of Kana</h2><p class=s>How much do you already know? You can change this later.</p>${[['Nothing yet','Start with the first row of hiragana.','S.set=1;save();home()'],['Some kana','Pick the kana I can already read.','place()'],['All the kana','I can read and write hiragana and katakana. Then check which words I know.','allk()']].map(([a,b,f])=>`<button class="card big2" onclick="${f}"><b>${a}</b><br><span class=s>${b}</span></button>`).join('')}`)}
const allk=()=>{PM=1;ALL.forEach(c=>{if(!S.k[c])S.k[c]={b:1,d:day()+1+(Math.random()*5|0),wr:1}});S.set=1;save();placeSum()};
const tab=n=>{const t=$('#tabs');if(!t)return;t.hidden=false;[...t.children].forEach(b=>b.setAttribute('aria-current',b.dataset.t==n))};
const lv=c=>!S.k[c]?0:S.k[c].b<2?1:S.k[c].b<4?2:3;
function read(){const us=STORY.filter(s=>unl(s,c=>S.k[c]));h(`<h2>Read</h2><section class=card>${us.length?us.map(s=>`<button class=li onclick="story('${s.id}',1)">${S.st[s.id]?'✓ ':''}${s.t}</button>`).join(''):'<p class=s style="margin:0">Stories unlock as you learn kana.</p>'}<p class=s>${STORY.length-us.length} more unlock as you learn kana. Open a story to read it, tap words for their meaning, and take its quiz.</p></section>`);tab('read')}
function you(){const nj=Object.keys(S.j).length,cell=c=>`<span class="c l${lv(c)}">${c}</span>`;
  h(`<h2>You</h2><section class=card><p style="margin:0">You can read <b>${Object.keys(S.k).length}</b> kana, <b>${Object.keys(S.w).length}</b> words and <b>${nj}</b> kanji.</p></section>
  <section class=card><h3>Hiragana</h3><div class=g>${ALL.filter(c=>c<'ァ').map(cell).join('')}</div><h3>Katakana</h3><div class=g>${ALL.filter(c=>c>='ァ').map(cell).join('')}</div><p class=s>Faint: not learned yet. Pale to solid: how well you know it.</p></section>
  ${nj?`<section class=card><h3>Kanji</h3><p class=jp style="margin:0">${Object.keys(S.j).join(' ')}</p></section>`:''}
  <section class=card><h3>Settings</h3><label><input type=checkbox ${S.ord?'checked':''} onchange="S.ord=+this.checked;save()"> Stroke order must match</label><label><input type=checkbox ${S.kt?'checked':''} onchange="S.kt=+this.checked;save()"> Learn katakana alongside hiragana</label><button onclick=place()>Edit the kana I know</button><button onclick=exp()>Export progress</button><label>Import progress <input type=file accept=.json onchange=imp(this)></label></section>
  <details class=card><summary>Developer: checker tuning</summary>${dbg()}</details>
  <p><small>Stroke data: KanjiVG © Ulrich Apel, CC BY-SA 3.0. Word data: JMdict and KANJIDIC2 © EDRDG. Progress is stored in this browser only, so export it now and then.</small></p>`);tab('you')}
function placeSum(){const nk=Object.keys(S.k).length,cw=cuWords().length;
  h(`<h2>Your starting point</h2><section class=card><p><b>${nk}</b> kana marked as known.</p><p>${cw?`<b>${cw}</b> words use those kana. Nothing is assumed about them. They wait under <b>Catch-up</b> until you check them.`:'No words are waiting yet.'}</p></section>${cw?'<button class=big onclick=catchup()>Check these words now</button>':''}<button class=big style="background:var(--sf);color:var(--ink);border-color:var(--ln)" onclick=home()>Go to the path</button><button onclick=place()>← Edit kana</button>`)}
function lesson(i){const len=S.len||'std',p=lp(i,len),dl=dueL().length,g=(a,l)=>a.length?`<h3>${l}</h3><div class=chips>${a.map(x=>`<span class=gl>${x}</span>`).join('')}</div>`:'';
  h(`<div class=top><button class=x aria-label=Back onclick=home()>←</button><h2 style="margin:0">${i>=0?'Lesson':'Kanji lesson'}</h2></div>
  <section class=card><h3>Session length</h3><div class=chips>${[['short','Short · about 5 min'],['std','Standard · about 15 min'],['long','Long · extra words and a story']].map(([v,l])=>`<button class=chip aria-pressed="${len==v}" onclick="S.len='${v}';save();lesson(${i})">${l}</button>`).join('')}</div></section>
  <section class=card>${g(p.kana,'New kana')}${g([...p.w,...p.w2],'Words')}${g(p.j,'Kanji')}${p.sty?`<h3>Story</h3><p style="margin:0">“${p.sty.t}”</p>`:''}</section>
  ${dl&&len!='short'?`<label class=sw><span>Start with a short review (${Math.min(dl,len=='long'?4:3)} due)</span><input type=checkbox ${S.wu===0?'':'checked'} onchange="S.wu=this.checked?1:0;save()"></label>`:''}
  <button class=big onclick="lstart(${i})">Start</button><button class=big style="background:var(--sf);color:var(--ink);border-color:var(--ln)" onclick="toStart(${i})">I already know this: test me</button>`)}
function lstart(i){PS.on=0;const len=S.len||'std',p=lp(i,len),q=[],K=p.kana,wa=[...p.w,...p.w2],mk=(ty,id,m,e)=>({ty,id,m,nw:1,...e}),tp=c=>RO[c].includes(' ')?'write':'type',mv=w=>mk('word',w,'mean',{v:Math.random()<.5}),gate=(name,ts)=>q.push({ty:'gate',name,ts});
  if(S.wu!==0&&len!='short')dueL().slice(0,len=='long'?4:3).forEach(x=>q.push(rq1(x)));
  K.forEach(c=>q.push(mk('kana',c,'meet'),mk('kana',c,'write')));if(K.length)gate('Writing the kana',K.map(c=>mk('kana',c,'write')));
  K.forEach(c=>q.push(mk('kana',c,tp(c))));if(K.length&&(wa.length||p.j.length))gate('Reading the kana',K.map(c=>mk('kana',c,tp(c))));
  wa.forEach(w=>q.push(mk('word',w,'meet'),mk('word',w,'write')));
  if(len!='short'&&wa.length){gate('Writing the words',wa.map(w=>mk('word',w,'write')));wa.forEach(w=>q.push(mv(w)));gate('Word meanings',wa.map(mv))}
  p.j.forEach(k=>q.push(mk('kanji',k,'meet'),mk('kanji',k,'write'),mk('kanji',k,'type')));
  if(len!='short')shuf([...K.map(c=>({ty:'kana',id:c,m:tp(c)})),...wa.map(w=>({ty:'word',id:w,m:'mean',v:Math.random()<.5})),...p.j.map(k=>({ty:'kanji',id:k,m:'type'}))]).forEach(x=>q.push(x));
  if(p.sty){q.push({ty:'story',id:p.sty.id});p.sty.n.forEach(w=>{const j=p.sty.l.findIndex(l=>pl(l[0]).includes(w));if(j>=0)q.push({ty:'cloze',sid:p.sty.id,li:j,id:w,nw:1})});q.push(...quizQ(p.sty.id))}
  Q=q;qi=0;next()}
function gate(t){h(`<h2>${t.name}: how does it feel?</h2><p class=s>Move on when you are comfortable, or run this step once more.</p><button class=big onclick=next()>Continue</button><button class=big id=gr style="background:var(--sf);color:var(--ink);border-color:var(--ln)">Practice this step again</button>`);$('#gr').onclick=()=>{Q.splice(qi,0,...shuf(t.ts.map(x=>({...x}))),t);next()}}
const norm=s=>s.toLowerCase().replace(/\(.*?\)/g,'').replace(/^(to|a|an|the) /,'').replace(/[^a-z ]/g,'').trim();
const lev=(a,b)=>{const d=Array.from({length:a.length+1},(_,i)=>[i,...Array(b.length).fill(0)]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]!=b[j-1]));return d[a.length][b.length]};
const mok=(v,m)=>{const x=norm(v);return !!x&&m.split(/[;,\/]/).some(a=>{a=norm(a);return a==x||(a.length>=5&&lev(a,x)<=1)})};
function meanT(t){let v='',d=0;const m=MEAN[t.id];
  h(`<h1>${t.v?t.id:rom(t.id)}</h1><button onclick="say('${t.id}')">🔊</button><p class=s>Type the English meaning</p><div class=ty id=ty>…</div><div id=m></div><div class=kb>${KB}<div><button class=kk data-k="␣" style="max-width:none;flex:4">space</button></div><div><button id=dk>I don’t know</button><button id=ent class=big style="width:auto;flex:1;margin:4px">Check</button></div></div>`);
  const fin=ok=>{if(d)return;d=1;$('#ty').style.color=ok?'#2a9d4a':'#d33';$('#m').innerHTML=(ok?'✓ ':'')+`<b>${t.id}</b> = ${m}`;if(t.pr)pdone(t,ok);else if(!t.nw)grade(t,ok);if(t.cu){if(ok){S.w[t.id]={b:3,d:day()+4};save()}else Q.splice(qi,0,{ty:'word',id:t.id,m:'meet',nw:1},{ty:'word',id:t.id,m:'write',nw:1},{ty:'word',id:t.id,m:'mean',v:false})}if(t.to)TO.r.push(['word',t.id,ok]);later(next,ok?900:2200)};
  bindKB(k=>{if(d)return;v=k=='⌫'?v.slice(0,-1):v+(k=='␣'?' ':k);$('#ty').textContent=v||'…'});
  $('#ent').onclick=()=>fin(mok(v,m));$('#dk').onclick=()=>fin(false)}
const GL={'は':'topic marker (read “wa”)','が':'subject marker','を':'object marker (read “o”)','に':'at, to','で':'at, by means of','へ':'toward (read “e”)','も':'also, too','の':'of, ’s','と':'and, with','です':'is, am (polite)','さん':'Mr, Ms (polite)'};let LXc;
function tk(t,raw){LXc=LXc||(()=>{const m={...GL,'、':'','。':''};W.forEach(([w,g])=>m[w]=g);Object.keys(KR).forEach(k=>{if(!m[KR[k]])m[KR[k]]=MEAN[k]});return m})();
  const K=kc(),pc=[],fr=[];
  t.replace(/ /g,'').split(/(\{[^}]*\})/).forEach(p=>{const m=p.match(/^\{([^|}]*)\|([^}]*)\}$/);
    if(m){const ch=[...m[1]].filter(c=>c>='\u4e00'),ok=ch.length&&ch.every(c=>K.has(c));[...m[2]].forEach((c,i)=>{pc.push(c);fr.push(ok?(i?'':`<ruby>${m[1]}<rt>${ch.some(c=>bx(c)<4)?m[2]:''}</rt></ruby>`):c)})}
    else[...p].forEach(c=>{pc.push(c);fr.push(c)})});
  const n=pc.length,b=Array(n+1).fill(1e9),pv=Array(n+1).fill(-1);b[0]=0;
  for(let i=0;i<n;i++)if(b[i]<1e9)for(let L=1;L<=9&&i+L<=n;L++)if(pc.slice(i,i+L).join('') in LXc&&b[i]+1<b[i+L]){b[i+L]=b[i]+1;pv[i+L]=i}
  if(b[n]>=1e9)return raw?[pl(t)]:rd(t);
  const o=[];for(let j=n;j>0;j=pv[j])o.unshift([pv[j],j]);if(raw)return o.map(([i,j])=>pc.slice(i,j).join(''));
  return o.map(([i,j])=>{const w=pc.slice(i,j).join(''),g=LXc[w];return g?`<span class=w data-w="${w}" data-g="${g.replace(/"/g,'&quot;')}">${fr.slice(i,j).join('')}</span>`:fr.slice(i,j).join('')}).join('')}
const IT=(()=>{const t={};ALL.filter(c=>c<'ァ'&&!'ゃゅょっ'.includes(c)).forEach(c=>{if(!(RO[c] in t))t[RO[c]]=c});for(const c of 'きしちにひみりぎじびぴ')for(const y of 'ゃゅょ')t[rom(c+y)]=c+y;return Object.assign(t,{si:'し',ti:'ち',tu:'つ',hu:'ふ',zi:'じ',di:'ぢ',du:'づ',sya:'しゃ',syu:'しゅ',syo:'しょ',tya:'ちゃ',tyu:'ちゅ',tyo:'ちょ',zya:'じゃ',zyu:'じゅ',zyo:'じょ',jya:'じゃ',jyu:'じゅ',jyo:'じょ'})})();
const ime=s=>{let o='',i=0;s=s.toLowerCase();while(i<s.length){let m=0;for(const L of[3,2,1]){const k=s.slice(i,i+L);if(k.length==L&&IT[k]){o+=IT[k];i+=L;m=1;break}}if(m)continue;const c=s[i];if(s[i+1]==c&&!'aiueon '.includes(c)){o+='っ'}else o+=c;i++}return o};
const sok=(tw,v)=>{const x=nr(v.replace(/[^a-z]/gi,'')),ws=tw.filter(w=>RO[w[0]]),a=ws.map(w=>({は:'wa',を:'o',へ:'e'}[w]||rom(w))).join(''),b=ws.map(w=>rom(w)).join('');return x==nr(a)||x==nr(b)};
const quizQ=id=>{const s=STORY.find(x=>x.id==id),pk=shuf(s.l.map((l,i)=>[l,i]).filter(([l])=>l[0]!='#'&&s.n.some(w=>pl(l[0]).includes(w)))).slice(0,3);return[...(s.q||[]).map(([q,a])=>({ty:'sq',sid:id,q,a:[].concat(a),nw:1})),...pk.map(([,i])=>({ty:'sq',sid:id,li:i,nw:1}))]};
const BIG='あいうえおつやゆよ',SMALL='ぁぃぅぇぉっゃゅょ',toK=c=>c>='ァ'&&c<='ヶ'?String.fromCharCode(c.charCodeAt(0)-96):c,clean=v=>v.replace(/[^\u3041-\u3096\u30a1-\u30fc]/g,'');
const JC=['あいうえお','かきくけこ','さしすせそ','たちつてと','なにぬねの','はひふへほ','まみむめも','や_ゆ_よ','らりるれろ','わ_を_ん'].map(x=>[...x]);
if(typeof addEventListener=='function'){const pop=document.createElement('div');pop.id='pop';document.body.append(pop);
  addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.jk,.kk');if(!b||b.classList.contains('fk')||b.classList.contains('ck'))return;if(navigator.vibrate)navigator.vibrate(8);const r=b.getBoundingClientRect();pop.textContent=b.textContent;pop.style.cssText=`display:grid;left:${r.left+r.width/2}px;top:${r.top}px`},true);
  ['pointerup','pointercancel','scroll'].forEach(t=>addEventListener(t,()=>{pop.style.display='none'},true))}
function ibox(chk,idk,rr){const ref={v:'',lock:0},st={k:0},kana=S.kbm!='r',box=$('#kbx'),ty=$('#ty');ref.kana=kana;
  const sh=()=>{ty.textContent=(kana?ref.v:ime(ref.v))||'…'},ch=c=>st.k?String.fromCharCode(c.charCodeAt(0)+96):c;
  const grid=()=>[0,1,2,3,4].map(r=>JC.map(c=>c[r]=='_'?'<i></i>':`<button class=jk data-k="${ch(c[r])}">${ch(c[r])}</button>`).join('')).join('');
  box.innerHTML=`<div class=kt><button class=tb data-k="ア" ${kana?'':'hidden'}>ア/あ</button><button class=tb id=sw>${kana?'Romaji keyboard':'Japanese keyboard'}</button><button class=tb id=dk>I don’t know</button></div>`+(kana?`<div class=jg id=jg>${grid()}</div><div class=jr>${['゛','゜','小','ー','、','。'].map(k=>`<button class="jk fk" data-k="${k}">${k}</button>`).join('')}<button class="jk fk" data-k="⌫">⌫</button><button id=ent class="jk ck">Check</button></div>`:`${KB}<div class="jr r2"><button class="kk fk" data-k="␣">space</button><button id=ent class="kk ck">Check</button></div>`);
  box.onpointerdown=e=>{const b=e.target.closest('[data-k]');if(!b||ref.lock)return;e.preventDefault();const k=b.dataset.k;
    if(!kana){ref.v=k=='⌫'?ref.v.slice(0,-1):ref.v+(k=='␣'?' ':k);sh();return}
    if(k=='ア'){st.k^=1;$('#jg').innerHTML=grid();return}
    const a=[...ref.v],l=a[a.length-1];
    if(k=='⌫')a.pop();else if(k=='␣')a.push('　');
    else if(k=='゛'||k=='゜'){if(l){const d=l.normalize('NFD'),m=k=='゛'?'\u3099':'\u309a',n=(d[0]+(d[1]==m?'':m)).normalize('NFC');if([...n].length==1)a[a.length-1]=n}}
    else if(k=='小'){if(l){const h=toK(l),i=BIG.indexOf(h),j=SMALL.indexOf(h),nh=i>=0?SMALL[i]:j>=0?BIG[j]:h;a[a.length-1]=l==h?nh:String.fromCharCode(nh.charCodeAt(0)+96)}}
    else a.push(k);
    ref.v=a.join('');sh()};
  $('#ent').onclick=()=>chk(ref);$('#dk').onclick=()=>idk(ref);$('#sw').onclick=()=>{S.kbm=kana?'r':'k';save();rr()};return ref}
function sentT(t){const s=STORY.find(x=>x.id==t.sid),cq=t.q!=null,ln=cq?null:s.l[t.li];let I;
  h(`<p class=s>From “${s.t}”: ${cq?'answer in Japanese':'write this in Japanese'}</p><h2>${cq?t.q:ln[1]}</h2><div class="ty jp" id=ty>…</div><div id=m class=fb></div><div id=kbx class=kb></div>`);
  const fin=ok=>{I.lock=1;$('#ty').style.color=ok?'#2a9d4a':'#d33';$('#m').innerHTML=(ok?'<b>✓ Correct.</b> ':'')+(cq?`Answer: <b class=jp>${t.a.join(' / ')}</b>`:`<div class=jp>${rd(ln[0])}</div>`);const b=document.createElement('button');b.className='chip';b.textContent='Next';b.onclick=next;$('#m').append(b)};
  I=ibox(r=>{if(I.lock)return;const x=nr(r.kana?rom(clean(r.v)):r.v.replace(/[^a-z]/gi,''));let ok;
    if(cq)ok=!!x&&t.a.some(a=>x.includes(nr(rom(a))));
    else{const tw=tk(ln[0],1);ok=r.kana?x==nr(tw.filter(w=>RO[w[0]]).map(w=>rom(w)).join('')):sok(tw,r.v)}fin(ok)},()=>{if(!I.lock)fin(false)},()=>sentT(t))}
function cloze(t){const s=STORY.find(x=>x.id==t.sid),l=s.l[t.li];let I;
  h(`<p class=s>From the story “${s.t}”: type the missing word in Japanese</p><div class=jp>${pl(l[0]).replace(t.id,'＿＿＿')}</div><p class=s>${l[1]}</p><div class="ty jp" id=ty>…</div><div id=m class=fb></div><div id=kbx class=kb></div>`);
  const fin=ok=>{I.lock=1;$('#ty').style.color=ok?'#2a9d4a':'#d33';$('#m').innerHTML=(ok?'Nice! ':`It is <b class=jp>${t.id}</b>. `)+rd(l[0]);later(next,ok?1500:2600)};
  I=ibox(r=>{if(!I.lock)fin(nr(r.kana?rom(clean(r.v)):r.v.replace(/[^a-z]/gi,''))==nr(rom(t.id)))},()=>{if(!I.lock)fin(false)},()=>cloze(t))}
function story(id,again){const s=STORY.find(x=>x.id==id);
  h(`<h2>${s.t}</h2>${s.n.length?`<p class=s>New words: ${s.n.map(w=>w+' ('+MEAN[w]+')').join(', ')}</p>`:''}${s.l.map(l=>l[0]=='#'?`<div class=scene role=img aria-label="Image placeholder"><span>Image: ${l[1]}</span></div>`:`<div class=jp>${tk(l[0])} <button onclick="say('${pl(l[0])}')">🔊</button></div><div class=en onclick="this.classList.toggle('show')"><i>Tap for English</i><span>${l[1]}</span></div>`).join('')}<p class=s>Tap any word for its meaning, or tap a line for the English.</p>${s.note?`<p class=s>${s.note}</p>`:''}<button class=big onclick="S.st['${id}']=1;save();${again?'home()':'next()'}">${again?'Back':'Done'}</button>${again?`<button class=big onclick="PS.on=0;Q=quizQ('${id}');qi=0;next()" style="background:var(--sf);color:var(--ink);border-color:var(--ln)">Quiz me on this story</button>`:''}<div id=tip class=tip hidden></div>`);
  A.onclick=e=>{const w=e.target.closest('.w');if(!w)return;document.querySelectorAll('.w.on').forEach(x=>x.classList.remove('on'));w.classList.add('on');const d=$('#tip');d.hidden=false;d.innerHTML=`<b>${w.dataset.w}</b> · ${rom(w.dataset.w)}<span>${w.dataset.g}</span><button onclick="say('${w.dataset.w}')">🔊 Listen</button>`}}

const sta=(id,ok)=>{(S.a[id]=S.a[id]||[0,0])[ok?0:1]++};
const nr=s=>s.toLowerCase().replace(/sy([auo])/g,'sh$1').replace(/ty([auo])/g,'ch$1').replace(/(?:zy|jy)([auo])/g,'j$1').replace(/si/g,'shi').replace(/ti/g,'chi').replace(/tu/g,'tsu').replace(/(?<![sc])hu/g,'fu').replace(/zi/g,'ji').replace(/ou|oo/g,'o').replace(/uu/g,'u').replace(/ei|ee/g,'e').replace(/aa/g,'a').replace(/ii/g,'i').replace(/nn/g,'n');
const KB=['qwertyuiop','asdfghjkl','zxcvbnm⌫'].map((r,i)=>`<div class=kr${i}>${[...r].map(k=>`<button class="kk${k=='⌫'?' fk':''}" data-k="${k}">${k}</button>`).join('')}</div>`).join('');
const bindKB=cb=>document.querySelectorAll('.kk').forEach(b=>b.onpointerdown=e=>{e.preventDefault();cb(b.dataset.k)});
let PP={pre:'all',cnt:10,m:{write:1,type:1,dict:1,rec:0},re:1};
function practice(){const dl=dueL(),rv=`<section class=card><h3>Review</h3>${dl.length?`<button class=big onclick=rstart()>Review now (${Math.min(12,dl.length)} of ${dl.length} due)</button>`:'<p class=s style="margin:0">Nothing is due right now.</p>'}</section>`,ch=(l,on,f)=>`<button class=chip aria-pressed="${!!on}" onclick="${f}">${l}</button>`,
  pre=[['all','All known'],['hira','Hiragana'],['kata','Katakana'],['words','Words'],['kanji','Kanji'],['due','Due today'],['weak','Weak spots'],['look','Look-alikes'],['small','Dakuten and small']];
  h(`<div class=top><button class=x aria-label=Back onclick=home()>←</button><h2 style="margin:0">Practice</h2></div>${rv}
  <section class=card><h3>What to practice</h3><div class=chips>${pre.map(([v,l])=>ch(l,!sel.size&&PP.pre==v,`PP.pre='${v}';sel.clear();practice()`)).join('')}</div>
  <details><summary>Or pick specific items${sel.size?' ('+sel.size+')':''}</summary><div class=pr>${[...Object.keys(S.k),...Object.keys(S.w),...Object.keys(S.j)].map(c=>`<button class="k ${sel.has(c)?'on':''}" onclick="sel.has('${c}')?sel.delete('${c}'):sel.add('${c}');this.classList.toggle('on')">${c}</button>`).join('')}</div><button onclick="sel.clear();practice()">Clear choice</button></details></section>
  <section class=card><h3>How many questions</h3><div class=chips>${[10,20,50,0].map(n=>ch(n||'All',PP.cnt==n,`PP.cnt=${n};practice()`)).join('')}</div></section>
  <section class=card><h3>Question types</h3><div class=chips>${[['write','Draw it'],['type','Type romaji'],['dict','Listen and write'],['rec','Tap the answer']].map(([m,l])=>ch(l,PP.m[m],`PP.m.${m}=PP.m.${m}?0:1;practice()`)).join('')}</div></section>
  <section class=card><label class=sw><span>Repeat mistakes until correct</span><input type=checkbox ${PP.re?'checked':''} onchange="PP.re=+this.checked"></label></section>
  <button class=big onclick=pstart()>Start</button><button class=big onclick=pstart(1) style="background:var(--sf);color:var(--ink);border-color:var(--ln)">Play Star storm (typing game)</button>`);tab('practice')}
function pstart(g){const K=Object.keys(S.k).map(id=>['kana',id]),Wd=Object.keys(S.w).map(id=>['word',id]),J=Object.keys(S.j).map(id=>['kanji',id]),all=[...K,...Wd,...J],sd=x=>bag(x[0])[x[1]],pre=PP.pre;
  const F={all:()=>all,hira:()=>K.filter(x=>x[1]<'ァ'),kata:()=>K.filter(x=>x[1]>='ァ'),words:()=>Wd,kanji:()=>J,due:()=>all.filter(x=>sd(x).d<=day()),weak:()=>all.filter(x=>{const a=S.a[x[1]];return a&&a[1]/(a[0]+a[1])>=.3}),look:()=>K.filter(x=>'シツソンノぬめわれねるろ'.includes(x[1])),small:()=>K.filter(x=>x[1].normalize('NFD').length>1||'ゃゅょっャュョッ'.includes(x[1]))};
  const p=sel.size?all.filter(x=>sel.has(x[1])):F[pre]();if(!p.length)return alert('Nothing to practice in that selection yet.');
  const on=Object.keys(PP.m).filter(m=>PP.m[m]),n=PP.cnt||p.length;if(!on.length)on.push('write');
  PS={on:1,re:!!PP.re,ok:0,tot:0,miss:{},fix:new Set};
  if(g){PS.on=0;return game(p.filter(x=>x[0]!='kana'||!RO[x[1]].includes(' ')))}
  let l=[];while(l.length<n)l.push(...shuf(p.slice()));
  Q=l.slice(0,n).map(([ty,id])=>{let a=on.filter(m=>m!='dict'||ty=='word');if(!a.length)a=['write'];let m=a[Math.random()*a.length|0];if(m=='type'&&ty=='kana'&&RO[id].includes(' '))m='write';if(ty=='kanji'&&m=='rec')m='type';return{ty,id,m,pr:1}});qi=0;next()}
function pdone(t,ok){sta(t.id,ok);PS.tot++;if(ok){PS.ok++;PS.fix.delete(t.id)}else{const c=PS.miss[t.id]=(PS.miss[t.id]||0)+1;PS.fix.add(t.id);if(PS.re&&c<3)Q.splice(Math.min(qi+3,Q.length),0,{...t});else PS.fix.delete(t.id)}save()}
function psum(){const m=Object.keys(PS.miss);PS.on=0;h(`<h2>Done</h2><h1>${PS.ok}/${PS.tot}</h1><p class=s>${PS.tot?Math.round(PS.ok*100/PS.tot):0}% correct</p>${m.length?`<p>Missed: ${m.join(' ')}</p><button class=big onclick="sel=new Set(${JSON.stringify(m)});practice()">Practice my mistakes</button>`:''}<button onclick=practice()>Practice again</button><button onclick=home()>Home</button>`)}
function typeT(t){let v='',d=0;const ans=t.ty=='kana'?RO[t.id]:rom(KR[t.id]||t.id);
  h(`<h1>${t.id}</h1><button onclick="say('${t.id}')">🔊</button><div class=ty id=ty>…</div><div id=m></div><div class=kb>${KB}<button id=ent class=big>Check</button></div>`);
  bindKB(k=>{if(d)return;v=k=='⌫'?v.slice(0,-1):v+k;$('#ty').textContent=v||'…'});
  $('#ent').onclick=()=>{if(d)return;d=1;const ok=nr(v)==nr(ans)||(t.id=='を'||t.id=='ヲ')&&nr(v)=='o';$('#m').innerHTML=ok?'Nice!':`It is <b>${ans}</b>`;$('#ty').style.color=ok?'#2a9d4a':'#d33';if(t.pr)pdone(t,ok);else if(!t.nw)grade(t,ok);if(t.to)TO.r.push([t.ty,t.id,ok]);setTimeout(next,ok?600:1600)}}
function game(it){let lives=3,sc=0,cb=0,cur='',T=[],run=1,lt=0,sp=0,hit={},mis={};
  h(`<div id=hud class=s></div><div class=fld id=fld></div><div class=ty id=ty>…</div><div class=kb>${KB}</div><button id=qt>Quit</button>`);
  const fl=$('#fld'),hud=()=>$('#hud').textContent=`❤ ${lives} · ${sc} pts · combo ${cb}`;hud();
  const kill=(t,ok)=>{t.e.remove();T=T.filter(x=>x!=t);sta(t.id,ok);if(ok)hit[t.id]=1;else mis[t.id]=1};
  bindKB(k=>{cur=k=='⌫'?cur.slice(0,-1):cur+k;const c=nr(cur);
    if(!T.some(x=>x.a.startsWith(c))){cur='';cb=0}else{const t=T.find(x=>x.a==c);if(t&&!T.some(x=>x!=t&&x.a.startsWith(c)&&x.a.length>c.length)){kill(t,1);sc+=10+cb;cb++;cur=''}}
    $('#ty').textContent=cur||'…';hud()});
  const over=()=>{save();const m=Object.keys(mis);h(`<h2>Game over</h2><h1>${sc}</h1><p>Missed: ${m.join(' ')||'none'}</p><button class=big onclick="sel=new Set(${JSON.stringify(m)});practice()">Practice my misses</button><button onclick=practice()>Back</button>`)};
  const loop=ts=>{if(!run)return;const dt=Math.min((ts-lt)/1000,.1);lt=ts;sp-=dt;
    if(sp<=0){const[ty,id]=it[Math.random()*it.length|0],e=document.createElement('div');e.className='t';e.textContent=id;e.style.left=12+Math.random()*70+'%';fl.append(e);T.push({id,ty,e,y:0,a:nr(ty=='kana'?RO[id]:rom(KR[id]||id))});sp=Math.max(1.1,2.8-sc/150)}
    T.slice().forEach(t=>{t.y+=dt*(7+sc/40);t.e.style.top=t.y+'%';if(t.y>=90){kill(t,0);lives--;cb=0;hud()}});
    if(lives<=0){run=0;return over()}requestAnimationFrame(loop)};
  $('#qt').onclick=()=>{run=0;practice()};requestAnimationFrame(ts=>{lt=ts;loop(ts)})}

function next(){const t=Q[qi++];if(!t)return TO.on?tres():PS.on?psum():h(`<h2>Session complete</h2><p class=s>Nice work. Reviews show up under Practice when they are due.</p><button class=big onclick=home()>Home</button>`);t.ty=='gate'?gate(t):t.ty=='sq'?sentT(t):t.m=='mean'?meanT(t):t.ty=='cloze'?cloze(t):t.ty=='story'?story(t.id):t.m=='meet'?meet(t):t.m=='rec'?rec(t):t.m=='type'?typeT(t):writeT(t);A.insertAdjacentHTML('afterbegin',`<div class=top><button class=x aria-label=Exit onclick="if(confirm('Leave this session? Progress so far is kept.'))home()">✕</button><div class=bar><i style="width:${Math.min(100,(qi-1)/Q.length*100)}%"></i></div>${PS.on&&PS.re?`<span class=s>${PS.fix.size} to fix</span>`:''}</div>`)}
const bag=ty=>ty=='kana'?S.k:ty=='kanji'?S.j:S.w;
const kc=()=>new Set(Object.keys(S.j).join('')),bx=c=>Math.max(0,...Object.entries(S.j).filter(([k])=>k.includes(c)).map(([,v])=>v.b));
const rd=t=>t.replace(/\{([^|}]*)\|([^}]*)\}/g,(m,k,r)=>{const ch=[...k].filter(c=>c>='\u4e00'),K=kc();return ch.length&&ch.every(c=>K.has(c))?`<ruby>${k}<rt>${ch.some(c=>bx(c)<4)?r:''}</rt></ruby>`:r}),pl=t=>t.replace(/\{[^|}]*\|([^}]*)\}/g,'$1').replace(/ /g,'');
function grade(t,ok){sta(t.id,ok);const v=bag(t.ty)[t.id];if(!v)return;v.b=ok?Math.min(v.b+1,6):0;v.d=day()+(ok?IV[v.b]:0);save()}
function meet(t){const k=t.ty=='kana',kj=t.ty=='kanji',v=bag(t.ty);v[t.id]=v[t.id]||{b:1,d:day()+1};if(kj){v[t.id].r=KR[t.id];v[t.id].m=MEAN[t.id]}save();
  h(`<h1>${t.id}</h1><p>${k?RO[t.id]:kj?MEAN[t.id]+' · '+KR[t.id]+' · '+rom(KR[t.id]):MEAN[t.id]+' · '+rom(t.id)}${hint(t)}</p><button onclick="say('${t.id}')">🔊 Listen</button>${(k||kj&&t.id.length==1)?'<canvas id=c width=320 height=320></canvas>':''}<button class=big onclick=next()>Next</button>`);
  say(t.id);if(k||kj&&t.id.length==1){const c=$('#c');pad(c);if(ST[t.id])anim(c,ST[t.id])}}
function rec(t){const k=t.ty=='kana',ans=k?RO[t.id]:MEAN[t.id],pool=k?ALL.filter(c=>S.k[c]||c==t.id).map(c=>RO[c]):W.map(w=>w[1]);
  const o=shuf([ans,...shuf([...new Set(pool)].filter(p=>p!=ans)).slice(0,3)]);
  h(`<h1>${t.id}</h1><button onclick="say('${t.id}')">🔊</button><div>${o.map(v=>`<button class=o>${v}</button>`).join('')}</div>`);
  document.querySelectorAll('.o').forEach(b=>b.onclick=()=>{const ok=b.textContent==ans;document.querySelectorAll('.o').forEach(z=>{z.onclick=null;if(z.textContent==ans)z.style.background='#2a9d4a';else if(z==b)z.style.background='#d33'});if(t.pr)pdone(t,ok);else if(!t.nw)grade(t,ok);setTimeout(next,ok?500:1400)})}
function mini(cv,st){const x=cv.getContext('2d'),k=cv.width/320;x.setTransform(k,0,0,k,0,0);x.clearRect(0,0,320,320);x.fillStyle=getComputedStyle(cv).color;st.forEach(q=>brush(x,q));x.setTransform(1,0,0,1,0,0)}
function writeT(t){const ch=t.ty=='kana'?[t.id]:[...t.id],n=ch.length,strict=n==1,res=Array(n).fill(null);let cur=0,bad=0,fin=0,romOn=t.ty=='word'&&!!t.nw;
  const base=t.m=='dict'?'Listen, then write the word':t.ty=='kana'?RO[t.id]:t.ty=='kanji'?MEAN[t.id]+' ('+KR[t.id]+')':(romOn?rom(t.id)+' · ':'')+MEAN[t.id];
  h(`<h2 id=pr>${base}</h2><div class=row2><button onclick="say('${t.id}')">🔊 Listen</button><button id=hn class=tg aria-pressed=false>💡 Hint</button></div>${n>1?`<div class=wlw><button class=sc id=sl aria-label="Scroll left">◀</button><div class=wl id=wl>${ch.map((c,i)=>`<button class=wb data-i=${i}><canvas width=104 height=104></canvas><i></i></button>`).join('')}</div><button class=sc id=sr aria-label="Scroll right">▶</button></div>`:''}<div class=cw><canvas id=c width=320 height=320></canvas><button id=ov class=ov hidden><span>Tap to try again</span></button></div><div id=m class=fb></div><div id=bt><button id=un>↶ Undo</button><button id=cl>Clear</button><button id=go>→</button></div>`);
  const M=$('#m'),P0=pad($('#c'));P=P0;
  const upd=()=>{if(n<2)return;[...$('#wl').children].forEach((b,i)=>{const r=res[i];b.className='wb'+(r?' '+r.v:'')+(i==cur&&!fin?' cur':'');b.lastChild.textContent=r?{ok:'✓',near:'~',bad:'!'}[r.v]:'';if(r)mini(b.firstChild,r.s);else b.firstChild.getContext('2d').clearRect(0,0,104,104)});try{$('#wl').children[cur].scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'})}catch(e){}};
  const setRef=()=>{P.ref=ST[ch[cur]];P.showRef=0;P.lock=0;$('#hn').setAttribute('aria-pressed',false);P.clear();upd()};
  const done=()=>{clrT();if(t.ty=='kana'&&!bad&&S.k[t.id])S.k[t.id].wr=1;if(t.to)TO.r.push([t.ty,t.id,!bad]);if(t.nw){const v=bag(t.ty)[t.id];v.b=bad?0:1}if(t.pr)pdone(t,!bad);else grade(t,!bad);next()};
  const nxt=()=>{const b=document.createElement('button');b.className='chip';b.textContent='Next';b.onclick=done;M.append(b)};
  const wd=()=>{const bc=res.filter(r=>r.v=='bad').length,nr=res.filter(r=>r.v=='near').length;
    if(!bc){fin=1;P.lock=1;upd();M.innerHTML=`<b>✓ Word correct!</b> ${nr?'<span class=s>A few characters were slightly off. Tap a box to see why.</span> ':''}`;nxt();later(done,D().okMs+(nr?1500:0))}
    else{bad++;M.innerHTML=`<b>Almost.</b> ${bc} character${bc>1?'s need':' needs'} another try. Tap a red box to redraw it.`;cur=res.findIndex(r=>r&&r.v=='bad');setRef()}};
  const commit=()=>{clrT();if(P.lock||!P.s.length)return;const r=check(P.s,ST[ch[cur]],D(),S.ord);
    if(strict){P.lock=1;if(r.ok){P.showRef=1;P.show(r.det);M.innerHTML='<b>✓ You did it right!</b> <span class=s>The blue dashes show the reference.</span> ';nxt();later(done,D().okMs)}
      else{bad++;P.show(null);later(()=>{P.show(r.det);M.innerHTML=r.msg;$('#ov').hidden=false},D().failMs)}return}
    res[cur]={s:P.s.map(q=>q.slice()),v:r.v,msg:r.msg};M.innerHTML=r.v=='ok'?'':`<b>Character ${cur+1}:</b> ${r.msg}`;
    const nx=res.findIndex(q=>!q);if(nx>=0){cur=nx;setRef()}else wd()};
  P.down=clrT;P.cb=()=>{clrT();if(P.ref&&P.s.length>=P.ref.length)later(commit,250);else if(D().idle&&P.s.length)later(commit,D().idle)};
  $('#hn').onclick=e=>{if(t.ty=='word'&&!romOn){romOn=1;$('#pr').innerHTML=base+'<br><small>'+rom(t.id)+'</small>';return}P.showRef=!P.showRef;e.currentTarget.setAttribute('aria-pressed',!!P.showRef);P.show()};
  $('#un').onclick=()=>{if(!P.lock){P.s.pop();P.show()}};$('#cl').onclick=()=>{if(!P.lock)P.clear()};$('#go').onclick=commit;
  $('#ov').onclick=()=>{P.lock=0;P.showRef=0;P.clear();$('#ov').hidden=true;M.textContent='';$('#hn').setAttribute('aria-pressed',false)};
  if(n>1){$('#sl').onclick=()=>$('#wl').scrollBy({left:-140,behavior:'smooth'});$('#sr').onclick=()=>$('#wl').scrollBy({left:140,behavior:'smooth'});
    $('#wl').onclick=e=>{const b=e.target.closest('.wb');if(!b||fin)return;const i=+b.dataset.i,q=res[i];
      if(q){M.innerHTML=`<b>Character ${i+1}:</b> ${q.msg}<br><button class=chip id=rd>Redraw it</button>`;$('#rd').onclick=()=>{res[i]=null;cur=i;M.textContent='';setRef()}}else{cur=i;setRef()}}}
  setRef();if(t.m=='dict')say(t.id)}
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
Promise.all([fetch('strokes.json').then(r=>r.json()).then(j=>ST=j).catch(()=>{}),fetch('kanji.json').then(r=>r.json()).then(j=>{KJ=j;j.forEach(x=>{KR[x.k]=x.r;MEAN[x.k]=x.m})}).catch(()=>{})]).finally(()=>{Object.entries(S.j).forEach(([k,v])=>{if(!KR[k]&&v.r){KR[k]=v.r;MEAN[k]=v.m}});home()});
