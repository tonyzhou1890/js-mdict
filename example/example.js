import Mdict from '../src/mdict';

// Note: *.mdd file only support lookup method.

// loading dictionary
const dict = new Mdict('mdx/testdict/oale8.mdx', { mode: 'mixed' });
// console.log(mdict.lookup('interactive'));
// console.log(mdict.bsearch('interactive'));
// console.log(mdict.fuzzy_search('interactive', 5));
// console.log(mdict.prefix('interactive'));

console.log(dict.lookup('hello'));
/*
  { keyText: "hello",
    definition: "你好",
  }
  */

console.log(dict.prefix('hello'));

/*
[
  { key: 'he', rofset: 64744840 },
  { key: 'hell', rofset: 65513175 },
  { key: 'hello', rofset: 65552694 }
]
  */

let word = 'informations';
dict.suggest(word).then((sw) => {
  // eslint-disable-next-line
  console.log(sw);
  /*
    [ 'information', "information's" ]
    */
});

word = 'hitch';
const fws = dict.fuzzy_search(word, 20, 5);
console.log(fws);
/*
[
  { key: 'history', rofset: 66627131, ed: 4 },
  { key: 'hit', rofset: 66648124, ed: 2 },
  { key: 'hit back', rofset: 66697464, ed: 4 },
  { key: 'hit back', rofset: 66697464, ed: 4 },
  { key: 'hit big', rofset: 66698789, ed: 4 },
  { key: 'hitch', rofset: 66698812, ed: 0 },
  { key: 'hitched', rofset: 66706586, ed: 2 },
  { key: 'hitcher', rofset: 66706602, ed: 2 },
  { key: 'hitches', rofset: 66706623, ed: 2 },
  { key: 'hitchhike', rofset: 66706639, ed: 4 },
  { key: 'hitchhiker', rofset: 66710697, ed: 5 },
  { key: 'hitching', rofset: 66712273, ed: 3 },
  { key: 'hi-tech', rofset: 66712289, ed: 2 },
  { key: 'hit for', rofset: 66713795, ed: 4 }
]

  */
console.log(dict.parse_defination(fws[0].key, fws[0].rofset));
/*

{
  keyText: 'history',
  definition: `<link rel="stylesheet" type="text/css" href="oalecd8e.css"><script src="jquery.js" charset="utf-8" type="text/javascript" language="javascript"></script><script src="oalecd8e.js" charset="utf-8" type="text/javascript" language="javascript"></script><span id="history_e" name="history" idm_id="000017272" class="entry"><span class="h-g"><span class="top-g"><span class="h">his·tory</span><span class="oalecd8e_show_all"><em></em></span> <span class="z"> <span class="symbols-coresym">★</span> </span><span class="ei-g"><span class="z_ei-g">/</span><a class="fayin" href="sound://uk/history__gb_1.mp3"><span class="phon-gb">ˈhɪstri</span><img src="uk_pron.png" class="fayin"/></a><span class="z">; <span class="z_phon-us">NAmE</span></span><a class="fayin" href="sound://us/history__us_1.mp3"><span class="phon-usgb">ˈhɪstri</span><img src="us_pron.png" class="fayin"/></a><span class="z_ei-g">/</span></span><span class="block-g"><span class="pos-g"> <span class="pos">noun</span> </span></span><span class="ifs-g"><span class="z_br"> (</span><span class="if-g"><span class="il">pl.</span> <span id="history_if_1" class="if">his·tories</span></span><span class="z_br">) </span></span></span><span id="history_ng_1" class="n-g"><span class="z_n">1. </span><span class="symbols-small_coresym">★</span> <span class="gr"><span class="z_gr_br"> [</span>U<span class="z_gr_br">] </span></span> <span class="def-g"><span class="d oalecd8e_switch_lang switch_children">all the events that happened in the past <span class="oalecd8e_chn">历史（指过去发生的所有事情）</span></span></span><span id="history_xg_1" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">a turning point in human history </span><span class="oalecd8e_chn">人类历史的一个转折点</span></span><span id="history_xg_2" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">one of the worst disasters in <span class="cl">recent history</span> </span><span class="oalecd8e_chn">近代史上最大的灾难之一</span></span><span id="history_xg_3" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">a people with no <span class="cl">sense of history</span> </span><span class="oalecd8e_chn">一个没有历史感的民族</span></span><span id="history_xg_4" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">Many people throughout history have dreamt of a world without war. </span><span class="oalecd8e_chn">历史上有很多人梦想过没有战争的世界。</span></span><span id="history_xg_5" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">The area was inhabited long before the dawn of <span class="cl">recorded history</span> <span class="gl"> (= before people wrote about events).</span> </span><span class="oalecd8e_chn">早在有历史记载之前很久这个地区就有人居住了。</span></span><span id="history_xg_6" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">These events changed the <span class="cl">course of history.</span> </span><span class="oalecd8e_chn">这些事件改变了历史的进程。</span></span></span><span id="history_ng_2" class="n-g"><span class="z_n">2. </span><span class="symbols-small_coresym">★</span> <span class="gr"><span class="z_gr_br"> [</span>sing.</span><span class="z">, </span><span class="gr">U<span class="z_gr_br">] </span></span> <span class="def-g"><span class="d oalecd8e_switch_lang switch_children">the past events concerned in the development of a particular place, subject, etc. <span class="oalecd8e_chn">（有关某个地方、主题等的）发展史，历史</span></span></span><span id="history_xg_7" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">the history of Ireland/democracy/popular music </span><span class="oalecd8e_chn">爱尔兰╱民主╱流行音乐的历史</span></span><span id="history_xg_8" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">The <span class="cl">local history</span> of the area is fascinating. </span><span class="oalecd8e_chn">这个地区的历史很有意思。</span></span><span id="history_xg_9" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">The school traces its history back to 1865. </span><span class="oalecd8e_chn">这个学校的历史可以追溯到 1865 年。</span></span></span><span id="history_ng_3" class="n-g"><span class="z_n">3. </span><span class="symbols-small_coresym">★</span> <span class="gr"><span class="z_gr_br"> [</span>U<span class="z_gr_br">] </span></span> <span class="def-g"><span class="d oalecd8e_switch_lang switch_children">the study of past events as a subject at school or university <span class="oalecd8e_chn">历史课；历史学</span></span></span><span id="history_xg_10" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">a <span class="cl">history teacher</span> </span><span class="oalecd8e_chn">历史科老师</span></span><span id="history_xg_11" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">a degree in History </span><span class="oalecd8e_chn">历史学学位</span></span><span id="history_xg_12" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings"><span class="cl">social/economic/political history</span> </span><span class="oalecd8e_chn">社会╱经济╱政治史</span></span><span id="history_xg_13" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings"><span class="cl">ancient/medieval/modern history</span> </span><span class="oalecd8e_chn">古代╱中世纪╱近代史</span></span><span id="history_xg_14" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">She's studying <span class="cl">art history.</span> </span><span class="oalecd8e_chn">她正在研读艺术史。</span></span><span class="xr-g"> <span class="symbols-xrsym">➔</span> see also <span id="history_xr_1" href="naturalhistory_e" class="xr"><span class="Ref"> <span class="xh"> <a href="entry://natural history">natural history</a></span> </span></span></span></span><span id="history_ng_4" class="n-g"><span class="z_n">4. </span><span class="symbols-small_coresym">★</span> <span class="gr"><span class="z_gr_br"> [</span>C<span class="z_gr_br">] </span></span> <span class="def-g"><span class="d oalecd8e_switch_lang switch_children">a written or spoken account of past events <span class="oalecd8e_chn">历史（指历史记载或历史传说）</span></span></span><span id="history_xg_15" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">She's writing a new history of Europe. </span><span class="oalecd8e_chn">她正在写一部新的欧洲史。</span></span><span id="history_xg_16" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">She went on to catalogue a long history of disasters. </span><span class="oalecd8e_chn">接下来她列举了一长串灾难。</span></span></span><span id="history_ng_5" class="n-g"><span class="z_n">5. </span><span class="symbols-small_coresym">★</span> <span class="gr"><span class="z_gr_br"> [</span>sing.<span class="z_gr_br">] </span></span><span id="history_cf_1" class="cf"> <span class="swung-dash">history</span>~ (of sth) </span><span class="def-g"><span class="d oalecd8e_switch_lang switch_children">a record of sth happening frequently in the past life of a person, family or place; the set of facts that are known about sb's past life <span class="oalecd8e_chn">（某人的）履历，经历；家族史；（某地的）沿革</span></span></span><span id="history_xg_17" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">He has a history of violent crime. </span><span class="oalecd8e_chn">他有暴力犯罪的前科。</span></span><span id="history_xg_18" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">There is a history of heart disease in my family. </span><span class="oalecd8e_chn">我家有家族心脏病史。</span></span><span id="history_xg_19" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">a patient's <span class="cl">medical history</span> </span><span class="oalecd8e_chn">病人的病历</span></span><span class="xr-g"> <span class="symbols-xrsym">➔</span> see also <span id="history_xr_2" href="casehistory_e" class="xr"><span class="Ref"> <span class="xh"> <a href="entry://case history">case history</a></span></span></span><span class="z">, </span><span id="history_xr_3" href="lifehistory_e" class="xr"><span class="Ref"> <span class="xh"> <a href="entry://life history">life history</a></span> </span></span></span></span><span class="ids-g"><span class="revout"><a href="#O8T">IDM</a></span> <span id="history_idg_1" class="id-g"><span id="history_id_1" class="id">be ˈhistory</span><span class="sense-g"> <span class="def-g"><span class="label-g"> (<span class="r">informal</span>) </span><span class="d oalecd8e_switch_lang switch_children">to be dead or no longer important <span class="oalecd8e_chn">完蛋；已过去了；不再重要；成为历史</span></span></span><span id="history_xg_20" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">Another mistake like that and you're history. </span><span class="oalecd8e_chn">要是再犯那种错误你就完了。</span></span><span id="history_xg_21" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">We won't talk about that — that's history. </span><span class="oalecd8e_chn">我们不会谈论那件事的，那都已经过去了。</span></span><span id="history_xg_22" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">That's <span class="cl">past history</span> now. </span><span class="oalecd8e_chn">那是以前的事了。</span></span></span></span><span id="history_idg_2" class="id-g"><span id="history_id_2" class="id">the ˈhistory books</span><span class="sense-g"> <span class="def-g"><span class="d oalecd8e_switch_lang switch_children">the record of great achievements in history <span class="oalecd8e_chn">历史上重大成就的记载</span></span></span><span id="history_xg_23" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">She has earned her place in the history books. </span><span class="oalecd8e_chn">她名垂青史。</span></span></span></span><span id="history_idg_3" class="id-g"><span id="history_id_3" class="id">history reˈpeats itself</span><span class="sense-g"> <span class="def-g"><span class="ud oalecd8e_switch_lang switch_children">used to say that things often happen later in the same way as before <span class="oalecd8e_chn">历史时常重演</span></span></span></span></span><span id="history_idg_4" class="id-g"><span id="history_id_4" class="id">make ˈhistory | go down in ˈhistory</span><span class="sense-g"> <span class="def-g"><span class="d oalecd8e_switch_lang switch_children">to be or do sth so important that it will be recorded in history <span class="oalecd8e_chn">载入史册；青史留名；创造历史</span></span></span><span id="history_xg_24" class="x-g"><span class="symbols-xsym"></span><span class="x oalecd8e_switch_lang switch_siblings">a discovery that made medical history </span><span class="oalecd8e_chn">载入医学史册的一项重大发现</span></span></span></span></span><span class="xr-g"> <span class="symbols-xrsym">➔</span> more at<span id="history_xr_4" href="rest_e" class="xr"><span class="Ref"> <span class="xh"> <a href="entry://rest">rest</a></span> </span><span class="z"> </span><span class="xp">n. </span></span></span><span class="infl"><span class="inflection">history</span> <span class="inflection">histories</span> </span></span><span class="pracpron"><span class="pron-g"><span class="wd">his·tory</span> <span class="ei-g"><span class="z_ei-g">/</span><a class="fayin" href="sound://uk/history__gb_1.mp3"><span class="phon-gb">ˈhɪstri</span><img src="uk_pron.png" class="fayin"/></a><span class="z">; <span class="z_phon-us">NAmE</span></span><a class="fayin" href="sound://us/history__us_1.mp3"><span class="phon-usgb">ˈhɪstri</span><img src="us_pron.png" class="fayin"/></a><span class="z_ei-g">/</span></span></span></span></span>\r\n` +
    '\u0000'
}


  */
