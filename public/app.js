const $=s=>document.querySelector(s),A=$('#app'),h=s=>A.innerHTML=s;
const GR=[['あいうえお','a i u e o'],['かきくけこ','ka ki ku ke ko'],['さしすせそ','sa shi su se so'],['たちつてと','ta chi tsu te to'],['なにぬねの','na ni nu ne no'],['はひふへほ','ha hi fu he ho'],['まみむめも','ma mi mu me mo'],['やゆよ','ya yu yo'],['らりるれろ','ra ri ru re ro'],['わをん','wa wo n'],['っゃゅょ','small_tsu small_ya small_yu small_yo'],['がぎぐげご','ga gi gu ge go'],['ざじずぜぞ','za ji zu ze zo'],['だぢづでど','da ji zu de do'],['ばびぶべぼ','ba bi bu be bo'],['ぱぴぷぺぽ','pa pi pu pe po']];
GR.slice().forEach(([k,r])=>GR.push([[...k].map(c=>String.fromCharCode(c.charCodeAt(0)+96)).join(''),r]));GR.push(['ー','long_mark']);
const RO={},ALL=[];GR.forEach(([k,r])=>[...k].forEach((c,i)=>{RO[c]=r.split(' ')[i].replace('_',' ');ALL.push(c)}));
const W=`あい|love;いえ|house;うえ|above;あお|blue;いい|good;あう|to meet;あか|red;かお|face;いけ|pond;こえ|voice;きく|to listen;あき|autumn;さけ|sake;すし|sushi;せかい|world;そら|sky;たこ|octopus;つき|moon;ねこ|cat;いぬ|dog;さかな|fish;おかね|money;はな|flower;ひと|person;ふね|ship;へや|room;ほし|star;みず|water;むし|insect;めがね|glasses;もも|peach;やま|mountain;ゆき|snow;よる|night;くるま|car;さくら|cherry blossom;りんご|apple;わたし|I, me;ほん|book;たまご|egg;ことば|word;かばん|bag;でんわ|phone;ぱん|bread;ごはん|rice, meal;えき|station;あさ|morning;なつ|summer;ふゆ|winter;はる|spring;あめ|rain;うみ|sea;かわ|river;て|hand;め|eye;みみ|ear;くち|mouth;ゆめ|dream;あいます|to meet;いきます|to go;ともだち|friend;まいにち|every day;たのしい|fun;よみます|to read;たかい|tall, high;ながい|long;きれい|pretty;あつい|hot;すずしい|cool;さむい|cold;あに|older brother;あね|older sister;あかい|red (adj);あおい|blue (adj);これ|this;しろい|white;すき|to like;のみます|to drink;たべます|to eat;がっこう|school;きょう|today;せんせい|teacher;おちゃ|tea;しゃしん|photo;みます|to look;ありがとう|thank you;おはよう|good morning;こんにちは|hello;おかあさん|mother;おとうさん|father;りょこう|trip;びょういん|hospital;ぎゅうにゅう|milk;ひゃく|hundred;ざっし|magazine;きって|stamp;コーヒー|coffee;パン|bread;ミルク|milk;ケーキ|cake;ホテル|hotel;テレビ|TV;ビール|beer;ラーメン|ramen;カメラ|camera;ピアノ|piano;タクシー|taxi;レストラン|restaurant;アイス|ice cream;ペン|pen;ノート|notebook;メール|email;ゲーム|game;サッカー|soccer;バス|bus`.split(';').map(x=>x.split('|'));
const MEAN=Object.fromEntries(W);
const STORY=[
{id:'s1',t:'Colors',n:['あかい','あおい'],l:[['#','A small red house stands beside a blue pond.'],['あかい いえ。','A red house.'],['あおい いけ。','A blue pond.'],['あかい いえ。 いい いえ。','A red house. A nice house.'],['あおい いけ。 いい いけ。','A blue pond. A nice pond.'],['あかい。 あおい。 あかい。 あおい。','Red. Blue. Red. Blue.']]},
{id:'s2',t:'The cat',n:['これ','しろい','すき'],note:'は is read “wa”. です is a polite “is/am”.',l:[['#','A white cat sits next to a fish on a plate.'],['これは ねこです。','This is a cat.'],['ねこは {白|しろ}いです。','The cat is white.'],['これは {魚|さかな}です。','This is a fish.'],['{魚|さかな}も {白|しろ}いです。','The fish is white too.'],['ねこは {魚|さかな}が すきです。','The cat likes fish.'],['わたしは ねこが すきです。','I like cats.'],['わたしは {魚|さかな}も すきです。','I like fish too.'],['これは わたしの ねこです。','This is my cat.'],['わたしは {白|しろ}い ねこが すきです。','I like white cats.']]},
{id:'s3',t:'Morning',n:['のみます','たべます','すき'],note:'を is read “o”.',l:[['#','Morning light. A person sits at a table with water and rice.'],['{朝|あさ}です。','It is morning.'],['わたしは {水|みず}を のみます。','I drink water.'],['わたしは ごはんを たべます。','I eat rice.'],['ねこも {水|みず}を のみます。','The cat drinks water too.'],['ねこは {魚|さかな}を たべます。','The cat eats fish.'],['{人|ひと}は ごはんを たべます。','People eat rice.'],['{人|ひと}は {水|みず}を のみます。','People drink water.'],['わたしは ごはんが すきです。','I like rice.'],['わたしは {水|みず}も すきです。','I like water too.']]},
{id:'s4',t:'School',n:['きょう','せんせい','おちゃ','しゃしん','みます'],note:'Small っ doubles the next sound; small ゃ joins the kana before it (しゃ = sha).',l:[['#','In the classroom, the teacher holds a cup of tea and a photo.'],['{今日|きょう}は {学校|がっこう}です。','Today is school.'],['{先生|せんせい}も {学校|がっこう}です。','The teacher is at school too.'],['{先生|せんせい}は おちゃを のみます。','The teacher drinks tea.'],['わたしも おちゃを のみます。','I drink tea too.'],['{先生|せんせい}は しゃしんを みます。','The teacher looks at a photo.'],['わたしも しゃしんを みます。','I look at the photo too.'],['{今日|きょう}は しゃしんです。','Today is photo day.'],['{今日|きょう}は おちゃが すきです。','Today I like tea.'],['ありがとう。','Thank you.']]},
{id:'s5',t:'Café',n:['コーヒー','ミルク','パン','ケーキ'],note:'Loanwords are written in katakana. ー lengthens the vowel.',l:[['#','A small café table with coffee, milk, bread and cake.'],['{人|ひと}は コーヒーを のみます。','People drink coffee.'],['わたしも コーヒーを のみます。','I drink coffee too.'],['ねこは ミルクを のみます。','The cat drinks milk.'],['{人|ひと}は パンを たべます。','People eat bread.'],['わたしは ケーキを たべます。','I eat cake.'],['ケーキは すきです。','I like cake.'],['コーヒーも すきです。','I like coffee too.'],['ミルクも パンも すきです。','I like milk and bread too.'],['これは ケーキです。','This is cake.']]},
{id:'s6',t:'Going to school',n:['いきます','ともだち','まいにち','たのしい','よみます','あいます'],note:'へ is read “e” and を “o”. と means “and”. も means “also”.',l:[['#','Every day a student walks to school. A friend and the teacher are waiting at the gate.'],['{毎日|まいにち}、 わたしは {学校|がっこう}へ いきます。','Every day I go to school.'],['{学校|がっこう}で {友達|ともだち}に あいます。','At school I meet my friend.'],['{友達|ともだち}も {毎日|まいにち} {学校|がっこう}へ いきます。','My friend goes to school every day too.'],['{友達|ともだち}は {本|ほん}を よみます。','My friend reads books.'],['わたしも {本|ほん}を よみます。','I read books too.'],['{先生|せんせい}も {学校|がっこう}へ いきます。','The teacher goes to school too.'],['{先生|せんせい}も {本|ほん}を よみます。','The teacher reads books too.'],['{毎日|まいにち}、 {学校|がっこう}で {本|ほん}を よみます。','Every day we read books at school.'],['{友達|ともだち}と わたしは たのしいです。','My friend and I are having fun.'],['{先生|せんせい}も たのしいです。','The teacher is having fun too.'],['{毎日|まいにち} たのしいです。','Every day is fun.'],['わたしは {学校|がっこう}が すきです。','I like school.']]},
{id:'s7',t:'Nature',n:['たかい','ながい','きれい'],l:[['#','A tall mountain, a long river below it, and flowers under a blue sky.'],['{山|やま}は たかいです。','The mountain is tall.'],['{川|かわ}は ながいです。','The river is long.'],['{空|そら}は {青|あお}いです。','The sky is blue.'],['{空|そら}は きれいです。','The sky is pretty.'],['{川|かわ}も きれいです。','The river is pretty too.'],['{花|はな}も きれいです。','The flowers are pretty too.'],['たかい {山|やま}、 ながい {川|かわ}、 きれい {花|はな}。','A tall mountain, a long river, pretty flowers.'],['{山|やま}は たかい、 {川|かわ}は ながい。','The mountain is high, the river is long.'],['{空|そら}も たかいです。','The sky is high too.'],['ながい {川|かわ}です。','It is a long river.'],['{今日|きょう}は {雨|あめ}です。','Today is rainy.']]},
{id:'s8',t:'Seasons',n:['あつい','すずしい','さむい'],l:[['#','Four small scenes: spring blossoms, summer sun, red autumn leaves, winter snow.'],['{春|はる}は {花|はな}が きれいです。','In spring the flowers are pretty.'],['{夏|なつ}は あついです。','Summer is hot.'],['{夏|なつ}は {海|うみ}が すきです。','In summer I like the sea.'],['{秋|あき}は すずしいです。','Autumn is cool.'],['{秋|あき}は {山|やま}が すきです。','In autumn I like the mountains.'],['{冬|ふゆ}は さむいです。','Winter is cold.'],['{冬|ふゆ}は {雪|ゆき}が すきです。','In winter I like snow.'],['{夏|なつ}は あつい、 {冬|ふゆ}は さむい。','Summer is hot, winter is cold.'],['{秋|あき}も {春|はる}も すずしいです。','Autumn and spring are cool.'],['{冬|ふゆ}も さむいです。','Winter is cold too.'],['あつい {夏|なつ}です。','It is a hot summer.'],['あつい、 すずしい、 さむい。','Hot, cool, cold.']]},
{id:'s9',t:'Family',n:['あに','あね'],l:[['#','A family at home: father, mother, older brother and older sister.'],['{お父|おとう}さんは {先生|せんせい}です。','My father is a teacher.'],['{お母|おかあ}さんは コーヒーが すきです。','My mother likes coffee.'],['{兄|あに}は サッカーが すきです。','My older brother likes soccer.'],['{姉|あね}は {本|ほん}が すきです。','My older sister likes books.'],['{兄|あに}も コーヒーを のみます。','My older brother drinks coffee too.'],['{姉|あね}も コーヒーを のみます。','My older sister drinks coffee too.'],['{兄|あに}は {姉|あね}が すきです。','My older brother likes my older sister.'],['{兄|あに}と {姉|あね}は {家|いえ}です。','My older brother and sister are at home.'],['わたしは {家|いえ}が すきです。','I like home.']]}];
const unl=(s,f)=>s.l.map(x=>x[0]).join('').split('').filter(c=>RO[c]).every(f);
let S;try{S=JSON.parse(localStorage.wk)}catch(e){}S=S||{k:{},w:{},ov:[],tol:.16,ord:1,set:0};S.st=S.st||{};S.a=S.a||{};S.j=S.j||{};
const save=()=>{try{localStorage.wk=JSON.stringify(S)}catch(e){}},day=()=>Math.floor(Date.now()/864e5),IV=[0,1,2,4,8,16,32];
let ST={},Q=[],qi=0,P,PS={},sel=new Set,KJ=[],KR={};
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
function check(user,ref,tol,ord){
  if(!ref)return{ok:true,det:[],msg:'No stroke data loaded, so this one is not checked.'};
  if(!user.length)return{ok:false,det:[],msg:'Draw the character first.'};
  if(user.length!==ref.length)return{ok:false,det:[],msg:`Expected ${ref.length} strokes, you drew ${user.length}.`};
  const U=nz(user).map(s=>rs(s)),R=nz(ref).map(s=>rs(s)),used=new Set(),det=[];
  U.forEach((u,i)=>{let j=i;if(!ord){j=-1;let bd=9;R.forEach((r,k)=>{if(used.has(k))return;const d=Math.min(dist(u,r),dist(u,[...r].reverse()));if(d<bd){bd=d;j=k}})}
    used.add(j);det.push(dist(u,R[j])<=tol?'ok':dist(u,[...R[j]].reverse())<=tol?'dir':'shape')});
  const ok=det.every(d=>d=='ok');
  return{ok,det,msg:ok?'Nice!':det.map((d,i)=>d=='ok'?'':`Stroke ${i+1}: ${d=='dir'?'wrong direction':'shape is off'}. `).join('')+(ord?'(Stroke order is on.)':'')}}
function pad(cv){const x=cv.getContext('2d'),o={s:[]};let c=null;
  const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*320/r.width,(e.clientY-r.top)*320/r.height]};
  o.show=det=>{x.clearRect(0,0,320,320);x.setLineDash([]);x.lineWidth=1;x.strokeStyle='#8885';x.beginPath();x.moveTo(160,0);x.lineTo(160,320);x.moveTo(0,160);x.lineTo(320,160);x.stroke();
    x.lineWidth=8;x.lineCap=x.lineJoin='round';o.s.forEach((s,i)=>{x.strokeStyle=det&&det.length?(det[i]=='ok'?'#2a9d4a':'#d33'):'#3b6fd4';x.beginPath();s.forEach((p,j)=>j?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()})};
  o.clear=()=>{o.s.length=0;o.show()};
  cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);c=[pt(e)];o.s.push(c);o.show()};
  cv.onpointermove=e=>{if(c){c.push(pt(e));o.show()}};
  cv.onpointerup=e=>{if(c){c.push(pt(e));c=null;o.show()}};
  o.show();return o}
function anim(cv,ref){const x=cv.getContext('2d'),k=cv.width/109;ref.forEach((s,i)=>setTimeout(()=>{x.strokeStyle='#4a90e2';x.lineWidth=5;x.lineCap='round';x.setLineDash([8,6]);x.beginPath();s.forEach(([a,b],j)=>j?x.lineTo(a*k,b*k):x.moveTo(a*k,b*k));x.stroke();x.setLineDash([])},i*500))}
// ---- screens
function home(){if(!S.set)return place();const t=day(),due=[...Object.values(S.k),...Object.values(S.w),...Object.values(S.j)].filter(v=>v.d<=t).length,lv=c=>!S.k[c]?0:S.k[c].b<2?1:S.k[c].b<4?2:3,cell=c=>`<span class="c l${lv(c)}">${c}</span>`,us=STORY.filter(s=>unl(s,c=>S.k[c])),nj=Object.keys(S.j).length;
  h(`<div class=hd><b>Kana Path</b><span>${Object.keys(S.k).length}/${ALL.length} kana · ${Object.keys(S.w).length} words · ${nj} kanji</span></div>
  <section class=card><h2>Today</h2><p class=s>${due} due for review, plus a few new items. About 10 minutes.</p><button class=big onclick=today()>Start today’s session</button></section>
  <div class=row><button onclick=practice()><b>Practice</b><small>Choose what to drill, or play Star storm</small></button><button onclick="document.getElementById('st').scrollIntoView({behavior:'smooth'})"><b>Stories</b><small>${us.length} of ${STORY.length} unlocked</small></button></div>
  <section class=card><h3>Hiragana</h3><div class=g>${ALL.filter(c=>c<'ァ').map(cell).join('')}</div><h3>Katakana</h3><div class=g>${ALL.filter(c=>c>='ァ').map(cell).join('')}</div><p class=s>Faint: not learned yet · pale to solid: how well you know it</p></section>
  ${nj?`<section class=card><h3>Kanji</h3><p class=jp>${Object.keys(S.j).join(' ')}</p></section>`:''}
  <section class=card id=st><h3>Stories</h3>${us.map(s=>`<button class=li onclick="story('${s.id}',1)">${S.st[s.id]?'✓ ':''}${s.t}</button>`).join('')}<p class=s>${STORY.length-us.length} more unlock as you learn kana.</p></section>
  <details class=card><summary>Settings and progress</summary><label>Leniency of handwriting check <input type=range min=8 max=30 value=${S.tol*100} onchange="S.tol=this.value/100;save()"></label><label><input type=checkbox ${S.ord?'checked':''} onchange="S.ord=+this.checked;save()"> Stroke order must match</label><label><input type=checkbox ${S.kt?'checked':''} onchange="S.kt=+this.checked;save()"> Learn katakana alongside hiragana</label><button onclick=exp()>Export progress</button><label>Import progress <input type=file accept=.json onchange=imp(this)></label><button onclick=place()>Edit known kana</button></details>
  <p><small>Stroke data: KanjiVG © Ulrich Apel, CC BY-SA 3.0. Word data: JMdict and KANJIDIC2 © EDRDG. Progress is stored in this browser only, so export it now and then.</small></p>`)}
function place(){h(`<h2>Which kana do you already know?</h2><p class=s>Tap the ones you can read. Skip this if you know none.</p>${GR.map(([k])=>`<div>${[...k].map(c=>`<button class="k ${S.k[c]?'on':''}" onclick="tg('${c}',this)">${c}</button>`).join('')}</div>`).join('')}<button class=big onclick="S.set=1;save();home()">Done</button>`)}
const tg=(c,e)=>{if(S.k[c])delete S.k[c];else S.k[c]={b:2,d:day()+2};e.classList.toggle('on');save()};
const exp=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)]));a.download='kana-path-progress.json';a.click()};
const imp=i=>i.files[0].text().then(t=>{S=JSON.parse(t);save();home()});
function today(){PS.on=0;const t=day(),q=[];
  [...Object.entries(S.k).map(([id,v])=>['kana',id,v]),...Object.entries(S.w).map(([id,v])=>['word',id,v]),...Object.entries(S.j).map(([id,v])=>['kanji',id,v])].filter(x=>x[2].d<=t).sort((a,b)=>a[2].d-b[2].d).slice(0,12)
    .forEach(([ty,id,v])=>q.push({ty,id,m:ty=='kanji'?(v.b<2?'type':'write'):v.b<2?'rec':ty=='kana'||v.b%2==0?'write':'dict'}));
  const hu=ALL.filter(c=>c<'ァ'&&!S.k[c]),ku=ALL.filter(c=>c>='ァ'&&!S.k[c]),nk=[...hu.slice(0,S.kt?3:5),...ku.slice(0,S.kt?2:5-Math.min(5,hu.length))],kn=new Set([...Object.keys(S.k),...nk]);
  const nw=W.map(w=>w[0]).filter(w=>!S.w[w]&&[...w].every(c=>kn.has(c))).slice(0,5);
  const kw=new Set([...Object.keys(S.w),...nw]),KC=kc(),nj=[];
  for(const x of KJ){if(nj.length>=3)break;if(S.j[x.k])continue;if(x.w?kw.has(x.w):[...x.r].every(c=>kn.has(c))&&(x.d||[]).every(c=>KC.has(c))){nj.push(x.k);[...x.k].forEach(c=>KC.add(c))}}
  [...nk.map(id=>['kana',id]),...nw.map(id=>['word',id]),...nj.map(id=>['kanji',id])].forEach(([ty,id])=>['meet',ty=='kanji'?'type':'rec','write'].forEach(m=>q.push({ty,id,m,nw:1})));
  const sty=STORY.find(s=>!S.st[s.id]&&unl(s,c=>kn.has(c)));
  if(sty){const nn=sty.n.filter(w=>!S.w[w]&&!nw.includes(w));nn.forEach(id=>['meet','rec'].forEach(m=>q.push({ty:'word',id,m,nw:1})));q.push({ty:'story',id:sty.id});nn.forEach(id=>q.push({ty:'word',id,m:'write',nw:1}));sty.n.forEach(w=>{const i=sty.l.findIndex(l=>pl(l[0]).includes(w));if(i>=0)q.push({ty:'cloze',sid:sty.id,li:i,id:w,nw:1})})}
  Q=q;qi=0;next()}
const GL={'は':'topic marker (read “wa”)','が':'subject marker','を':'object marker (read “o”)','に':'at, to','で':'at, by means of','へ':'toward (read “e”)','も':'also, too','の':'of, ’s','と':'and, with','です':'is, am (polite)','さん':'Mr, Ms (polite)'};let LXc;
function tk(t){LXc=LXc||(()=>{const m={...GL,'、':'','。':''};W.forEach(([w,g])=>m[w]=g);Object.keys(KR).forEach(k=>{if(!m[KR[k]])m[KR[k]]=MEAN[k]});return m})();
  const K=kc(),pc=[],fr=[];
  t.replace(/ /g,'').split(/(\{[^}]*\})/).forEach(p=>{const m=p.match(/^\{([^|}]*)\|([^}]*)\}$/);
    if(m){const ch=[...m[1]].filter(c=>c>='\u4e00'),ok=ch.length&&ch.every(c=>K.has(c));[...m[2]].forEach((c,i)=>{pc.push(c);fr.push(ok?(i?'':`<ruby>${m[1]}<rt>${ch.some(c=>bx(c)<4)?m[2]:''}</rt></ruby>`):c)})}
    else[...p].forEach(c=>{pc.push(c);fr.push(c)})});
  const n=pc.length,b=Array(n+1).fill(1e9),pv=Array(n+1).fill(-1);b[0]=0;
  for(let i=0;i<n;i++)if(b[i]<1e9)for(let L=1;L<=9&&i+L<=n;L++)if(pc.slice(i,i+L).join('') in LXc&&b[i]+1<b[i+L]){b[i+L]=b[i]+1;pv[i+L]=i}
  if(b[n]>=1e9)return rd(t);
  const o=[];for(let j=n;j>0;j=pv[j])o.unshift([pv[j],j]);
  return o.map(([i,j])=>{const w=pc.slice(i,j).join(''),g=LXc[w];return g?`<span class=w data-w="${w}" data-g="${g.replace(/"/g,'&quot;')}">${fr.slice(i,j).join('')}</span>`:fr.slice(i,j).join('')}).join('')}
function cloze(t){const s=STORY.find(x=>x.id==t.sid),l=s.l[t.li],ans=rom(t.id);let v='',d=0;
  h(`<p class=s>From the story “${s.t}”: type the missing word</p><div class=jp>${pl(l[0]).replace(t.id,'＿＿＿')}</div><p class=s>${l[1]}</p><div class=ty id=ty>…</div><div id=m></div><div class=kb>${KB}<button id=ent class=big>Check</button></div>`);
  bindKB(k=>{if(d)return;v=k=='⌫'?v.slice(0,-1):v+k;$('#ty').textContent=v||'…'});
  $('#ent').onclick=()=>{if(d)return;d=1;const ok=nr(v)==nr(ans);$('#ty').style.color=ok?'#2a9d4a':'#d33';$('#m').innerHTML=(ok?'Nice! ':`It is <b>${ans}</b>. `)+rd(l[0]);setTimeout(next,ok?1500:2600)}}
function story(id,again){const s=STORY.find(x=>x.id==id);
  h(`<h2>${s.t}</h2>${s.n.length?`<p class=s>New words: ${s.n.map(w=>w+' ('+MEAN[w]+')').join(', ')}</p>`:''}${s.l.map(l=>l[0]=='#'?`<div class=scene role=img aria-label="Image placeholder"><span>Image: ${l[1]}</span></div>`:`<div class=jp>${tk(l[0])} <button onclick="say('${pl(l[0])}')">🔊</button></div><div class=en onclick="this.classList.toggle('show')"><i>Tap for English</i><span>${l[1]}</span></div>`).join('')}<p class=s>Tap any word for its meaning, or tap a line for the English.</p>${s.note?`<p class=s>${s.note}</p>`:''}<button class=big onclick="S.st['${id}']=1;save();${again?'home()':'next()'}">${again?'Back':'Done'}</button><div id=tip class=tip hidden></div>`);
  A.onclick=e=>{const w=e.target.closest('.w');if(!w)return;document.querySelectorAll('.w.on').forEach(x=>x.classList.remove('on'));w.classList.add('on');const d=$('#tip');d.hidden=false;d.innerHTML=`<b>${w.dataset.w}</b> · ${rom(w.dataset.w)}<span>${w.dataset.g}</span><button onclick="say('${w.dataset.w}')">🔊 Listen</button>`}}

const sta=(id,ok)=>{(S.a[id]=S.a[id]||[0,0])[ok?0:1]++};
const nr=s=>s.toLowerCase().replace(/sy([auo])/g,'sh$1').replace(/ty([auo])/g,'ch$1').replace(/(?:zy|jy)([auo])/g,'j$1').replace(/si/g,'shi').replace(/ti/g,'chi').replace(/tu/g,'tsu').replace(/(?<![sc])hu/g,'fu').replace(/zi/g,'ji').replace(/ou|oo/g,'o').replace(/uu/g,'u').replace(/ei|ee/g,'e').replace(/aa/g,'a').replace(/ii/g,'i').replace(/nn/g,'n');
const KB=['qwertyuiop','asdfghjkl','zxcvbnm⌫'].map(r=>`<div>${[...r].map(k=>`<button class=kk data-k="${k}">${k}</button>`).join('')}</div>`).join('');
const bindKB=cb=>document.querySelectorAll('.kk').forEach(b=>b.onpointerdown=e=>{e.preventDefault();cb(b.dataset.k)});
function practice(){h(`<h2>Practice</h2><label>What to practice <select id=pre><option value=all>All known</option><option value=hira>Hiragana</option><option value=kata>Katakana</option><option value=words>Words only</option><option value=kanji>Kanji only</option><option value=due>Due today</option><option value=weak>Weak spots</option><option value=look>Look-alikes</option><option value=small>Dakuten and small kana</option></select></label>
  <details><summary>Or pick specific items (${sel.size} chosen)</summary><div>${[...Object.keys(S.k),...Object.keys(S.w),...Object.keys(S.j)].map(c=>`<button class="k ${sel.has(c)?'on':''}" onclick="sel.has('${c}')?sel.delete('${c}'):sel.add('${c}');this.classList.toggle('on')">${c}</button>`).join('')}</div><button onclick="sel.clear();practice()">Clear choice</button></details>
  <label>Questions <select id=cnt><option>10</option><option>20</option><option>50</option><option value=0>All</option></select></label>
  <label><input type=checkbox id=m1 checked> Draw it</label><label><input type=checkbox id=m2 checked> Type romaji</label><label><input type=checkbox id=m3 checked> Listen and write</label><label><input type=checkbox id=m4> Tap the answer</label><label><input type=checkbox id=re checked> Repeat errors until correct</label>
  <button class=big onclick=pstart()>Start</button><button onclick=pstart(1)>Star storm (typing game)</button><button onclick=home()>Back</button>`)}
function pstart(g){const K=Object.keys(S.k).map(id=>['kana',id]),Wd=Object.keys(S.w).map(id=>['word',id]),J=Object.keys(S.j).map(id=>['kanji',id]),all=[...K,...Wd,...J],sd=x=>bag(x[0])[x[1]],pre=$('#pre').value;
  const F={all:()=>all,hira:()=>K.filter(x=>x[1]<'ァ'),kata:()=>K.filter(x=>x[1]>='ァ'),words:()=>Wd,kanji:()=>J,due:()=>all.filter(x=>sd(x).d<=day()),weak:()=>all.filter(x=>{const a=S.a[x[1]];return a&&a[1]/(a[0]+a[1])>=.3}),look:()=>K.filter(x=>'シツソンノぬめわれねるろ'.includes(x[1])),small:()=>K.filter(x=>x[1].normalize('NFD').length>1||'ゃゅょっャュョッ'.includes(x[1]))};
  const p=sel.size?all.filter(x=>sel.has(x[1])):F[pre]();if(!p.length)return alert('Nothing to practice in that selection yet.');
  const on=['write','type','dict','rec'].filter((m,i)=>$('#m'+(i+1)).checked),n=+$('#cnt').value||p.length;if(!on.length)on.push('write');
  PS={on:1,re:$('#re').checked,ok:0,tot:0,miss:{},fix:new Set};
  if(g){PS.on=0;return game(p.filter(x=>x[0]!='kana'||!RO[x[1]].includes(' ')))}
  let l=[];while(l.length<n)l.push(...shuf(p.slice()));
  Q=l.slice(0,n).map(([ty,id])=>{let a=on.filter(m=>m!='dict'||ty=='word');if(!a.length)a=['write'];let m=a[Math.random()*a.length|0];if(m=='type'&&ty=='kana'&&RO[id].includes(' '))m='write';if(ty=='kanji'&&m=='rec')m='type';return{ty,id,m,pr:1}});qi=0;next()}
function pdone(t,ok){sta(t.id,ok);PS.tot++;if(ok){PS.ok++;PS.fix.delete(t.id)}else{const c=PS.miss[t.id]=(PS.miss[t.id]||0)+1;PS.fix.add(t.id);if(PS.re&&c<3)Q.splice(Math.min(qi+3,Q.length),0,{...t});else PS.fix.delete(t.id)}save()}
function psum(){const m=Object.keys(PS.miss);PS.on=0;h(`<h2>Done</h2><h1>${PS.ok}/${PS.tot}</h1><p class=s>${PS.tot?Math.round(PS.ok*100/PS.tot):0}% correct</p>${m.length?`<p>Missed: ${m.join(' ')}</p><button class=big onclick="sel=new Set(${JSON.stringify(m)});practice()">Practice my mistakes</button>`:''}<button onclick=practice()>Practice again</button><button onclick=home()>Home</button>`)}
function typeT(t){let v='',d=0;const ans=t.ty=='kana'?RO[t.id]:rom(KR[t.id]||t.id);
  h(`<h1>${t.id}</h1><button onclick="say('${t.id}')">🔊</button><div class=ty id=ty>…</div><div id=m></div><div class=kb>${KB}<button id=ent class=big>Check</button></div>`);
  bindKB(k=>{if(d)return;v=k=='⌫'?v.slice(0,-1):v+k;$('#ty').textContent=v||'…'});
  $('#ent').onclick=()=>{if(d)return;d=1;const ok=nr(v)==nr(ans)||(t.id=='を'||t.id=='ヲ')&&nr(v)=='o';$('#m').innerHTML=ok?'Nice!':`It is <b>${ans}</b>`;$('#ty').style.color=ok?'#2a9d4a':'#d33';if(t.pr)pdone(t,ok);else if(!t.nw)grade(t,ok);setTimeout(next,ok?600:1600)}}
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

function next(){const t=Q[qi++];if(!t)return PS.on?psum():h(`<h2>Done for today</h2><p class=s>Come back tomorrow for reviews and new words.</p><button class=big onclick=home()>Home</button>`);t.ty=='cloze'?cloze(t):t.ty=='story'?story(t.id):t.m=='meet'?meet(t):t.m=='rec'?rec(t):t.m=='type'?typeT(t):writeT(t);A.insertAdjacentHTML('afterbegin',`<div class=top><button class=x aria-label=Exit onclick="if(confirm('Leave this session? Progress so far is kept.'))home()">✕</button><div class=bar><i style="width:${Math.min(100,(qi-1)/Q.length*100)}%"></i></div>${PS.on&&PS.re?`<span class=s>${PS.fix.size} to fix</span>`:''}</div>`)}
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
function writeT(t){const ch=t.ty=='kana'?[t.id]:[...t.id];let i=0,bad=0;
  const pr=t.m=='dict'?'Listen, then write the word':t.ty=='kana'?RO[t.id]:t.ty=='kanji'?MEAN[t.id]+' ('+KR[t.id]+')':MEAN[t.id];
  const step=()=>{h(`<p class=s>${i+1} of ${ch.length}</p><h2>${pr}</h2><button onclick="say('${t.id}')">🔊 Listen</button><canvas id=c width=320 height=320></canvas><div id=m></div><div><button onclick="P.clear()">Clear</button><button id=ck>Check</button></div>`);
    P=pad($('#c'));$('#ck').onclick=chk;if(t.m=='dict'&&!i)say(t.id)};
  const btn=(l,f)=>{const b=document.createElement('button');b.textContent=l;b.onclick=f;$('#m').append(b)};
  const adv=()=>{i++;if(i<ch.length)step();else{if(t.nw){const v=bag(t.ty)[t.id];v.b=bad?0:1}if(t.pr)pdone(t,!bad);else grade(t,!bad);next()}};
  function chk(){const ref=ST[ch[i]],r=check(P.s,ref,S.tol,S.ord);P.show(r.det);$('#m').textContent=r.msg;
    if(r.ok)btn('Next',adv);else{bad++;if(ref)anim($('#c'),ref);btn('Retry',()=>{P.clear();$('#m').textContent=''});btn('I was right',()=>{S.ov.push([ch[i],S.tol]);save();bad--;adv()})}}
  step()}
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
Promise.all([fetch('strokes.json').then(r=>r.json()).then(j=>ST=j).catch(()=>{}),fetch('kanji.json').then(r=>r.json()).then(j=>{KJ=j;j.forEach(x=>{KR[x.k]=x.r;MEAN[x.k]=x.m})}).catch(()=>{})]).finally(()=>{Object.entries(S.j).forEach(([k,v])=>{if(!KR[k]&&v.r){KR[k]=v.r;MEAN[k]=v.m}});home()});
