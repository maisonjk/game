import type { Scenario } from '../types';
import { c } from './helpers';

export const FRIENDS: Scenario[] = [
  {
    id: 'friends-1',
    world: 'friends',
    title: 'Borrowed and Broken',
    hook: 'Your friend returns your headphones. One side doesn’t work.',
    chaos: 2,
    mode: 'scene',
    place: 'Your front door',
    lines: [
      { from: 'Nia', text: 'here! thanks for letting me borrow them 🙏' },
      { from: '', text: 'You put them on. The left side is dead. You saved for two months for these.' },
      { from: 'Nia', text: 'ok gotta go, see you tomorrow!' },
    ],
    beats: [
      {
        prompt: 'Nia is halfway down the steps. What do you do?',
        choices: [
          c('a', '“Wait, the left side isn’t working. Did something happen?”', 'calm', 3, 'voice', 'Nia stops. “Oh no. I dropped them on the bus. I thought they were fine.”'),
          c('b', '“Seriously?? You broke them!”', 'reactive', 1, 'control', 'Nia gets defensive: “I didn’t know!” Now it’s a fight on your porch.'),
          c('c', 'Say nothing. Text her later, maybe.', 'avoid', 1, 'voice', 'You never text. You quietly stop lending her stuff.'),
          c('d', '“Uh, my headphones came back in mono mode?”', 'humor', 2, 'voice', 'Nia laughs nervously, then realizes: “Wait, did I break them?”'),
        ],
      },
      {
        prompt: 'Nia says: “I’m so sorry. I don’t have money to replace them right now.”',
        choices: [
          c('a', '“I get it. Could you chip in over time, or help me look into the warranty?”', 'calm', 3, 'boundaries', 'Nia agrees to both. The warranty actually covers it. Friendship intact.'),
          c('b', '“Then you shouldn’t have borrowed them.”', 'reactive', 0, 'empathy', 'True-ish, but Nia leaves crying. Neither of you feels better.'),
          c('c', '“It’s fine, don’t worry about it.” (You’re worried about it.)', 'avoid', 1, 'awareness', 'You’re out $80 and kind of resentful for weeks.'),
          c('d', '“You owe me one concert-level apology. And maybe ten bucks a month.”', 'humor', 2, 'boundaries', 'She laughs and agrees. A light way to make a real ask.'),
        ],
      },
    ],
    lesson: {
      skill: 'boundaries',
      title: 'Kind and clear can coexist',
      body: 'You can care about a friend and still expect them to make things right. A clear, fair ask protects the friendship better than swallowing it.',
      tryThis: '“I’m not mad at you, but I do need us to figure out how to fix this.”',
    },
  },
  {
    id: 'friends-2',
    world: 'friends',
    title: 'The Secret',
    hook: 'Your friend trusted you with something. Now someone wants you to spill.',
    chaos: 3,
    mode: 'chat',
    place: 'Hannah',
    lines: [
      { from: 'Hannah', text: 'ok so I KNOW Priya told you something' },
      { from: 'Hannah', text: 'she’s been acting weird and you’re the only one she talks to' },
      { from: 'Hannah', text: 'just tell me, I won’t say anything 👀' },
      { from: '', text: 'Priya told you her parents are getting divorced. She asked you not to tell anyone.' },
    ],
    beats: [
      {
        prompt: 'Hannah is pushing. What do you say?',
        choices: [
          c('a', '“If Priya wants to share, she will. I’m not gonna speak for her.”', 'calm', 3, 'boundaries', 'Hannah sends “ugh fine.” Priya’s secret stays hers.'),
          c('b', '“OMG ok but you can’t tell anyone…”', 'reactive', 0, 'empathy', 'By Monday, three people know. Priya knows exactly where it came from.'),
          c('c', 'Leave Hannah on read.', 'avoid', 1, 'voice', 'Hannah decides that means it’s something juicy and starts guessing out loud.'),
          c('d', '“The secret is she’s secretly a lizard. You didn’t hear it from me.”', 'humor', 2, 'boundaries', 'Hannah laughs and drops it. Deflected without a fight.'),
        ],
      },
      {
        prompt: 'Hannah says: “wow ok, I thought we were close too.”',
        choices: [
          c('a', '“We are! That’s why I’d keep your secrets too.”', 'calm', 3, 'empathy', 'Hannah pauses: “…ok fair actually.” Loyalty explained, not just enforced.'),
          c('b', '“Guess not.”', 'reactive', 0, 'control', 'Hannah gets offended. Now you have two problems.'),
          c('c', 'Give in and tell her a little bit.', 'avoid', 0, 'boundaries', '“A little bit” turns into the whole story by lunch.'),
          c('d', '“If you’re worried about Priya, maybe just ask how she’s doing?”', 'calm', 3, 'empathy', 'Hannah does. Priya ends up feeling supported, not gossiped about.'),
        ],
      },
    ],
    lesson: {
      skill: 'boundaries',
      title: 'Guilt is not a reason',
      body: 'People sometimes use “I thought we were close” to get past your boundary. Being trustworthy means staying steady even when it’s uncomfortable. One exception: if a secret involves someone being hurt or in danger, telling a trusted adult is the right move.',
      tryThis: '“That’s not mine to share. You could ask her how she’s doing.”',
    },
  },
  {
    id: 'friends-3',
    world: 'friends',
    title: 'Always the Planner',
    hook: 'You plan every hangout. Nobody else ever does.',
    chaos: 2,
    mode: 'chat',
    place: 'weekend plans',
    lines: [
      { from: 'Leo', text: 'what are we doing this weekend' },
      { from: 'Ari', text: 'idk @you what’s the plan?' },
      { from: '', text: 'Every week. Same question. Same person answers it: you.' },
    ],
    beats: [
      {
        prompt: 'You’re kind of tired of it. What do you send?',
        choices: [
          c('a', '“Honestly I’m out of ideas. Can someone else pick this week?”', 'calm', 3, 'voice', 'Silence for a sec. Then Ari: “ok I got it.” You just shared the load.'),
          c('b', '“Why is it ALWAYS me? Do you guys even want to hang out?”', 'reactive', 1, 'control', 'Fair feeling, sharp delivery. Leo replies: “dang ok chill.”'),
          c('c', 'Plan it again and say nothing.', 'avoid', 1, 'awareness', 'The hangout’s fun. The resentment keeps growing.'),
          c('d', '“The planning department is closed for renovations 🚧”', 'humor', 2, 'voice', 'They laugh and get the hint. Ari volunteers.'),
        ],
      },
      {
        prompt: 'Ari picks a plan you’re not excited about: watching his cousin’s basketball game.',
        choices: [
          c('a', 'Go anyway, and tell Ari you appreciated him planning.', 'calm', 3, 'empathy', 'It’s actually fun. Ari offers to plan again next week.'),
          c('b', '“That’s kinda boring, I’ll just plan something better.”', 'reactive', 0, 'empathy', 'Ari feels shot down. Guess who’s planning forever now.'),
          c('c', 'Skip it without saying why.', 'avoid', 1, 'voice', 'Ari wonders if you’re mad.'),
          c('d', '“I’m in, but next week can we do food?”', 'calm', 2, 'voice', 'Clear and easy. Everyone agrees.'),
        ],
      },
    ],
    lesson: {
      skill: 'voice',
      title: 'Ask for help before you burn out',
      body: 'People usually don’t notice how much you carry until you say so. Saying it early, without a guilt trip, keeps you from resenting people you actually like.',
      tryThis: '“I’ve been planning a lot. Could someone else take this one?”',
    },
  },
  {
    id: 'friends-4',
    world: 'friends',
    title: 'New Best Friend?',
    hook: 'Your best friend keeps hanging out with someone new.',
    chaos: 3,
    mode: 'scene',
    place: 'After school',
    lines: [
      { from: '', text: 'For two weeks, Jada has walked home with Sofia instead of you.' },
      { from: 'Jada', text: 'hey! Sofia and I are getting boba, see you tomorrow?' },
      { from: '', text: 'You feel something twist in your chest.' },
    ],
    beats: [
      {
        prompt: 'What do you do with this feeling?',
        choices: [
          c('a', 'Name it to yourself: “I’m jealous and I’m scared of losing her.”', 'calm', 3, 'awareness', 'It’s uncomfortable to admit, but now you know what you’re dealing with.'),
          c('b', '“Have fun with your new best friend I guess.”', 'reactive', 0, 'control', 'Jada looks hurt and confused.'),
          c('c', 'Pretend you don’t care and start pulling away.', 'avoid', 1, 'voice', 'Jada notices and thinks you’re the one drifting.'),
          c('d', '“Bring me back a boba or our friendship is over 😤”', 'humor', 2, 'voice', 'Jada laughs: “obviously.” A real feeling, lightly said.'),
        ],
      },
      {
        prompt: 'The next day you get a quiet moment with Jada.',
        choices: [
          c('a', '“I’ve missed hanging out. Can we do something, just us, this week?”', 'calm', 3, 'voice', 'Jada says “YES, I’ve missed you too.” It was never a competition.'),
          c('b', '“Do you even still want to be my friend?”', 'reactive', 1, 'awareness', 'Jada is surprised, then reassures you. A little intense, but honest.'),
          c('c', 'Say nothing and hope it goes back to normal.', 'avoid', 1, 'voice', 'It might. It might not.'),
          c('d', '“Want to invite Sofia to our movie night too?”', 'calm', 3, 'empathy', 'Turns out Sofia’s great. Now you have two friends.'),
        ],
      },
    ],
    lesson: {
      skill: 'awareness',
      title: 'Jealousy is information',
      body: 'Jealousy usually means “I value this and I’m afraid to lose it.” Saying what you want (“I miss you”) works way better than punishing someone for having other friends.',
      tryThis: '“I’ve missed hanging out. Can we do something soon?”',
    },
  },
  {
    id: 'friends-5',
    world: 'friends',
    title: 'Cancelled. Again.',
    hook: 'Your friend cancels last-minute for the third time this month.',
    chaos: 3,
    mode: 'chat',
    place: 'Theo',
    lines: [
      { from: 'Theo', text: 'hey so sorry, can’t make it today 😩' },
      { from: '', text: 'You’re already dressed. It’s the third time in a month.' },
    ],
    beats: [
      {
        prompt: 'You’re annoyed. What do you send?',
        choices: [
          c('a', '“Okay. This is the third time though, is everything good?”', 'calm', 3, 'voice', 'Theo admits he’s been overwhelmed with work shifts. That explains a lot.'),
          c('b', '“Of course you can’t. Classic Theo.”', 'reactive', 0, 'control', 'Theo replies “wow ok.” Now he feels attacked instead of sorry.'),
          c('c', '“np!” and stop inviting him.', 'avoid', 1, 'voice', 'He never knows why the invites stopped.'),
          c('d', '“I’m starting a cancel counter. You’re at 3. Prizes at 5.”', 'humor', 2, 'voice', 'He laughs and apologizes for real. Message received.'),
        ],
      },
      {
        prompt: 'Theo says: “my work schedule has been crazy, I keep thinking I can do it and then I can’t.”',
        choices: [
          c('a', '“Got it. Can we plan around your schedule? Send me your free days.”', 'calm', 3, 'empathy', 'He sends them. You hang out that Sunday, no cancels.'),
          c('b', '“Then stop saying yes if you can’t.”', 'reactive', 1, 'boundaries', 'Fair point, harsh delivery. He agrees, a little stung.'),
          c('c', '“It’s fine.” (Still annoyed.)', 'avoid', 1, 'awareness', 'The annoyance sticks around.'),
          c('d', '“I get it. Just let me know earlier next time if it’s not gonna work?”', 'calm', 3, 'boundaries', 'He agrees. That’s a boundary with empathy built in.'),
        ],
      },
    ],
    lesson: {
      skill: 'boundaries',
      title: 'Name the pattern, not the person',
      body: '“You always do this” makes people defensive. “This keeps happening, what’s going on?” opens a real conversation and usually finds a fix.',
      tryThis: '“This is the third time. Is everything okay? What would work better?”',
    },
  },
  {
    id: 'friends-6',
    world: 'friends',
    title: 'Honest Opinion',
    hook: 'Your friend asks if their song is good before they post it. It’s… not.',
    chaos: 2,
    mode: 'chat',
    place: 'Kenji 🎧',
    lines: [
      { from: 'Kenji', text: 'ok be honest. posting this tonight. is it good?? [audio]' },
      { from: '', text: 'The beat is cool. The vocals are way too loud and the lyrics rhyme “fire” with “fire.”' },
    ],
    beats: [
      {
        prompt: 'He said “be honest.” What do you say?',
        choices: [
          c('a', '“The beat is honestly sick. Vocals feel a little loud though, maybe mix them down?”', 'calm', 3, 'voice', 'Kenji says “oh good call.” Specific + kind = useful.'),
          c('b', '“lol it’s kinda bad ngl”', 'reactive', 0, 'empathy', 'Kenji goes quiet. He doesn’t post it, or talk to you for a day.'),
          c('c', '“It’s perfect!! post it!”', 'avoid', 1, 'voice', 'He posts it. Some comments are rough. He asks why you didn’t say anything.'),
          c('d', '“Fire rhymes with fire is a bold artistic choice 🔥🔥”', 'humor', 2, 'voice', 'He laughs and fixes the lyric. Honest, wrapped in a joke.'),
        ],
      },
      {
        prompt: 'Kenji says: “ugh, maybe I’m just not good at this.”',
        choices: [
          c('a', '“You made a whole song. Most people never try. This version just needs a polish.”', 'calm', 3, 'empathy', 'He goes back in and fixes the mix. The new version is way better.'),
          c('b', '“Maybe try something else?”', 'reactive', 0, 'empathy', 'Ouch. He deletes the project.'),
          c('c', '“No, it’s good, ignore me.”', 'avoid', 1, 'voice', 'Now your feedback means nothing to him.'),
          c('d', '“Want me to listen to the next version before you post?”', 'calm', 3, 'empathy', 'He sends it an hour later. You’re now his official first listener.'),
        ],
      },
    ],
    lesson: {
      skill: 'voice',
      title: 'Kind, specific, useful',
      body: 'Good feedback names one real strength and one specific thing to fix. Vague praise doesn’t help, and blunt criticism makes people quit. Specific is the kind version of honest.',
      tryThis: '“I really like ___. One thing that would make it better: ___.”',
    },
  },
];
